import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-political',
  standalone: true,
  imports: [],
  templateUrl: './political.component.html',
  styleUrl: './political.component.scss'
})
export class PoliticalComponent implements OnInit {
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = history.state.political;
    console.log(this.user);
  }
}
