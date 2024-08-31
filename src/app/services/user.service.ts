import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.apiUrl}filterPoliticians`, data)
  }
}