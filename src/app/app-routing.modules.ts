import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiscoverComponent } from './discover/discover.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksComponent } from './books/books.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsercomponentComponent } from './usercomponent/usercomponent.component';
import { LivraisonComponent } from './livraison/livraison.component';


const routes: Routes = [
   
    {path:'discover',component:DiscoverComponent},
    {path:'books',component:BooksComponent},
    {path:'home',component:HomeComponent},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'edit-book/:id',component:EditBookComponent},
    {path:'add-book',component:AddBookComponent},
    {path:'form',component:FormulaireComponent},
    {path:'shop',component:ShoppingCartComponent},
    {path:'livraison',component:LivraisonComponent},
    {path:'users',component:UsercomponentComponent},
    

    { path: '**', redirectTo: '/home', pathMatch: 'full' },

    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }