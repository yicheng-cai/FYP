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

router.post('/:position', async (req, res, next) => {
  try {const value = req.body.value;
    if(!value){
      res.status(403).json({
        code: 403,
        msg: 'NO value has entered'
      });
    }
    const position =req.params.position;
    const product = await productModel.findByproductDBposition(position);
    if (product!=null) {
      await product.push(value);
      await product.save(); 
      res.status(201).json({
        code:201,
        msg: 'The product has been posted'
        }); 
    }
    else {
      if(value!=null){
      res.status(401).json({
        code: 401,
        msg: 'The product does not exist'
      });
    }
  }} catch (error) {
    next(error);
  }
});



router.put('/:position', async (req, res, next)=>{
  const position = parseInt(req.params.position);
  const updateProduct = req.body;
  const product = await productModel.findByproductDBposition(position);
  if(product){
    productModel.findByproductDBposition(position).then(product =>res.status(200).send(product))
  .catch(next);
  }else{
    res.status(404).send({message: `Unable to find product with position: ${position}.`, status: 404});
  }
});

router.delete('/:position', async (req,res, next)=>{
  const position = parseInt(req.params.position);
  const product = await productModel.findByproductDBposition(position);
  if(product){
    productModel.deleteOne({position: position}).then(res.status(200).send("delete successfully"))
  .catch(next);
  } else{
    res.status(404).send("can't find the product wanted to delete");
  }
});

export default router;