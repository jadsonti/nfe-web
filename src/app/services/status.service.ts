import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'http://localhost:8080/api/status'; 

  constructor(private http: HttpClient) { }

  getCurrentServiceStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`);
  }

  getServiceStatusByState(state: string): Observable<any> {
    const upperCaseState = state.toUpperCase();
    return this.http.get(`${this.apiUrl}/current/${upperCaseState}`);
  }

  getServiceStatusByStateAndDate(state: string, date: Date): Observable<any> {
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get(`${this.apiUrl}/${state}/byDate/${formattedDate}`);
  }

  getServiceStatusByDate(date: Date): Observable<any> {
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get(`${this.apiUrl}/byDate/${formattedDate}`);
  }

  getMostUnavailableStates(): Observable<string> { 
    return this.http.get(`${this.apiUrl}/mostUnavailable`, { responseType: 'text' });
  }
}
