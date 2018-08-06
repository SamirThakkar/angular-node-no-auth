import {from as observableFrom} from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ProductService} from './product.service';

@Injectable()

export class ProductResolver implements Resolve<any> {
    constructor(private productService: ProductService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return observableFrom(this.productService.getAllProducts());
    }
}
