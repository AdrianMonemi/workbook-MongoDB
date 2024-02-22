import express from "express";
import FAQEntryModel from "/home/adrian/repos/Modul2/workbook-MongoDB/server/src/model/FAQEntry.model.js";
import workbookData from "/home/adrian/repos/Modul2/workbook-MongoDB/server/src/data/workbook.json" assert { type: "json" };

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const FAQ = await FAQEntryModel.find().sort({ created: "desc" });
    console.log(FAQ);
    return res.json(FAQ);
  } catch (error) {
    console.error("Error fetching FAQ entries:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newFAQEntry = new FAQEntryModel(req.body);
    await newFAQEntry.save();
    return res.status(201).json(newFAQEntry);
  } catch (error) {
    console.error("Error creating FAQ entry:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
/* >>>>>>>> this function is only for create a new collection in MongoDB from json-datas <<<<<<<<<
const saveDataFromJsonFile = async (jsonData) => {
  try {
    await FAQEntryModel.deleteMany({});
    const insertedData = await FAQEntryModel.insertMany(jsonData);
    console.log("Workbook data imported successfully into the database.", insertedData);
  } catch (error) {
    console.error("Error importing workbook data into the database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

saveDataFromJsonFile(workbookData);*/

/*const createFAQ = async (req, res) => {
  try {
    console.log(req.body);
    const { id, category, question, answer } = req.body;
    const faqEntry = new FAQEntryModel({
      id,
      category,
      question,
      answer,
    });
    await faqEntry.save();
    return res.status(201).json(faqEntry);
  } catch (error) {
    console.error("Error creating FAQ entry:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

router.post("/create", createFAQ);*/

router.get("/datas", async (req, res) => {
  try {
    let questionsData = await FAQEntryModel.find();
    if (questionsData === null || !questionsData || questionsData.length === 0) {
			res.status(404).json({ error: 'No data found' });
		} else {
      //  const questions = questionsData.map(entry => entry.question);
      //  const id = questionsData.map(entry => entry.id)
      const questions = questionsData.map(entry => ([ entry.id, entry.question, entry.answer ]));
			res.json({questions});
		}
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
