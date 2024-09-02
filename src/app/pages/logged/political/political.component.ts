import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['data']) {
        this.user = JSON.parse(params['data']);
        console.log(this.user);
      }
    });
  }
}
