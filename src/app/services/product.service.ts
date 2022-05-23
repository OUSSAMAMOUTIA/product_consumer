import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      {id: 1, name: "Computer", price: 6500, promotion: true},
      {id: 2, name: "Printer", price: 1200, promotion: false},
      {id: 3, name: "Smart Phone", price: 1500, promotion: true},
    ]
  }

  public getAllProducts(): Observable<Product[]> {
    let rnd = Math.random();
    if (rnd < 0.1) {
      return throwError(() => new Error("Error Connection !!!!"))
    } else {
      return of(this.products);
    }
  }

  public deleteDeleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter(product => product.id != id);
    return of(true);
  }

  public setProductPromotion(id: number): Observable<boolean> {
    let product = this.products.find(product => product.id == id)
    if (product != undefined) {
      product.promotion = !product.promotion
      return of(true)
    } else {
      return throwError(() => new Error("Product Not Found!!!"))
    }
  }

  public searchProduct(keyword: string): Observable<Product[]> {
    let products = this.products.filter(product => product.name.includes(keyword))
    return of(products)
  }
}
