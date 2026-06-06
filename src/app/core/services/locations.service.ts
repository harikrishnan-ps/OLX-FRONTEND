import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CountryDto, StateDto, CityDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private http = inject(HttpClient);

  getCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${environment.apiUrl}/locations/countries`);
  }

  getStates(countryId: number = 1): Observable<StateDto[]> {
    return this.http.get<StateDto[]>(`${environment.apiUrl}/locations/countries/${countryId}/states`);
  }

  getCities(stateId: number): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(`${environment.apiUrl}/locations/states/${stateId}/cities`);
  }

  searchLocations(query: string): Observable<any[]> {
    // API endpoint doesn't exist in docs, maybe placeholder
    const params = new HttpParams().set('query', query);
    return this.http.get<any[]>(`${environment.apiUrl}/locations/search`, { params });
  }
}
