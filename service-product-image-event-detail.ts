import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductImage } from '../myclasses/iproduct-image';
import { ProductService } from '../myservice/product-service';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  templateUrl: './service-product-image-event-detail.html',
  styleUrl: './service-product-image-event-detail.css',
})
export class ServiceProductImageEventDetail {
  selectedProduct?: IProductImage;

  constructor(
    private activateRoute: ActivatedRoute,
    private _service: ProductService,
    private router: Router
  ) {
    this.activateRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id !== null) {
        this.selectedProduct = this._service.getProductDetail(id);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['service-product-image-event']);
  }
}

