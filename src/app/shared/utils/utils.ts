import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
   // declarations: [LoadingSpinnerComponent],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      MatDialogModule,
      LoadingSpinnerComponent,
      MatProgressSpinnerModule,
   ],
   exports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
   ],
   // entryComponents: [LoadingSpinnerComponent],

})
export class Utils { }