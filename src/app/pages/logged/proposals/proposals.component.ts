import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { ProposalService } from '../../../services/proposal.service';
import { ViewProposalComponent } from './view-proposal/view-proposal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.scss'
})
export class ProposalsComponent implements OnInit{
  user: any
  proposals: any[] = [];
  dialog = inject(MatDialog);

  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService
  ){}

  ngOnInit(): void {
    if (history.state && history.state.political) {
      this.user = history.state.political;
      console.log(this.user);
    }

    this.listProposals()
  }

  openViewProposalDialog(item: any) {
    const dialogRef = this.dialog.open(ViewProposalComponent, {
      data: item,
      width: '1000px',
      height: '590px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listProposals();
    })
  }

  listProposals() {
    this.proposalService.myProposals(this.user).subscribe({
      next: res => {
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })
  }
}
