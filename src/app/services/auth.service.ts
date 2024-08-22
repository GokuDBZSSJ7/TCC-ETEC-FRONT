import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

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

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {});
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }
}