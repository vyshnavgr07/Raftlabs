import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createApp } from '../app.js';
import { Menu } from '../models/Menu.js';
import { Order } from '../models/Order.js';
import { MENU_SEED } from '../constants/menuSeed.js';
import { ORDER_STATUS } from '../constants/orderStatus.js';
import { clearAllSimulators } from '../socket/orderSocket.js';

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createApp();
});

afterAll(async () => {
  clearAllSimulators();
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Menu.deleteMany({});
  await Order.deleteMany({});
  await Menu.insertMany(MENU_SEED);
});

const buildOrderPayload = (menuId) => ({
  customer: {
    name: 'John Doe',
    phone: '+1 555 123 4567',
    address: '123 Main Street, Springfield',
    notes: 'Ring the doorbell',
  },
  paymentMethod: 'Paid',
  items: [{ menuId: String(menuId), quantity: 2 }],
});

describe('Menu API', () => {
  test('GET /api/menu returns all foods', async () => {
    const response = await request(app).get('/api/menu');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(MENU_SEED.length);
  });

  test('GET /api/menu supports category filter', async () => {
    const response = await request(app).get('/api/menu?category=Pizza');

    expect(response.status).toBe(200);
    expect(response.body.data.every((item) => item.category === 'Pizza')).toBe(true);
  });

  test('GET /api/menu supports search', async () => {
    const response = await request(app).get('/api/menu?search=burger');

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(
      response.body.data.every((item) =>
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes('burger'),
      ),
    ).toBe(true);
  });

  test('GET /api/menu supports sort by price', async () => {
    const response = await request(app).get('/api/menu?sort=price');
    const prices = response.body.data.map((item) => item.price);
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});

describe('Orders API', () => {
  test('POST /api/orders creates an order and calculates total on server', async () => {
    const menuItem = await Menu.findOne({ name: 'Classic Cheeseburger' });
    const payload = buildOrderPayload(menuItem._id);

    const response = await request(app).post('/api/orders').send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.total).toBe(Number((menuItem.price * 2).toFixed(2)));
    expect(response.body.data.status).toBe(ORDER_STATUS.ORDER_RECEIVED);
    expect(response.body.data.items[0].price).toBe(menuItem.price);
  });

  test('POST /api/orders rejects invalid payload', async () => {
    const response = await request(app).post('/api/orders').send({
      customer: { name: 'A', phone: '12', address: 'x' },
      paymentMethod: 'Bitcoin',
      items: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  test('GET /api/orders/:id returns order details', async () => {
    const menuItem = await Menu.findOne();
    const created = await request(app).post('/api/orders').send(buildOrderPayload(menuItem._id));

    const response = await request(app).get(`/api/orders/${created.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.customer.name).toBe('John Doe');
    expect(response.body.data.estimatedDelivery).toBeDefined();
  });

  test('GET /api/orders?phone= returns matching customer orders', async () => {
    const menuItem = await Menu.findOne();
    await request(app).post('/api/orders').send(buildOrderPayload(menuItem._id));
    await request(app)
      .post('/api/orders')
      .send({
        ...buildOrderPayload(menuItem._id),
        customer: {
          name: 'Other User',
          phone: '9999999999',
          address: 'Somewhere else',
        },
      });

    const response = await request(app).get('/api/orders?phone=5551234567');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].customer.phone).toContain('555');
  });

  test('PATCH /api/orders/:id/status updates status', async () => {
    const menuItem = await Menu.findOne();
    const created = await request(app).post('/api/orders').send(buildOrderPayload(menuItem._id));

    const response = await request(app)
      .patch(`/api/orders/${created.body.data._id}/status`)
      .send({ status: ORDER_STATUS.PREPARING });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(ORDER_STATUS.PREPARING);
  });

  test('DELETE /api/orders/:id deletes order', async () => {
    const menuItem = await Menu.findOne();
    const created = await request(app).post('/api/orders').send(buildOrderPayload(menuItem._id));

    const response = await request(app).delete(`/api/orders/${created.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const fetchDeleted = await request(app).get(`/api/orders/${created.body.data._id}`);
    expect(fetchDeleted.status).toBe(404);
  });

  test('returns 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown-route');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test('GET /api/orders/:id returns 400 for invalid ObjectId', async () => {
    const response = await request(app).get('/api/orders/not-an-id');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
