import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html'
})
export class LibrariesComponent implements OnInit {

  dataSource;
  constructor(private libraryService: LibraryService) { }


  ngOnInit() {
    this.getLibraries();
  }


  getLibraries() {
    this.libraryService.libraries()
      .subscribe(data => {
        this.dataSource = data;
      });
  }
}
