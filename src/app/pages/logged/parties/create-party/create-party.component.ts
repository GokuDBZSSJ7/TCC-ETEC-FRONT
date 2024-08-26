import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../../services/user.service';
import { CityService } from '../../../../services/city.service';
import { StateService } from '../../../../services/state.service';

@Component({
  selector: 'app-create-party',
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
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.scss'
})
export class CreatePartyComponent implements OnInit {

  users: any[] = [];
  selectedStateId: any;
  cities: any[] = []
  states: any[] = []

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listStates();
  }

  listUsers() {
    this.userService.all().subscribe({
      next: res => {
        this.users = res
      }
    })
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