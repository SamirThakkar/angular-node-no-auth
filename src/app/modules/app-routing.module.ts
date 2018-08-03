import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {DashboardModule} from './dashboard/dashboard.module';
import {RootComponent} from '../components/layout/root.component';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {inventoryModule} from './inventory/inventory.module';
import {UserModule} from './user/user.module';
import {PagerService} from '../@shared/services';
import {DashboardComponent} from "./dashboard/dashboard.component";

let routes: Routes = [




  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '',
    component: RootComponent,
    children: [...DashboardModule.ROUTES]
  },
  {
    path: 'homepage',
    component: HomeComponent
  },
  {
    path: 'app',
    component: RootComponent,
    children: [...inventoryModule.ROUTES]
  },
  {
    path: 'user',
    component: RootComponent,
    children: [...UserModule.ROUTES]
  },
  {
    path: 'file-upload',
    component: RootComponent,
    children: [...inventoryModule.ROUTES]
  },

  { path: '**',
    redirectTo: '/dashboard'
  },



];

@NgModule({
  declarations: [RootComponent, HomeComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forRoot(routes), DashboardModule, inventoryModule],
  exports: [RouterModule],
  providers: [PagerService]
})
export class AppRoutingModule {
}
