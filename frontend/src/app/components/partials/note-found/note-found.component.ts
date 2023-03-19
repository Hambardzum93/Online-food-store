import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-found',
  templateUrl: './note-found.component.html',
  styleUrls: ['./note-found.component.scss']
})
export class NoteFoundComponent implements OnInit {

  @Input() visible = false;
  @Input() notFoundMessage = "Nothing Found!";
  @Input() resetLinkText = "Reset";
  @Input() resetLinkRoute = "/";

  constructor() { }

  ngOnInit(): void {
  }

}
