import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // Asegura que el correo electrónico sea único
  },
  phone: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model('customer', CustomerSchema);
export default Customer;
