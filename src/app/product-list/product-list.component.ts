import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ProductList, ProductDetails } from '../interfaces';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  products: ProductList  = null;
  loading = false;
  error: any = null;
  page = 1;
  limit = 20;
  skip = 0;
  searchQuery = '';
  searchControl: FormControl = new FormControl('');

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.page =
      parseInt(this.route.snapshot.paramMap.get('page') as string) || 1;
    this.fetchProducts();
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((query) => {
        this.fetchProducts(query);
      });
  }

  fetchProducts(query: string = '') {
    this.loading = true;
    this.page = this.searchQuery === query ? this.page : 1;
    this.skip = (this.page - 1) * this.limit;
    this.searchQuery = query || this.searchQuery;
    this.productsService.getProducts(query, this.skip, this.limit).subscribe({
      next: (data) => {
        this.products = data;
        this.products.totalPages = Math.ceil(data.total / this.limit);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onProductClicked(product: ProductDetails) {
    this.router.navigate(['/products/' + this.page + '/product/' + product.id]);
  }

  onRetry() {
    this.fetchProducts();
  }

  onNextPage() {
    if (this.page < this.products?.totalPages) {
      this.page++;
      this.router.navigate(['/products/' + this.page]);
      this.fetchProducts();
    }
  }

  onPrevPage() {
    if (this.page > 1) {
      this.page--;
      this.router.navigate(['/products/' + this.page]);
      this.fetchProducts();
    }
  }
}
