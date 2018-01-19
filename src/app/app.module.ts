import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { BooksComponent } from './books/books.component';
import { SignoutComponent } from './signout/signout.component';
import { ReturnBookComponent } from './return-book/return-book.component';

import { LibraryService } from './library.service';


@NgModule({
  declarations: [
    AppComponent,
    LibrariesComponent,
    BooksComponent,
    SignoutComponent,
    ReturnBookComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
