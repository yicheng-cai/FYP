import express from 'express';
import clothesModel from './clothesModel'

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res, next) => {
    clothesModel.find().then(clothes => res.status(200).send(clothes)).catch(next);
});



router.get('/:position', (req, res, next) => {
  const position = parseInt(req.params.position);
  clothesModel.findByclothesDBposition(position).then(clothes => res.status(200).send(clothes)).catch(next);
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
    const clothes = await clothesModel.findByclothesDBposition(position);
    if (clothes!=null) {
      await clothes.push(value);
      await clothes.save(); 
      res.status(201).json({
        code:201,
        msg: 'The clothes has been posted'
        }); 
    }
    else {
      if(value!=null){
      res.status(401).json({
        code: 401,
        msg: 'The clothes does not exist'
      });
    }
  }} catch (error) {
    next(error);
  }
});



router.put('/:position', async (req, res, next)=>{
  const position = parseInt(req.params.position);
  const updateClothes = req.body;
  const clothes = await clothesModel.findByclothesDBposition(position);
  if(clothes){
    clothesModel.findByclothesDBposition(position).then(clothes =>res.status(200).send(clothes))
  .catch(next);
  }else{
    res.status(404).send({message: `Unable to find clothes with position: ${position}.`, status: 404});
  }
});

router.delete('/:position', async (req,res, next)=>{
  const position = parseInt(req.params.position);
  const clothes = await clothesModel.findByclothesDBposition(position);
  if(clothes){
    clothesModel.deleteOne({position: position}).then(res.status(200).send("delete successfully"))
  .catch(next);
  } else{
    res.status(404).send("can't find the clothes wanted to delete");
  }
});

export default router;