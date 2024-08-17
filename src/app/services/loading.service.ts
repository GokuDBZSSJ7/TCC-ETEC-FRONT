import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { LoadingSpinnerComponent } from '../shared/utils/loading-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dialogRef: any;

  constructor(private dialog: MatDialog) { }

  show(message: string = 'Carregando...') {
    this.loadingSubject.next(true);
    this.dialogRef = this.dialog.open(LoadingSpinnerComponent, {
      data: { message },
      disableClose: true,
    });
  }

  hide() {
    this.loadingSubject.next(false);
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  isLoading() {
    return this.loadingSubject.asObservable();
  }
}
