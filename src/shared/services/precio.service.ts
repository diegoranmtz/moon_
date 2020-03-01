import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}precio`;
  }

  selectItem_accionKey(item: { accionKey: string }){
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
}
