import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonederoService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}monedero`;
  }

  selectItems() : Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/all`)
  }
  selectItem_paginaKey(item: { paginaKey: string }){
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
}
