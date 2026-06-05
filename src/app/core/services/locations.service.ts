import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private http = inject(HttpClient);

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/locations/states`);
  }

  getCities(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/locations/states/${stateId}/cities`);
  }

  searchLocations(query: string): Observable<any[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any[]>(`${environment.apiBaseUrl}/locations/search`, { params });
  }
}
