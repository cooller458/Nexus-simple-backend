import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assets: [
    {
      symbol: { type: String, required: true },
      amount: { type: Number, required: true },
      value: { type: Number, required: true }, // USD veya başka bir para birimi cinsinden
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;