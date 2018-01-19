import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {

  books;
  libraryId;
  constructor(private libraryService: LibraryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.libraryId = params.get('id')).subscribe(result => {
          this.getLibraries(this.libraryId);
        });
  }


  getLibraries(id) {
    this.libraryService.booksByLibraryId(id).subscribe(result => {
      this.books = result;
    });
  }

}
