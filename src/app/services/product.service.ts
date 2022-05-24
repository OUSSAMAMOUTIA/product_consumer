import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ProductPage} from "../model/product-page.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      {id: UUID.UUID(), name: "Computer", price: 6500, promotion: true},
      {id: UUID.UUID(), name: "Printer", price: 1200, promotion: false},
      {id: UUID.UUID(), name: "Smart Phone", price: 1500, promotion: true},
    ];
    for (let i = 1; i <= 10; i++) {
      this.products.push({id: UUID.UUID(), name: "Computer", price: 6500 + i * 2, promotion: true});
      this.products.push({id: UUID.UUID(), name: "Printer", price: 1200 + i * 2, promotion: false});
      this.products.push({id: UUID.UUID(), name: "Smart Phone", price: 1500 + i * 3, promotion: true});
    }
  }

  public getAllProducts(): Observable<Product[]> {
    let rnd = Math.random();
    if (rnd < 0.1) {
      return throwError(() => new Error("Error Connection !!!!"))
    } else {
      return of(this.products);
    }
  }

  public getPageProduct(page: number, size: number): Observable<ProductPage> {
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % 2 != 0) {
      totalPages++;
    }
    let pageProducts = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProducts})
  }

  public deleteDeleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(product => product.id != id);
    return of(true);
  }

  public setProductPromotion(id: string): Observable<boolean> {
    let product = this.products.find(product => product.id == id)
    if (product != undefined) {
      product.promotion = !product.promotion
      return of(true)
    } else {
      return throwError(() => new Error("Product Not Found!!!"))
    }
  }

  public searchProduct(keyword: string, page: number, size: number): Observable<ProductPage> {
    let result = this.products.filter(product => product.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(result.length / size);
    if (this.products.length % 2 != 0) {
      totalPages++;
    }
    let pageProducts = result.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProducts})
  }
}
