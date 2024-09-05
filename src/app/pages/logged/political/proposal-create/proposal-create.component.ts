import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../../services/user.service';
import { ProposalService } from '../../../../services/proposal.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PartyService } from '../../../../services/party.service';
import { AreaService } from '../../../../services/area.service';

@Component({
  selector: 'app-proposal-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogContent,
    MatSelectModule,
    NgSelectModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './proposal-create.component.html',
  styleUrl: './proposal-create.component.scss'
})
export class ProposalCreateComponent implements OnInit{
  
  readonly dialogRef = inject(MatDialogRef<ProposalCreateComponent>);
  data = inject(MAT_DIALOG_DATA);
  form!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  areas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private proposalService: ProposalService,
    private _snackBar: MatSnackBar,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listAreas();
  }

  listAreas() {
    this.areaService.all().subscribe({
      next: res => {
        this.areas = res
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      title: null,
      description: null,
      political_id: this.data.data.id,
      party_id: this.data.data.party_id,
      image_url: null,
      budget: null,
      time: null,
      area_id: null
    });
  }

  save() {
    this.proposalService.create(this.form.value).subscribe({
      next: res => {
        this._snackBar.open('Logado com sucesso!', 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['snackbar-success'],
          duration: 4000,
        });
      }
    })
  }
}
