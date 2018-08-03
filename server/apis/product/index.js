/**
 * @Class ProductController
 * @description class to manage product apis.
 */
class ProductController {
  constructor(app) {
    app.get('/api/product', this.listProduct);
    app.get('/api/product/:id', this.getProduct);
    app.post('/api/product', this.createProduct);
    app.put('/api/product/:id', this.updateProduct);
    app.delete('/api/product/:id', this.removeProduct);
  }

  listProduct(req, res) {
    console.log('List product.');
    global.MongoORM.Product.find().then((products) => {
      res.sendResponse(products);
    }).catch((error) => {
      res.sendError(error);
    })
  }

  getProduct(req, res) {
    console.log('Get product.');
    let id = req.params.id;
    global.MongoORM.Product.findOne({'_id': id}).then((productObj) => {
      res.sendResponse(productObj);
    }).catch((error) => {
      res.sendError(error);
    })
  }

  createProduct(req, res) {
    console.log('Create product');
    let sku = req.body.sku,
      skuId = req.body.skuId,
      inventoryLevel = req.body.inventory,
      productId = req.body.productId;

    let product = new global.MongoORM.Product();
    product.sku = sku;
    product.sku_id = skuId;
    product.inventory_level = inventoryLevel;
    product.product_id = productId;
    product.save().then((response) => {
      res.send(response);
    }).catch((error) => {
      console.log('error', error);
      res.send(error);
    })

  }

  updateProduct(req, res) {
    console.log('Update product.');
    let id = req.params.id;
    let updateObj = {
      "inventory_level": req.body.inventory
    };
    global.MongoORM.Product.update({"_id": id},
      {$set: updateObj}).then((response) => {
      res.send(response);
    }).catch((error) => {
      res.send(error);
    })
  }

  removeProduct(req, res) {
    console.log('Remove product.');
    let id = req.params.id;
    global.MongoORM.Product.remove({'_id': id}).then((response) => {
      res.sendResponse({'Message': 'Product removed successfully.', 'Response': response});
    }).catch((error) => {
      res.sendError(error);
    })
  }


}

module.exports = ProductController;
