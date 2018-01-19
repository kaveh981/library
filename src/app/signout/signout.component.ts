import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html'
})
export class SignoutComponent implements OnInit {

  book = null;
  lid;
  bid;
  mid;
  constructor(private libraryService: LibraryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bid = params.bid;
      this.lid = params.lid;
      this.getBookById(this.lid, this.bid);
    });
  }


  getBookById(lid, bid) {
    this.libraryService.bookById(lid, bid).subscribe(result => {
      this.book = result;
    });
  }

  signout() {
    if (isNaN(this.mid)) {
      alert('please enter a valid number');
      return null;
    }
    this.libraryService.signout(this.lid, this.bid, this.mid).subscribe(result => {
      try {
        this.libraryService.addToMemberBooks(this.mid, {
          lid: this.lid,
          bid: this.bid, title: this.book.Title,
          isbn: this.book.ISBN,
          lbsid: result.LibraryBookSId
        });
        alert('Signed out successfully');
      } catch (error) {
        alert(error);
      }
    }, error => {
      alert(error);
    });
  }

}
