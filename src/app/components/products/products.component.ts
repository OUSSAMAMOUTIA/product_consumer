import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>
  errorMessage!: string;
  searchFormGroup!: FormGroup

  constructor(private productService: ProductService, private fb: FormBuilder) {
  }


  deleteDeleteProduct(product: Product) {
    let cnf = confirm("Are you sure ?")
    if (!cnf) return
    this.productService.deleteDeleteProduct(product.id).subscribe(
      {
        next: () => {
          let index = this.products.indexOf(product);
          this.products.splice(index, 1)
        }
      }
    )
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    })
    this.productService.getAllProducts().subscribe(
      {
        next: (data) => {
          this.products = data;
        }, error: (err) => {
          this.errorMessage = err;
        }
      }
    )
  }

  setProductPromotion(p: Product) {
    let promo = p.promotion
    this.productService.setProductPromotion(p.id).subscribe({
      next: () => {
        p.promotion = !promo
      }, error: err => {
        this.errorMessage = err
      }
    })
  }

  searchProduct() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword).subscribe({
      next: (data) => {
        this.products = data
      }, error: err => {
        this.errorMessage = err
      }
    })
  }
}
