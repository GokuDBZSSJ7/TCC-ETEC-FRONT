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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyService } from '../../../services/party.service';
import { NavigationExtras, Router } from '@angular/router';
import { SidemenuService } from '../../../services/sidemenu.service';

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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './politicians.component.html',
  styleUrl: './politicians.component.scss'
})
export class PoliticiansComponent implements OnInit {
  users: any[] = []
  states: any[] = []
  cities: any[] = []
  parties: any[] = []
  form!: FormGroup;
  showFilters = false;
  selectedStateId: any;
  isSidemenuOpen: any;

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private cityService: CityService,
    private partyService: PartyService,
    private fb: FormBuilder,
    private router: Router,
    private sidemenuService: SidemenuService,
  ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listStates();
    this.listParties();
    this.createForm();
    this.sidemenuService.sidemenuSubject$.subscribe({
      next: res => {
        console.log('sidemenuState: ', res)
        this.isSidemenuOpen = res;
        console.log({ sidemenuState: this.isSidemenuOpen });
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      name: null,
      city_id: null,
      state_id: null,
      party_id: null
    });
  }

  listUsers() {
    this.userService.getPoliticians().subscribe({
      next: res => {
        this.users = res
      }
    })
  }

  onStateChange(): void {
    this.form.patchValue({
      state_id: this.selectedStateId
    })

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

  openPoliticalPage(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        political: item
      }
    };
    this.router.navigate(['/political'], navigationExtras);
    console.log(item);
  }

  applyFilter() {
    this.userService.filterUser(this.form.value).subscribe({
      next: res => {
        this.users = res;
      }
    })
  }
}