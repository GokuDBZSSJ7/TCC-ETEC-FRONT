import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-Br');

@Component({
  selector: 'app-view-proposal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './view-proposal.component.html',
  styleUrl: './view-proposal.component.scss'
})
export class ViewProposalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ViewProposalComponent>);
  data = inject(MAT_DIALOG_DATA);
  displayComments: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    console.log(this.data);
  }
}
