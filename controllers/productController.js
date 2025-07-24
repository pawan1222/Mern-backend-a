import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { productName, price, description } = req.body;
    const newProduct = await productModel.create({
      productName,
      description,
      price,
      imgUrl: req.file.path,      
      imgPublicId: req.file.filename
    });
    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Error while adding product:", err);
    res.status(500).json({ message: "Something went wrong" || "server error" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await productModel.findByIdAndUpdate(id, body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const showProducts = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const count = await productModel.countDocuments({
      productName: { $regex: search, $options: "i" },
    });
    const total = Math.ceil(count / limit);
    const products = await productModel
      .find({ productName: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    res.status(200).json({ products, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const displayProducts = async (req, res) => {
  try {
    // const { page = 1, limit = 6 } = req.query;
    const { page = 1, limit = 100 } = req.query;
    const skip = (page - 1) * limit;
    const count = await productModel.countDocuments();
    const total = Math.ceil(count / limit);
    const products = await productModel.find().skip(skip).limit(limit);
    res.status(200).json({ products, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addProduct, deleteProduct, updateProduct, getProduct, showProducts, displayProducts };