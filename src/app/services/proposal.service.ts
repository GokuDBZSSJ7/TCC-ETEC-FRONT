import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  all(): Observable<any> {
    return this.http.get(`${this.apiUrl}proposals`);
  }

  create(data: any): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.apiUrl}proposals`, data).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  myProposals(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}showMyPromisses/${id}`);
  }

  getFinishedProposals(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}getFinishedProposals/${id}`);
  }
}
