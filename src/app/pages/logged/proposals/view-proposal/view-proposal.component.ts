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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../../../services/user.service';

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
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user = this.authService.getUser();
  like: any

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commentaryService: CommentaryService,
    private proposalService: ProposalService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getCommentsByPromisseId();
    this.getLike()
  }

  sendComment(commentary: string) {
    if (commentary !== '') {
      this.commentaryService.classifyComment({ comentario: commentary }).subscribe({
        next: res => {
          if (res.categoria === 'ofensivo') {
            this._snackBar.open('Seu comentário foi considerado ofensivo, por isso não será publicado!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['snackbar-error'],
              duration: 10000,
            });
            return;
          } else if(res.categoria === 'discurso de ódio') {
            this._snackBar.open('Seu comentário foi considerado discurso de ódio, você não poderá comentar no site por 1 semana!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['snackbar-error'],
              duration: 10000,
            });
            this.userService.banUser(this.user.id).subscribe({
              next: res => {
                console.log(res);
                
              }
            })
            return;
          }
  
          this.commentaryService.newComment({ description: commentary, promisse_id: this.data?.id, user_id: this.user?.id })
            .subscribe({
              next: res => {
                this.getCommentsByPromisseId();
                console.log(res);
              },
              error: err => {
                console.error('Erro ao enviar novo comentário:', err);
                this._snackBar.open('Erro ao enviar comentário. Tente novamente mais tarde.', 'Fechar', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  panelClass: ['snackbar-error'],
                  duration: 4000,
                });
              }
            });
          this.commentary = '';
        },
        error: err => {
          console.error('Erro ao classificar comentário:', err);
          this._snackBar.open('Erro ao classificar comentário. Tente novamente mais tarde.', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['snackbar-error'],
            duration: 4000,
          });
        }
      });
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
