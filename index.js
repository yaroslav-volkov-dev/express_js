import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/mongoose.js';
import { checkAuth } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as ProductsController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoriesContoller.js';
import {
  createCategoryValidator,
  createProductValidator, deleteCategoryValidator,
  deleteProductValidator,
  loginValidator,
  registerValidator
} from './validations.js';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, UserController.register);
app.post('/auth/login', loginValidator, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/products', ProductsController.getAllProducts);
app.post('/products', createProductValidator, ProductsController.createProduct);
app.delete('/products', deleteProductValidator, ProductsController.deleteProduct);

app.get('/categories', CategoryController.getAllCategories);
app.post('/categories', createCategoryValidator, CategoryController.createCategory);
app.delete('/categories', deleteCategoryValidator, CategoryController.deleteCategory);

app.listen(port, () => console.log(`Server started on port: ${port}`));