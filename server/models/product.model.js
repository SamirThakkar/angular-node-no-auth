module.exports = (mongoose) => {
    /**
     * Product Schema
     */
    const ProductSchema = new mongoose.Schema({
      ProductName : String,
      ProductPrice : String,
      ProductImage : Object,
      MoreProductImages:Array
    }, {timestamps: true});
    return mongoose.model('Product', ProductSchema);
};
