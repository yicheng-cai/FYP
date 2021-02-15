import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    position: Number,
    title: String
  });

  
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favourites: [ProductSchema]
});

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  };
  
  UserSchema.methods.comparePassword = function (candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
      throw new Error('Password mismatch');
    }
    return this;
  };

  
export default mongoose.model('User', UserSchema);