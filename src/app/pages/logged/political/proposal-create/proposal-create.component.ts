import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-proposal-create',
  standalone: true,
  providers: [provideNativeDateAdapter(), CurrencyPipe],
  imports: [
    CommonModule,
    MatDialogTitle,
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
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './proposal-create.component.html',
  styleUrl: './proposal-create.component.scss'
})
export class ProposalCreateComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);
  imageUrl: string | ArrayBuffer | null = null;
  partyId: any;
  form!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  areas: any[] = [];
  parties: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ProposalCreateComponent>,
    private proposalService: ProposalService,
    private _snackBar: MatSnackBar,
    private areaService: AreaService,
    private partyService: PartyService,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.createForm();
    this.listAreas();
    this.listParties()
  }

  listAreas() {
    this.areaService.all().subscribe({
      next: res => {
        this.areas = res
      }
    })
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
      title: null,
      description: null,
      political_id: this.data.id,
      party_id: this.partyId,
      image_url: null,
      budget: null,
      time: null,
      area_id: null,
      status: null
    });
  }

  save() {
    let budget = this.form.get('budget')?.value;

    console.log('Antes: ', this.form.value);
    budget = parseFloat(budget.toString().replace(/[^\d]/g, ''));
    this.form.get('budget')?.setValue(budget);
    console.log('Depois: ', this.form.value);

    this.proposalService.create(this.form.value).subscribe({
      next: res => {
        this._snackBar.open('Proposta cadastrada com sucesso!', 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['snackbar-success'],
          duration: 4000,
        });
        this.dialogRef.close();
      }
    });
  }


  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const base64String = e.target.result as string;
          this.imageUrl = base64String;
          this.form.get('image_url')?.setValue(base64String);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  formatBudget(): void {
    let value = this.form.get('budget')?.value;

    if (value !== null && value !== undefined) {
      value = value.toString().replace(/[^\d]/g, '');

      let integerPart = value.slice(0, -2);
      let decimalPart = value.slice(-2);

      if (integerPart === '') {
        integerPart = '0';
      }

      if (decimalPart === '') {
        decimalPart = '00';
      }

      if (integerPart === '0' && value.length === 1) {
        decimalPart = `${value}0`;
      }

      const formattedValue = `${integerPart}.${decimalPart}`;

      const formattedCurrency = Number(formattedValue).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      this.form.get('budget')?.setValue(formattedCurrency);
    }
  }
}
