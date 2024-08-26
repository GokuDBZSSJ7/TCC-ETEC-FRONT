import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-approve-politician',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './approve-politician.component.html',
  styleUrl: './approve-politician.component.scss'
})
export class ApprovePoliticianComponent {
  showFilters = false;
  constructor() { }
}
