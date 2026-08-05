import * as menuRepository from '../repositories/menuRepository.js';

export const getMenuItems = async (query) => menuRepository.findAllMenus(query);

export const getMenuItemById = async (id) => menuRepository.findMenuById(id);
