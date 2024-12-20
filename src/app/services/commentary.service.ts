import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    // private loadingService: LoadingService
  ) { }

  newComment(data: any): Observable<any> {
    // this.loadingService.show();
    return this.http.post(`${this.apiUrl}comments`, data);
  }

  getCommentsByPromisseId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getCommentsByPromisseId/${id}`)
  }
}
