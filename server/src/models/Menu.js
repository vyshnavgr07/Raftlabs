import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    preparationTime: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

menuSchema.index({ name: 'text', description: 'text', category: 'text' });

export const Menu = mongoose.model('Menu', menuSchema);
