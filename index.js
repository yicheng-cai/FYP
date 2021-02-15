import dotenv from 'dotenv';
import express from 'express';
import productsRouter from './api/products';
import bodyParser from 'body-parser';
import './db';
import {loadUsers} from './seedData'
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';

dotenv.config();

if (process.env.SEED_DB) {
  loadUsers();
}
const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//session middleware
app.use(session({
  secret: 'FYP',
  resave: true,
  saveUninitialized: true
}));


app.use(express.static('public'));
app.use('/api/products', authenticate, productsRouter);
app.use('/api/users', usersRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});