import {Product} from "./product.model";

export class ProductPage {
  products!: Product[];
  page!: number;
  totalPages!: number;
  size!: number;
}
