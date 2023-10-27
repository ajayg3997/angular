import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AddRestaurantsComponent } from './add-restaurants/add-restaurants.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppmaterialModule } from '../appmaterial/appmaterial.module';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: RestaurantsComponent
      },
      {
        path: 'restaurats',
        component: RestaurantsComponent
      },
      {
        path: 'product',
        component: ProductComponent
      }
    ],
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    AddRestaurantsComponent,
    RestaurantsComponent,
    ProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    AppmaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AddRestaurantsComponent]
})
export class AdminModule { }
