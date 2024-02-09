import { body } from 'express-validator';

export const registerValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('username').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL()
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
];

export const createCategoryValidator = [body('name').notEmpty()];
export const deleteCategoryValidator = [body('_id').isMongoId()];

export const createProductValidator = [
  body('name').notEmpty(),
  body('categoryId').notEmpty().optional(),
];

export const deleteProductValidator = [
  body('_id').isMongoId()
];