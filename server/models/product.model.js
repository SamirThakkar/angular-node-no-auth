module.exports = (mongoose) => {
    /**
     * Product Schema
     */
    let ProductSchema = new mongoose.Schema({
        sku: {
            type: String,
            index: {unique: [true, 'Sku already exist.']}
        },
        sku_id: {
            type: Number
        },
        inventory_level: {
            type: Number
        },
        product_id: {
            type: Number
        }
    }, {timestamps: true});
    return mongoose.model('Product', ProductSchema);
};
