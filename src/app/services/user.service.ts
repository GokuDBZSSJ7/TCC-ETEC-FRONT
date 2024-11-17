import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  all(): Observable<any> {
    return this.http.get(`${this.apiUrl}users`);
  }

  getPoliticians(): Observable<any> {
    return this.http.get(`${this.apiUrl}getPoliticians`);
  }

  filterUser(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}filterPoliticians`, data).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    )
  }

  setPolitician(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}upgradeToCandidate`, data).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}getUsers`);
  }

  update(data: any, id: number): Observable<any> {
    this.loadingService.show();
    return this.http.put(`${this.apiUrl}updateUser/${id}`, data).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}users/${id}`)
  }
}