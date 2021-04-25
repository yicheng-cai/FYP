import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema(
//   {
//     _id: { type: Number},
//     name: { type: String, required: true },
//     rating: { type: Number, default: 0 },
//     comment: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );
const prodctSchema = new mongoose.Schema({
  _id: { type: Number},
  name: { type: String },
  image: { type: String },
  brand: { type: String },
  price: { type: Number, default: 0 },
  category: { type: String },
  countInStock: { type: Number, default: 0 },
  description: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: { type: Array },
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;



// prodctSchema.statics.findByproductDBid = function (id) {
//   return this.findOne({ id: id });
// };

// export default mongoose.model('Products', prodctSchema);



