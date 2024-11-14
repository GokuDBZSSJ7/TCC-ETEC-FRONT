import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommentaryService } from '../../../../services/commentary.service';
import { ProposalService } from '../../../../services/proposal.service';

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
    MatDialogContent,
    FormsModule,
  ],
  templateUrl: './view-proposal.component.html',
  styleUrl: './view-proposal.component.scss'
})
export class ViewProposalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ViewProposalComponent>);
  data = inject(MAT_DIALOG_DATA);
  displayComments: boolean = false;
  commentary: string = '';
  commentsData: any[] = [];
  comments: any[] = [];
  user = this.authService.getUser();
  like: any

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commentaryService: CommentaryService,
    private proposalService: ProposalService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getCommentsByPromisseId();
    this.getLike()
  }

  sendComment(commentary: string) {
    if (this.commentary !== '') {
      this.commentaryService.newComment({ description: commentary, promisse_id: this.data?.id, user_id: this.user?.id })
        .subscribe({
          next: res => {
            this.getCommentsByPromisseId();
            console.log(res);
          }
        });
      this.commentary = '';
    }
  }

  getCommentsByPromisseId() {
    this.commentaryService.getCommentsByPromisseId(this.data?.id).subscribe({
      next: res => {
        this.comments = res.comments;
        console.log('Comments: ', this.comments);
      }
    })
  }

  // commentaryForm() {
  //   this.commentary = this.fb.group({
  //     id: null,
  //     description: null,
  //     image_url: null,
  //     promisse_id: this.data?.id,
  //     user_id: this.user?.id,
  //   })
  // }

  toogleLike(action: string) {
    const data = {
      "type": action,
      "promisse_id": this.data.id,
      "user_id": this.user.id
    }
    this.proposalService.toogleLike(data).subscribe({
      next: res => {
        console.log(res);
        this.getLike();
      }
    })
  }

  getLike() {
    this.proposalService.getLikeByPromisse(this.data.id).subscribe({
      next: res => {
        console.log(res);
        this.like = res[0]
      }
    })
  }
}
