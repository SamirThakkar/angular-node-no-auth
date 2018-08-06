import {  NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {AddEditProductComponent} from './add-edit-product/add-edit-product.component';
import {ListProductComponent} from './list-product/list-product.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from './shared/product.service';
import {DataResolve} from '../../@shared/services/data.resolve';
import {Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "list"
  },
  {
    path: 'add',
    component: AddEditProductComponent
  },
  {
    path: 'list',
    component: ListProductComponent,
    data: { apiPath: `/api/product`},
    resolve: { products : DataResolve },
  },
  {
    path: 'edit/:id',
    component: AddEditProductComponent,
    data: { apiPath: `/singleProduct/:id`},
    resolve: { product : DataResolve },
  }
];


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    AddEditProductComponent,
    ListProductComponent
  ],
  providers:[ProductService,DataResolve]
})
export class ProductModule {
  static ROUTES: any = routes;
}
