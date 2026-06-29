import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl="https://localhost:7249/api/Country";

  constructor(private http:HttpClient) { }

  getCountries():Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl);
  }

  addCountry(country:Country){
    return this.http.post(this.apiUrl,country);
  }

  updateCountry(country:Country){
    return this.http.put(`${this.apiUrl}/${country.id}`,country);
  }

  deleteCountry(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}