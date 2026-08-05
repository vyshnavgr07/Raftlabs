import { Menu } from '../models/Menu.js';
import { MENU_SEED } from '../constants/menuSeed.js';

export const seedMenuIfEmpty = async () => {
  const count = await Menu.countDocuments();

  if (count > 0) {
    return { seeded: false, count };
  }

  const inserted = await Menu.insertMany(MENU_SEED);
  return { seeded: true, count: inserted.length };
};

export const seedMenu = async ({ force = false } = {}) => {
  const existingCount = await Menu.countDocuments();

  if (existingCount > 0 && !force) {
    return {
      seeded: false,
      cleared: false,
      count: existingCount,
      message: `Menu already has ${existingCount} products. Use force to reseed.`,
    };
  }

  if (force && existingCount > 0) {
    await Menu.deleteMany({});
  }

  const inserted = await Menu.insertMany(MENU_SEED);

  return {
    seeded: true,
    cleared: force && existingCount > 0,
    count: inserted.length,
    message: `Seeded ${inserted.length} products successfully.`,
  };
};
