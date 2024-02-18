import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { connectToMongoDB } from './config/mongoose.js';
import { checkAuth } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as ProductsController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoriesContoller.js';
import * as UploadController from './controllers/UploadController.js';
import {
  createCategoryValidator,
  createProductValidator, deleteCategoryValidator,
  deleteProductValidator,
  loginValidator,
  registerValidator
} from './validations/validations.js';
import { handleValidationsError } from './validations/handleValidationsError.js';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/auth/register', registerValidator, handleValidationsError, UserController.register);
app.post('/auth/login', loginValidator, handleValidationsError, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), UploadController.upload)

app.get('/products', ProductsController.getAllProducts);
app.post('/products', checkAuth, createProductValidator, handleValidationsError, ProductsController.createProduct);
app.delete('/products', checkAuth, deleteProductValidator, handleValidationsError, ProductsController.deleteProduct);

app.get('/categories', CategoryController.getAllCategories);
app.post('/categories', checkAuth, createCategoryValidator, handleValidationsError, CategoryController.createCategory);
app.delete('/categories',checkAuth, deleteCategoryValidator, handleValidationsError, CategoryController.deleteCategory);

app.listen(port, () => console.log(`Server started on port: ${port}`));

export default app;