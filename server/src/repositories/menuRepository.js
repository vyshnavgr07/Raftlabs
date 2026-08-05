import { Menu } from '../models/Menu.js';

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildMenuFilter = ({ category, search } = {}) => {
  const filter = {};

  if (category) {
    filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
  }

  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: pattern }, { description: pattern }, { category: pattern }];
  }

  return filter;
};

const buildSortOption = (sort) => {
  if (!sort) return { createdAt: -1 };

  const direction = sort.startsWith('-') ? -1 : 1;
  const field = sort.replace(/^-/, '');
  const allowed = new Set(['price', 'rating', 'name', 'preparationTime', 'createdAt']);

  if (!allowed.has(field)) {
    return { createdAt: -1 };
  }

  return { [field]: direction };
};

export const findAllMenus = async (query = {}) => {
  const filter = buildMenuFilter(query);
  const sort = buildSortOption(query.sort);
  return Menu.find(filter).sort(sort).lean();
};

export const findMenuById = async (id) => Menu.findById(id).lean();

export const findMenusByIds = async (ids) => Menu.find({ _id: { $in: ids } }).lean();

export const countMenus = async () => Menu.countDocuments();
