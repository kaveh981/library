import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html'
})
export class ReturnBookComponent implements OnInit {

  books: [Book];
  mid;
  constructor(private libraryService: LibraryService) { }

  ngOnInit() {

  }

  getMemberBooks() {
    const result = this.libraryService.getMemberBooksByMemberId(this.mid);
    this.books = result;

  }

  returnBook(bid, lid, lbsid) {
    const result = this.libraryService.returnBook(lid, lbsid, this.mid).subscribe(res => {
      this.libraryService.removeFromMemberBooks(this.mid, bid, lid);
      this.getMemberBooks();
    });
  }

}
