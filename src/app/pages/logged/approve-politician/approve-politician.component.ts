import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ApproveModalComponent } from './approve-modal/approve-modal.component';
import { SidemenuService } from '../../../services/sidemenu.service';

@Component({
  selector: 'app-approve-politician',
  standalone: true,
  imports: [
    CommonModule,
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
  isSidemenuOpen: any;

  constructor(
    private userService: UserService,
    private sidemenuService: SidemenuService,
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
    this.sidemenuService.sidemenuSubject$.subscribe({
      next: res => {
        this.isSidemenuOpen = res;
        console.log({ sidemenuState: this.isSidemenuOpen });
      }
    })
  }

  listUsers() {
    this.userService.getUsers().subscribe({
      next: res => {
        this.users = res;
      }
    })
  }
}
