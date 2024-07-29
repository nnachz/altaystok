import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { StockControllerComponent } from './stock-controller/stock-controller.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
//import { MdbTableModule } from 'mdb-angular-ui-kit/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



export function tokenGetter() {
  return localStorage.getItem('token');
}



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StockControllerComponent,
    FilterPipe,
    LoginComponent,
    AdminDashboardComponent,


  ],
  imports: [
   // MdbTableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7110'],
        disallowedRoutes: ['localhost:7110/api/auth/login']
      }
    }),

  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
