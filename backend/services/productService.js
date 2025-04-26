// Temporary in-memory data for testing
let products = [
    { 
        id: 1, 
        name: 'Laptop', 
        price: 1000, 
        description: 'High performance laptop',
        category: 'Electronics',
        stock: 10
    },
    { 
        id: 2, 
        name: 'Smartphone', 
        price: 500, 
        description: 'Latest smartphone',
        category: 'Electronics',
        stock: 20
    }
];

const productService = {
    // Get all products with optional filters
    getAllProducts: async (filters = {}) => {
        let result = [...products];
        
        // Apply filters if provided
        if (filters.category) {
            result = result.filter(p => p.category === filters.category);
        }
        if (filters.minPrice) {
            result = result.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
            result = result.filter(p => p.price <= filters.maxPrice);
        }
        
        return result;
    },

    // Get product by id
    getProductById: async (id) => {
        return products.find(product => product.id === parseInt(id));
    },

    // Create new product
    createProduct: async (productData) => {
        // Validate required fields
        if (!productData.name || !productData.price) {
            throw new Error('Name and price are required');
        }

        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...productData,
            stock: productData.stock || 0
        };
        
        products.push(newProduct);
        return newProduct;
    },

    // Update product
    updateProduct: async (id, productData) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index === -1) return null;
        
        products[index] = {
            ...products[index],
            ...productData
        };
        return products[index];
    },

    // Delete product
    deleteProduct: async (id) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index === -1) return null;
        
        const deletedProduct = products[index];
        products = products.filter(product => product.id !== parseInt(id));
        return deletedProduct;
    },

    // Update product stock
    updateStock: async (id, quantity) => {
        const product = await productService.getProductById(id);
        if (!product) return null;

        const newStock = product.stock + quantity;
        if (newStock < 0) {
            throw new Error('Insufficient stock');
        }

        return await productService.updateProduct(id, { stock: newStock });
    }
};

module.exports = productService; 