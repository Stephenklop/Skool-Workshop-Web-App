import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Globals } from 'src/globals';
import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TextInputRegularComponent } from './components/text-input-regular/text-input-regular.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { IconsModule } from './icons/icons.module';
import { AccountComponent } from './pages/account/account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DatatabletestComponent } from './test/datatabletest/datatabletest.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { GoogleAnalyticsService } from './services/google-analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent,
    TextInputRegularComponent,
    MenubarComponent,
    AccountComponent,
    ForgotPasswordComponent,
    CustomersComponent,
    DatatabletestComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    ChartsModule,
    DataTablesModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    Globals,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
