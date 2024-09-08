import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-proposal',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './view-proposal.component.html',
  styleUrl: './view-proposal.component.scss'
})
export class ViewProposalComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ViewProposalComponent>);
  data = inject(MAT_DIALOG_DATA);

  constructor(){}
  ngOnInit(): void {
    console.log(this.data);
    
  }
}
