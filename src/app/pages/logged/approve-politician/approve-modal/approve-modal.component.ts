import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartyService } from '../../../../services/party.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-approve-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogContent,
    MatSelectModule,
    NgSelectModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './approve-modal.component.html',
  styleUrl: './approve-modal.component.scss'
})
export class ApproveModalComponent implements OnInit {
  parties: any[] = []
  readonly dialogRef = inject(MatDialogRef<ApproveModalComponent>);
  data = inject(MAT_DIALOG_DATA);
  form!: FormGroup;

  constructor(
    private partyService: PartyService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.listParties();
    this.createForm();
    console.log(this.data.data);
    
  }

  listParties() {
    this.partyService.all().subscribe({
      next: res => {
        this.parties = res
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      id: this.data.data.id,
      role: null,
      party_id: null
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    
    this.userService.setPolitician(this.form.value).subscribe({
      next: res => {
        console.log("TESTE");
        
      }
    })
  }
}
