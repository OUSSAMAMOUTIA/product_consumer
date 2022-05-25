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
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";

  constructor(private productService: ProductService, private fb: FormBuilder) {
  }

/*delete*/
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
    this.getPageProduct();
  }

  getPageProduct() {
    this.productService.getPageProduct(this.currentPage, this.pageSize).subscribe(
      {
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
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
    this.currentAction = "search";
    this.currentPage=0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      }, error: err => {
        this.errorMessage = err
      }
    })
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.currentAction === "all" ?
      this.getPageProduct() : this.searchProduct();
  }
}
