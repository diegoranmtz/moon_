import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonederoService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}monedero`;
  }

  selectItem_paginaKey(item: { paginaKey: string }){
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
}
