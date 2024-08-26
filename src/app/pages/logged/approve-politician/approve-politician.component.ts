import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-approve-politician',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './approve-politician.component.html',
  styleUrl: './approve-politician.component.scss'
})
export class ApprovePoliticianComponent implements OnInit {
  showFilters = false;
  users: any[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.all().subscribe({
      next: res => {
        this.users = res;
      }
    })
  }
}
