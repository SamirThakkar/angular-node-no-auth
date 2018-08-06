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
    app.post('/api/imageUpload', this.uploadSingleImage);
    app.post('/api/moreImagesUpload', this.uploadMultipleImage);
  }

  listProduct(req, res) {
    console.log('List product.');
    global.MongoORM.Product.find({}).then((products) => {
      res.send(products);
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
    let productName = req.body.ProductName,
      productPrice = req.body.ProductPrice,
      productImage = req.body.ProductImage,
      moreProductImages = req.body.MoreProductImages;

    let product = new global.MongoORM.Product();
    product.ProductName = productName;
    product.ProductPrice = productPrice;
    product.ProductImage = productImage;
    product.MoreProductImages = moreProductImages;
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


  uploadSingleImage(req,res){
    global.upload(req, res, (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({
        status: 'success',
        message: "File uploaded successfully!.",
        filePath: req.files[0].path,
      });
    });
  }

  uploadMultipleImage(req,res){
    global.moreImagesUpload(req, res, (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({status: 'success', message: "File uploaded successfully!.", files: req.files});
    });
  }

}

module.exports = ProductController;
