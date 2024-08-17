import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  hide = true;
  form!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.createForm();
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  createForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required, Validators.min(6)]
    });
  }

  login() {
    try {
      this.loginService.login(this.form.value).subscribe({
        next: res => {
          console.log("Deu certo");
          
        }
      })
    } catch(error: any) {
      console.log(error);
      
    }
  }
}