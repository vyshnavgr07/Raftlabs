import { body, param, validationResult } from 'express-validator';
import { ORDER_STATUS_FLOW } from '../constants/orderStatus.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const validate = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map(({ path, msg }) => ({ field: path, message: msg }));

  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    message: 'Validation failed',
    errors,
  });
};

export const createOrderValidation = [
  body('customer.name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters'),
  body('customer.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[+]?[\d\s()-]{7,20}$/)
    .withMessage('Phone number is invalid'),
  body('customer.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Address must be between 5 and 200 characters'),
  body('customer.notes')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage('Notes must be at most 300 characters'),
  body('paymentMethod')
    .isIn(['Cash On Delivery', 'Online'])
    .withMessage('Payment method must be Cash On Delivery or Online'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.menuId')
    .notEmpty()
    .withMessage('Menu id is required')
    .isMongoId()
    .withMessage('Menu id must be a valid ObjectId'),
  body('items.*.quantity')
    .isInt({ min: 1, max: 50 })
    .withMessage('Quantity must be an integer between 1 and 50'),
  validate,
];

export const orderIdValidation = [
  param('id').isMongoId().withMessage('Order id must be a valid ObjectId'),
  validate,
];

export const updateStatusValidation = [
  param('id').isMongoId().withMessage('Order id must be a valid ObjectId'),
  body('status')
    .isIn(ORDER_STATUS_FLOW)
    .withMessage(`Status must be one of: ${ORDER_STATUS_FLOW.join(', ')}`),
  validate,
];
