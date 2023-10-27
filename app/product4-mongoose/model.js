const mongoose = require('mongoose');

// seperti bikin aturan khusus untuk table
const productSchema = mongoose.Schema({
  name: {
    // required untuk validasi
    type: String,
    required: [true, 'field nama harus ada'],
    minlength: [3, 'panjang nama minimal 3 karakter'],
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },

  Image_url: {
    type: String,
  },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
