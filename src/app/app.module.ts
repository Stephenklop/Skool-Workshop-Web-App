import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Globals } from 'src/globals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TextInputRegularComponent } from './components/text-input-regular/text-input-regular.component';
import { MenubarComponent } from './components/menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent,
    TextInputRegularComponent,
    MenubarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
