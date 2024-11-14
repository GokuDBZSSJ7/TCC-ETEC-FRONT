import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  all(state_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}getCitieByStateId/${state_id}`);
  }
}