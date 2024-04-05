const Products = require('../models/products');

const createProducts = async (req, res) => {
    try {
        const {name, price, mrp, stock } = req.body;
        const data = await Products.create({ name, price, mrp, stock, isPublished: false});
        return res.status(201).send(data);
    } catch (error) {
        return  res.status(500).json({message: `Error in create product, Error is -> ${error}`});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const data  = await Products.findAll({});
        return res.status(200).send(data);
        
    } catch (error) {
        return  res.status(500).json({message: `Error in create product, Error is -> ${error}`});
    }
}

const updateProducts = async (req, res) => {
    try {
        const  { id  }= req.params;
        const {dataValues} = await Products.findOne({where:{id}});
        const {name, price, mrp, stock } = dataValues;

        const errMsg = [];

        
        if(price > mrp){
            errMsg.push('MRP should not be less than equal to the Price')
        }
        if (stock ===  0) {
            errMsg.push('Stock count is 0');
        }
    
        if(errMsg.length === 0){
            await Products.update({isPublished: true} ,{ where : {id}})
            return res.status(204).send(true);
        } else{
            return res.status(422).send(errMsg);

        }
        
    } catch (error) {
        return  res.status(500).json({message: `Error in create product, Error is -> ${error}`});
    }
}

const common = async (req, res) => {
    try {
        return res.status(405).send();        
    } catch (error) {
        return  res.status(500).json({message: `Error in delete or update product, Error is -> ${error}`});
    }
}


module.exports = { createProducts, getAllProducts, common, updateProducts }