import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { ProposalService } from '../../../services/proposal.service';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [
    MatDividerModule,
  ],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.scss'
})
export class ProposalsComponent implements OnInit{
  user: any
  proposals: any[] = []

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

  listProposals() {
    this.proposalService.myProposals(this.user).subscribe({
      next: res => {
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })
  }
}
