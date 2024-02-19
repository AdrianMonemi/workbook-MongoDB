import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const FAQEntrySchema = new Schema({
  id: Number,
  category: String,
  question: String,
  answer: String
});

export const FAQEntry = model('FAQEntry', FAQEntrySchema);