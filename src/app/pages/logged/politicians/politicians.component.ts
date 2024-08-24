import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-politicians',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './politicians.component.html',
  styleUrl: './politicians.component.scss'
})
export class PoliticiansComponent implements OnInit {
  users: any[] = []
  showFilters = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.all().subscribe({
      next: res => {
        console.log(res);
        this.users = res
      }
    })
  }
}