import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { StateService } from '../../../services/state.service';
import { CommonModule } from '@angular/common';
import { CityService } from '../../../services/city.service';
import { FormsModule } from '@angular/forms';
import { PartyService } from '../../../services/party.service';

@Component({
  selector: 'app-politicians',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgSelectModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './politicians.component.html',
  styleUrl: './politicians.component.scss'
})
export class PoliticiansComponent implements OnInit {
  users: any[] = []
  states: any[] = []
  cities: any[] = []
  parties: any[] = []
  showFilters = false;
  selectedStateId: any;

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private cityService: CityService,
    private partyService: PartyService
  ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listStates();
    this.listParties()
  }

  listUsers() {
    this.userService.getPoliticians().subscribe({
      next: res => {
        console.log(res);
        this.users = res
      }
    })
  }

  onStateChange(): void {
    console.log(this.selectedStateId);

    if (this.selectedStateId) {
      this.cityService.all(this.selectedStateId).subscribe(data => {
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

  listParties() {
    this.partyService.all().subscribe({
      next: res => {
        this.parties = res;
      }
    })
  }
}