import { body } from 'express-validator';

export const createCategoryValidator = [body('name').notEmpty()];