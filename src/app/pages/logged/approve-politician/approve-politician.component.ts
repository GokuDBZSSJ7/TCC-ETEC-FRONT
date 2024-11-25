import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ApproveModalComponent } from './approve-modal/approve-modal.component';
import { SidemenuService } from '../../../services/sidemenu.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    private breakpointObserver: BreakpointObserver,
  ) { }

  dialog = inject(MatDialog);

  openDialog(data: any) {
    let dialogWidth = '400px';
    let dialogHeight = 'auto';

    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Tela pequena (celular)
      Breakpoints.Small,  // Tela média (tablet)
      Breakpoints.Medium, // Tela maior (laptop)
      Breakpoints.Large,  // Tela desktop
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        dialogWidth = '100dvw';
        dialogHeight = '400px';
      } else if (result.breakpoints[Breakpoints.Small]) {
        dialogWidth = '80%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Medium]) {
        dialogWidth = '70%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Large]) {
        dialogWidth = '400px';
        dialogHeight = 'auto';
      }
      const dialogRef = this.dialog.open(ApproveModalComponent, {
        data: data,
        width: dialogWidth,
        height: dialogHeight,
        maxWidth: '100vw',
        maxHeight: '100vh',
      });

      dialogRef.afterClosed().subscribe(res => {
        this.listUsers();
      })
    })
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
