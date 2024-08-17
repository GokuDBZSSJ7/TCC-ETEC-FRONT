import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, data).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }


}