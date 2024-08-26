import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent implements OnInit {
  showFilters = false;
  selectedStateId: any;
  cities: any[] = []
  states: any[] = []
  user = this.authService.getUser();

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.listStates()

  }

  onStateChange(): void {
    console.log(this.selectedStateId);

    if (this.selectedStateId) {
      this.cityService.all(this.selectedStateId.id).subscribe(data => {
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }

  listStates() {
    this.stateService.all().subscribe({
      next: res => {
        this.states = res;
      }
    })
  }
}