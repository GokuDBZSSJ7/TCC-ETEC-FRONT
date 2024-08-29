import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../../services/user.service';
import { CityService } from '../../../../services/city.service';
import { StateService } from '../../../../services/state.service';
import { AuthService } from '../../../../services/auth.service';
import { PartyService } from '../../../../services/party.service';

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
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.scss'
})
export class CreatePartyComponent implements OnInit {

  users: any[] = [];
  form!: FormGroup;
  selectedStateId: any;
  imageUrl: string | ArrayBuffer | null = null;
  cities: any[] = []
  user: any = this.authService.getUser();
  states: any[] = []

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private cityService: CityService,
    private fb: FormBuilder,
    private authService: AuthService,
    private partyService: PartyService
  ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listStates();
    this.initializeForm();
  }

  listUsers() {
    this.userService.all().subscribe({
      next: res => {
        this.users = res
      }
    })
  }

  initializeForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      leader_id: [null, Validators.required],
      acronym: [null, Validators.required],
      city_id: [null, Validators.required],
      image_url: [null, Validators.required]
    });
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

  listStates() {
    this.stateService.all().subscribe({
      next: res => {
        this.states = res;
      }
    })
  }

  create() {
    this.partyService.create(this.form.value).subscribe({
      next: res => {
        console.log("FUNCIONOU");
        
      }
    })
  }

}