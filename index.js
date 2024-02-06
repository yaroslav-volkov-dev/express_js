import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/mongoose.js';
import { registerValidator } from './validations/registerValidator.js';
import { checkAuth } from './utils/checkAuth.js';
import { createProductValidator } from './validations/createProductValidator.js';
import { createCategoryValidator } from './validations/createCategoryValidator.js';
import * as UserController from './controllers/UserController.js';
import * as ProductsController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoriesContoller.js';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/products/get-all', ProductsController.getAllProducts);
app.post('/products/create', createProductValidator, ProductsController.createProduct);

app.get('/categories/get-all', CategoryController.getAllCategories);
app.post('/categories/create', createCategoryValidator, CategoryController.createCategory);

app.listen(port, () => {
  console.log(`Server working on port: ${port}`);
});