import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockControllerComponent } from './stock-controller/stock-controller.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: StockControllerComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
