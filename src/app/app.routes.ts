import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    { path: 'products/:page', component: ProductListComponent},
    { path: 'products/:page/product/:id', component: ProductDetailsComponent },
    { path: '**', redirectTo: 'products/1', pathMatch: 'full' }
];
