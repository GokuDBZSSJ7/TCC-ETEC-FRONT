import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  all(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}parties`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}parties`, data);
  }
}