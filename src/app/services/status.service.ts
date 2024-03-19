import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'http://localhost:8080/api/status'; // Substitua pela URL base do seu back-end

  constructor(private http: HttpClient) { }

  getCurrentServiceStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`);
  }

  getServiceStatusByState(state: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/current/${state}`);
  }

  getServiceStatusByStateAndDate(state: string, date: Date): Observable<any> {
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get(`${this.apiUrl}/${state}/byDate/${formattedDate}`);
  }

  getServiceStatusByDate(date: Date): Observable<any> {
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get(`${this.apiUrl}/byDate/${formattedDate}`);
  }
}
