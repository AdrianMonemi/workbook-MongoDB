import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const FAQEntrySchema = new Schema({
  id: Number,
  category: String,
  question: String,
  answer: String
});

const FAQEntryModel = model('FAQEntry', FAQEntrySchema);
export default FAQEntryModel;