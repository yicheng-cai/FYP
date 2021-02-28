import express from 'express';
import foodModel from './foodModel'

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res, next) => {
    foodModel.find().then(foods => res.status(200).send(foods)).catch(next);
});



router.get('/:position', async(req, res, next) => {
  const position = parseInt(req.params.position);
  const food = await foodModel.findByfoodDBposition(position);
  if(food){

  foodModel.findByfoodDBposition(position).then(food => res.status(200).send(food)).catch(next);
}else{
  res.status(404).send({message: `Unable to find food with position: ${position}.`, status: 404});
}

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
    const food = await foodModel.findByfoodDBposition(position);
    if (food!=null) {
      await food.push(value);
      await food.save(); 
      res.status(201).json({
        code:201,
        msg: 'The food has been posted'
        }); 
    }
    else {
      if(value!=null){
      res.status(401).json({
        code: 401,
        msg: 'The food does not exist'
      });
    }
  }} catch (error) {
    next(error);
  }
});



router.put('/:position', async (req, res, next)=>{
  const position = parseInt(req.params.position);
  const updateFood = req.body;
  const food = await foodModel.findByfoodDBposition(position);
  if(food){
    foodModel.findByfoodDBposition(position).then(food =>res.status(200).send(food))
  .catch(next);
  }else{
    res.status(404).send({message: `Unable to find food with position: ${position}.`, status: 404});
  }
});

router.delete('/:position', async (req,res, next)=>{
  const position = parseInt(req.params.position);
  const food = await foodModel.findByfoodDBposition(position);
  if(food){
    foodModel.deleteOne({position: position}).then(res.status(200).send("delete successfully"))
  .catch(next);
  } else{
    res.status(404).send("can't find the food wanted to delete");
  }
});

export default router;