const mongoose = require('../node_modules/mongoose')
const bcrypt = require('../node_modules/bcryptjs');
const uniqueValidator = require('../node_modules/mongoose-unique-validator')
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  username : {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password : {
    type : String,
    required : true
  },

//   highScore : {
//     type: Number,
//     default: 0
//   }
});

//determines if the user has been taken before creating an new 
UserSchema.plugin(uniqueValidator)
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//check for the right password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);
 
module.exports = UserModel;