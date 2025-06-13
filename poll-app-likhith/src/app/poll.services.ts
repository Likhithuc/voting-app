import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Poll } from './poll.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollServices {
  private baseUrl = 'http://localhost:8080/api/polls'; // Backend endpoint

  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseUrl);
  }

  createPoll(poll: Poll): Observable<Poll> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Poll>(this.baseUrl, poll, { headers });
  }

  vote(pollId: number, optionIndex: number): Observable<void> {
    const url = `${this.baseUrl}/vote`;
    return this.http.post<void>(url, { pollId, optionIndex });
  }


}
