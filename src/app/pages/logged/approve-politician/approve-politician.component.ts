import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ApproveModalComponent } from './approve-modal/approve-modal.component';

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

  dialog = inject(MatDialog);

  openDialog(data: any) {
    this.dialog.open(ApproveModalComponent, {
      data: {
        data: data,
      },
      width: '60%',
      height: '40%'
    });
  }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUsers().subscribe({
      next: res => {
        this.users = res;
      }
    })
  }
}
