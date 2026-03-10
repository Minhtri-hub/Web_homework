import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProductImage } from '../myclasses/iproduct-image';
import { ProductService } from '../myservice/product-service';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './service-product-image-event.html',
  styleUrl: './service-product-image-event.css',
})
export class ServiceProductImageEvent {
  public products: IProductImage[] = [];

  constructor(private _service: ProductService, private router: Router) {
    this.products = this._service.getProductsWithImages();
  }

  viewDetail(p: IProductImage): void {
    this.router.navigate(['service-product-image-event', p.ProductId]);
  }
}

