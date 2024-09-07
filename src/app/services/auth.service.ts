import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private currentUser: any;

  constructor(private http: HttpClient, private loadingService: LoadingService, private router: Router) { }

  login(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}auth/login`, data).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  register(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}register`, data).pipe(
      tap(response => {
        // Caso você precise fazer algo específico após o registro, adicione aqui
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {});
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  getUser(): any {
    const userString = localStorage.getItem('user');
    this.currentUser = userString ? JSON.parse(userString) : null;
    return this.currentUser;
  }

  logout(): void {
    this.loadingService.show();
    
    // Remove os itens do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Opcional: Redireciona para a página de login após o logout
    this.router.navigate(['/login']).then(() => {
      this.loadingService.hide();
    });
  }
}