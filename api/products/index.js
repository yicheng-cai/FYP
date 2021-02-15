import express from 'express';
import productModel from './productModel'

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res, next) => {
  productModel.find().then(products => res.status(200).send(products)).catch(next);
});



router.get('/:position', (req, res, next) => {
  const position = parseInt(req.params.position);
  productModel.findByproductDBposition(position).then(product => res.status(200).send(product)).catch(next);
});


/* router.get('/:position', (req, res) => {
    const key =  parseInt(req.params.position);
    const index = productsObject.products.map((product)=>{
  return product.position;
  }).indexOf(key);
   if (index > -1) {
       res.status(200).send(productsObject.products[index]).catch((error) => next(error));
   } else {
     res.status(404).send({message: `Unable to find product with position: ${key}.`, status: 404});
     }
  });


  router.post('/', (req, res) => {
    let newProduct = req.body;
    if (newProduct && newProduct.title) {
      !newProduct.position ? newProduct.position = Math.round(Math.random() * 10000) : newProduct 
      productsObject.products.push(newProduct);
      res.status(201).send(newProduct).catch((error) => next(error));
    } else {
      res.status(405).send({
        message: "Invalid newProduct Data",
        status: 405
      });
    }
  });

  // Update a product
router.put('/:position', (req, res) => {
    const key = parseInt(req.params.position);
    const updateProduct = req.body;
    const index = productsObject.products.map((product) => {
      return product.position;
    }).indexOf(key);
    if (index !== -1) {
      !updateProduct.position ? updateProduct.position = key : updateProduct
      productsObject.products.splice(index, 1, updateProduct);
      res.status(200).send(updateProduct).catch((error) => next(error));
    } else {
      res.status(404).send({
        message: 'Unable to find product',
        status: 404
      });
    }
  });

// Delete a movie
router.delete('/:position', (req, res) => {
    const key =  parseInt(req.params.position);
    const index = productsObject.products.map((product)=>{
  return product.position;
  }).indexOf(key);
   if (index > -1) {
    productsObject.products.splice(index, 1);
       res.status(200).send({message: `Deleted product position: ${key}.`,status: 200}).catch((error) => next(error));
   } else {
     res.status(404).send({message: `Unable to find product with position: ${key}.`, status: 404}).catch((error) => next(error));
     }
  });
 */

export default router;