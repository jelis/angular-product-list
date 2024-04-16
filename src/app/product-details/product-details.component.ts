import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductDetails } from '../interfaces';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})  
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails = null;
  loading: boolean = false;
  error: any = null;
  skip: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.skip = +params['skip'] || 0;
    });
    this.fetchProduct();
  }

  fetchProduct(): void {
    this.loading = true;
    this.error = null;
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id!).subscribe({
      next: product => {
        this.product = product;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        this.error = error;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onRetry(): void {
    this.fetchProduct();
  }

  navigateBack(): void {
    this.router.navigate(['/products/' + this.route.snapshot.paramMap.get('page')]);
  }
}
