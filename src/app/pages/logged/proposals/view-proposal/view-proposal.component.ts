import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

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
  commentary!: FormGroup;
  user = this.authService.getUser();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    console.log(this.data);
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
}
