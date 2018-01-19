import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibrariesComponent } from './libraries/libraries.component';
import { BooksComponent } from './books/books.component';
import { SignoutComponent } from './signout/signout.component';
import { ReturnBookComponent } from './return-book/return-book.component';

const appRoutes: Routes = [
    { path: 'libraries', component: LibrariesComponent },
    { path: 'books/:id', component: BooksComponent },
    { path: 'signout/:lid/librarybook/:bid', component: SignoutComponent },
    { path: 'returnbook', component: ReturnBookComponent },
    { path: '', redirectTo: '/libraries', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
