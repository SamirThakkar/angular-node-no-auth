import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  productList:any;
  isProducts:any;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    console.log('!!!!!1',this.route.snapshot.data['productS']);
    this.productList = this.route.snapshot.data['product'];
    console.log('this.productList==>>', this.productList);

    this.checkProductListLength();
    }

  deleteProduct(id){
    this.productService.deleteProductById(id).subscribe((res)=>{
          this.getProductList();
    },(e)=>{

    })
  }

  checkProductListLength(){
    console.log('this.productList', this.productList);

    if(this.productList && this.productList.length){
      this.isProducts = true
    }else{
      this.isProducts = false;
    }
  }

  getProductList(){
    this.productService.getAllProducts().subscribe((res)=>{
      this.productList = res;
      console.log('this.productList', this.productList);

      this.checkProductListLength();
    },(e)=>{

    })
  }

}
