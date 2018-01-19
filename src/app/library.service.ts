import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LibraryService {

  memberBooks: [MemberBook];
  constructor(private http: HttpClient) { }

  libraries(): Observable<any> {
    return this.http.get<any>('https://libraryapi.azurewebsites.net/api/Libraries');
  }

  booksByLibraryId(libraryId): Observable<any> {
    return this.http.get<any>(`https://libraryapi.azurewebsites.net/api/libraries/${libraryId}/librarybook`);
  }

  bookById(libraryId, bookId) {
    return this.http.get(`https://libraryapi.azurewebsites.net/api/libraries/${libraryId}/librarybook/${bookId}`);
  }

  signout(lid, bid, mid): Observable<any> {
    return this.http.post<any>(`https://libraryapi.azurewebsites.net/api/libraries/${lid}/managebook/${bid}?mid=${mid}`,
      null);
  }

  returnBook(lid, lbsid, mid): Observable<any> {
    return this.http.put<any>(`https://libraryapi.azurewebsites.net/api/libraries/${lid}/managebook/${lbsid}?mid=${mid}`,
      null);
  }

  addToMemberBooks(mid, book: Book) {
    let memberBooks: MemberBook;
    if (this.memberBooks) {
      memberBooks = this.memberExist(mid);
      console.log(memberBooks);
    }
    if (memberBooks === null && this.memberBooks) {
      this.memberBooks.push({ mid: mid, books: [book] });
    } else if (!this.memberBooks) {
      this.memberBooks = [{ mid: mid, books: [book] }];
    } else if (this.signoutBooksFromLibraryQuantity(book.lid, memberBooks.books) < 2) {
      memberBooks.books.push(book);
    } else {
      throw Error('Not more than two books allowed at one time');
    }
    console.log(this.memberBooks);
  }

  removeFromMemberBooks(mid, bid, lid) {
    const memberBooks: MemberBook = this.memberExist(mid);
    for (let i = 0; i < memberBooks.books.length; i++) {
      if (memberBooks.books[i].lid === lid && memberBooks.books[i].bid === bid) {
        memberBooks.books.splice(i, 1);
      }
    }
    console.log(this.memberBooks);
  }

  getMemberBooksByMemberId(mid): [Book] {
    if (!this.memberBooks) {
      return null;
    }
    for (let i = 0; i < this.memberBooks.length; i++) {
      if (this.memberBooks[i].mid === mid) {
        return this.memberBooks[i].books;
      }
    }
    return null;
  }

  private memberExist(mid): MemberBook {
    for (let i = 0; i < this.memberBooks.length; i++) {
      if (this.memberBooks[i].mid === mid) {
        return this.memberBooks[i];
      }
    }
    return null;
  }

  private signoutBooksFromLibraryQuantity(lid, books: [Book]) {
    let count = 0;
    for (let i = 0; i < books.length; i++) {
      if (books[i].lid === lid) {
        count++;
      }
    }
    return count;
  }

}
