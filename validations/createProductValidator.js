import { body } from 'express-validator';

export const createProductValidator = [
  body('name').notEmpty(),
  body('categoryId').notEmpty(),
];