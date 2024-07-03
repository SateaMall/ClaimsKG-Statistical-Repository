import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }

  getSuggestions(query: string): Observable<string[]> {
    const result= this.http.get<string[]>('http://localhost:5000/suggestions', { params: { query } });
    return result;
  }

  getSuggestionsTopic(query: string, topic:string): Observable<string[]> {
    let params = new HttpParams()
      .set('query', query)
      .set('topic', topic)
    const result= this.http.get<string[]>('http://localhost:5000/suggestions-topic', { params});
    return result;
  }
}
