const { Product } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async (req, res) => {
    try {
        let { take, skip, search } = req.query;
        take = take ? parseInt(take) : 10; 
        skip = skip ? parseInt(skip) : 0; 
        search = search ? search : ''; 

        const whereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ]
        };

        const products = await Product.findAll({
            where: whereClause,
            limit: take,
            offset: skip
        });

        res.status(200).json({ message: 'Daftar produk berhasil ditemukan.', data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar produk.' });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }
        res.status(200).json({ message: 'Detail produk berhasil ditemukan.', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail produk.' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const newProduct = await Product.create({ name, price, description, stock });
        res.status(201).json({ message: 'Produk baru berhasil dibuat.', data: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat membuat produk baru.' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }
        await product.update({ name, price, description, stock });
        res.status(200).json({ message: 'Informasi produk berhasil diperbarui.', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui informasi produk.' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: 'Produk berhasil dihapus.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus produk.' });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
