import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartyService } from '../../../services/party.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
    RouterModule,
    MatTableModule,
    MatPaginator,
    ReactiveFormsModule,
  ],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent implements OnInit {
  showFilters = false;
  selectedStateId: any;
  cities: any[] = []
  states: any[] = []
  parties: any[] = []
  form!: FormGroup;
  user = this.authService.getUser();
  displayedColumns: string[] = ['image', 'name', 'acronym', 'founders', 'city_uf'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private cityService: CityService,
    private partyService: PartyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listStates()
    this.listParties();
    this.createForm();
  }

  onStateChange(): void {
    console.log(this.selectedStateId);

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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
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

  applyFilter() {

  }
}