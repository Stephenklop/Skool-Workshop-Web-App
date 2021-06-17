import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Globals } from 'src/globals';
import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { GridsterModule } from 'angular-gridster2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { IconsModule } from './icons/icons.module';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { FormsModule } from '@angular/forms';
import { LoginStatsComponent } from './widgets/login-stats/login-stats.component';
import { WidgetParentComponent } from './components/widget-parent/widget-parent.component';
import { OpenStatsComponent } from './widgets/open-stats/open-stats.component';
import { OrderStatsComponent } from './widgets/order-stats/order-stats.component';
import { NotificationsComponent } from './widgets/notifications/notifications.component';
import { QuizComponent } from './widgets/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent,
    MenubarComponent,
    LoginStatsComponent,
    WidgetParentComponent,
    OpenStatsComponent,
    OrderStatsComponent,
    NotificationsComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    ChartsModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    GridsterModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    Globals,
    HttpClient,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
