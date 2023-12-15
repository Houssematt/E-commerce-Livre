import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.modules';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BooksInterface } from './interfaces/books.interface';
import { NgxsReadMoreModule } from '@minni/read-more';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsercomponentComponent } from './usercomponent/usercomponent.component';
import { FormsModule } from '@angular/forms';
import { LivraisonComponent } from './livraison/livraison.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiscoverComponent,
    BooksComponent,
    LoginComponent,
    SignupComponent,
    AddBookComponent,
    EditBookComponent,
    FormulaireComponent,
    HeaderComponent,
    ShoppingCartComponent,
    UsercomponentComponent,
    LivraisonComponent,
    
    
  
    
    
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxsReadMoreModule,
    BrowserAnimationsModule,
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
