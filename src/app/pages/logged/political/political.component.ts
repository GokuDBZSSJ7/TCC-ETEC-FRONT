import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-political',
  standalone: true,
  imports: [
    MatIcon,
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
  ],
  templateUrl: './political.component.html',
  styleUrl: './political.component.scss'
})
export class PoliticalComponent implements OnInit {
  user: any;
  myUser = this.authService.getUser();
  imageUrl: string | ArrayBuffer | null = null;
  form!: FormGroup;
  edit: boolean = false;
  selectedStateId: any;
  states: any[] = []
  cities: any[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private stateService: StateService,
    private cityService: CityService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['data']) {
        this.user = JSON.parse(params['data']);
        console.log(this.user);
      }
    });
    this.listStates();
    this.createForm()
  }

  listStates() {
    this.stateService.all().subscribe({
      next: res => {
        this.states = res;
      }
    })
  }
  createForm() {
    this.form = this.fb.group({
      city_id: null,
      state_id: null,
      image_url: null,
    });
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

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      const filteredData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== null && formData[key] !== '' && formData[key] !== undefined) {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as any);

      this.userService.update(this.form.value, this.user.id).subscribe({
        next: res => {
          console.log("TESTE");
          
        }
      })
    }

    
  }
  
}
