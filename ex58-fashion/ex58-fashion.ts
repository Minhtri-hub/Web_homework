import { Component } from '@angular/core';
import { IFashion } from '../myclasses/ifashion';
import { FashionAPIService } from '../myservice/fashion-api-service';

@Component({
  selector: 'app-ex58-fashion',
  standalone: false,
  templateUrl: './ex58-fashion.html',
  styleUrl: './ex58-fashion.css',
})
export class Ex58Fashion {
  fashions: IFashion[] = [];
  errMessage = '';

  constructor(private _service: FashionAPIService) {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
      },
      error: (err) => {
        this.errMessage = err.message || String(err);
      },
    });
  }
}

