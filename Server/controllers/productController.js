
const ProductModel = require('../models/productModel')

exports.getProdcut = async(req,res) => {
    try{
        const product = await ProductModel.find()
        res.json(product)
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.addProduct = async (req,res) => {
    const {name, price, description, stock} = req.body
    if (!name || !price || !description || !stock){
        return res.status(400).json({ message: "Completar todos los campos" })
    }

    try{
        const newProduct = new ProductModel({
            name, price, description,stock
        })

        const result = await newProduct.save()
        res.json(result)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}




exports.deleteProduct = async (req,res) => {
    const {id} = req.params;

    try{
        const product = await ProductModel.findByIdAndDelete(id)

        if (!product){
            return res.status(404).json({message: "Producto no encontrado"})
        }
        res.json(product)
    } catch (err){
        res.status(500).json({error: err.message})
    }
}

exports.editProduct = async (req,res) => {
    const {id} = req.params;
    const {name, price, description, stock} = req.body

    try{
        const product = await ProductModel.findByIdAndUpdate(id,
             {name, price, description, stock}, {new: true})
        
             if(!product){
                return res.status(404).json({message: "Producto no encontrado"})
             }

             res.json(product)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}