import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ClothesSchema = new Schema({
  position: { type: Number, required: true, unique: true },
  title: { type: String },
  epid: { type: Number },
  link: { type: String },
  image: { type: String },
  hotness: [{ type: String }],
  condition: { type: String },
  is_auction: { type: Boolean },
  buy_it_now: { type: Boolean },
  free_returns: { type: Boolean },
  item_location: { type: String },
  price: { type: Number },
  sponsored: { type: Boolean },
  shipping_cost: { type: Number },
});

ClothesSchema.statics.findByclothesDBposition = function (position) {
  return this.findOne({ position: position });
};

export default mongoose.model('Clothes', ClothesSchema);