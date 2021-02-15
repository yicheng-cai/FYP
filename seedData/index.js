import userModel from '../api/users/userModel';
import ProductModel from '../api/products/productModel';
import {products} from './products.js';
const users = [
  {
    'username': 'user1',
    'password': 'user1',
  },
  {
    'username': 'user2',
    'password': 'user2',
  },
];

export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

  export async function loadProducts() {
    console.log('load seed data');
    console.log(products.length);
    try {
      await ProductModel.deleteMany();
      await ProductModel.collection.insertMany(products);
      console.info(`${products.length} Products were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load product Data: ${err}`);
    }
  } 