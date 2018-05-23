import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  selectedPerson;
  selectedPersonNo;
  searchText;
  showtable = false;
  persons;
  allPersons;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('assets/person.json').subscribe((data: any) => {
      this.persons = data.People;
      this.allPersons = data.People;
    });
  }

  onSelect(i, person: any): void {
    this.showtable = true;
    const maxLikesDislikes = Math.max(person.Likes.length, person.Dislikes.length);
    let likes = person.Likes;
    for(let i = person.Likes.length; i < maxLikesDislikes; i++) {
      likes.push(' ');
    }
    person.Likes = likes;
    let dislikes = person.Dislikes;
    for(let i = person.Dislikes.length; i < maxLikesDislikes; i++) {
      dislikes.push(' ');
    }
    person.Dislikes = dislikes;
    this.selectedPerson = person;
    this.selectedPersonNo = i;
  }
  search() {
    this.showtable = false;
    this.selectedPersonNo = null;
    if (this.searchText && this.searchText.length > 0) {
      this.persons = this.allPersons.filter(person => person.name.toLowerCase().includes(this.searchText.toLowerCase()))
    } else {
      this.persons = this.allPersons;
    }
  }
}
