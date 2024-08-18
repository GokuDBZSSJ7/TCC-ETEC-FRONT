import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  hide = true;
  form!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private loginService: AuthService) { }
  
  ngOnInit(): void {
    this.createForm();
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.min(6)]]
    });
  }

  register() {
    try {
      this.loginService.register(this.form.value).subscribe({
        next: res => {
          console.log("Deu certo");
          
        }
      })
    } catch(error: any) {
      console.log(error);
      
    }
  }
}
