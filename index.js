import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './api/users/index';
import productRoute from './api/products/index';
import { loadProducts, loadUsers } from './seedData/index';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

  if (process.env.SEED_DB) {
    loadProducts();
    loadUsers();
  }

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:8080');
});




// import dotenv from 'dotenv';
// import express from 'express';
// import productsRouter from './api/products';
// import clothesRouter from './api/clothes';
// import foodsRouter from './api/foods';
// import bodyParser from 'body-parser';
// import './db';
// import {loadUsers, loadProducts, loadFoods, loadClothes} from './seedData'
// import usersRouter from './api/users';
// import session from 'express-session';
// import passport from './authenticate';

// dotenv.config();

// if (process.env.SEED_DB) {
//   loadUsers();
//   loadProducts();
//   loadFoods();
//   loadClothes();
// }
// const errHandler = (err, req, res, next) => {
//   if(process.env.NODE_ENV === 'production') {
//     return res.status(500).send(`Something went wrong!`);
//   }
//   res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
// };
// const app = express();

// const port = process.env.PORT;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// //session middleware
// app.use(session({
//   secret: 'FYP',
//   resave: true,
//   saveUninitialized: true
// }));


// app.use(express.static('public'));

// app.use(passport.initialize());
// app.use('/api/products', productsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/foods', foodsRouter);
// app.use('/api/clothes', clothesRouter);
// app.use(errHandler);

// const server = app.listen(port, () => {
//   console.info(`Server running at ${port}`);
// });

// module.exports = server;