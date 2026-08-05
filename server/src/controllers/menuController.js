import * as menuService from '../services/menuService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/sendSuccess.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getMenu = asyncHandler(async (req, res) => {
  const { category, search, sort } = req.query;
  const menu = await menuService.getMenuItems({ category, search, sort });

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Menu fetched successfully',
    data: menu,
  });
});
