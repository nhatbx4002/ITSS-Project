const productService = require('../services/productService');

const productController = {
    // Get all products with optional filters
    getAllProducts: async (req, res) => {
        try {
            const filters = {
                category: req.query.category,
                minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined
            };

            // Validate price filters
            if (filters.minPrice && isNaN(filters.minPrice)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid minPrice value'
                });
            }
            if (filters.maxPrice && isNaN(filters.maxPrice)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid maxPrice value'
                });
            }

            const products = await productService.getAllProducts(filters);
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error('Error in getAllProducts:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching products',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Get product by id
    getProductById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid product ID'
                });
            }

            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('Error in getProductById:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching product',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Create new product
    createProduct: async (req, res) => {
        try {
            const { name, price, description, category, stock } = req.body;

            // Validate required fields
            if (!name || !price) {
                return res.status(400).json({
                    success: false,
                    message: 'Name and price are required fields'
                });
            }

            // Validate price is a number
            if (isNaN(parseFloat(price))) {
                return res.status(400).json({
                    success: false,
                    message: 'Price must be a number'
                });
            }

            const newProduct = await productService.createProduct({
                name,
                price: parseFloat(price),
                description: description || '',
                category: category || 'Uncategorized',
                stock: stock ? parseInt(stock) : 0
            });

            res.status(201).json({
                success: true,
                data: newProduct
            });
        } catch (error) {
            console.error('Error in createProduct:', error);
            res.status(400).json({
                success: false,
                message: 'Error creating product',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Update product
    updateProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid product ID'
                });
            }

            const { price, stock } = req.body;
            
            // Validate price if provided
            if (price && isNaN(parseFloat(price))) {
                return res.status(400).json({
                    success: false,
                    message: 'Price must be a number'
                });
            }

            // Validate stock if provided
            if (stock && isNaN(parseInt(stock))) {
                return res.status(400).json({
                    success: false,
                    message: 'Stock must be a number'
                });
            }

            const updatedProduct = await productService.updateProduct(id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: updatedProduct
            });
        } catch (error) {
            console.error('Error in updateProduct:', error);
            res.status(400).json({
                success: false,
                message: 'Error updating product',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid product ID'
                });
            }

            const deletedProduct = await productService.deleteProduct(id);
            if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: deletedProduct
            });
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            res.status(400).json({
                success: false,
                message: 'Error deleting product',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Update product stock
    updateStock: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid product ID'
                });
            }

            const { quantity } = req.body;
            if (typeof quantity !== 'number' || isNaN(quantity)) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity must be a valid number'
                });
            }

            const updatedProduct = await productService.updateStock(id, quantity);
            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.json({
                success: true,
                data: updatedProduct
            });
        } catch (error) {
            console.error('Error in updateStock:', error);
            res.status(400).json({
                success: false,
                message: 'Error updating stock',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = productController; 