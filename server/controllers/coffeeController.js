import coffeeModel from "../models/coffeeModel.js";

const addCoffee = async (req, res) => {
  let imageFilename = req.file.filename;

  const coffee = new coffeeModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageFilename,
  });

  try {
    await coffee.save();
    res.json({ success: true, message: "Coffee Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addCoffee };
