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

  selectItem_accionKey_LastSeven(item){
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
  selectItem_accionKey_Last(item: { accionKey: string }){
    return this.httpClient.post<any>(`${this.apiUrl}/last`, item);
  }
  insertItem(item) {
    item.index = parseInt(item.index);
    return this.httpClient.post<any>(`${this.apiUrl}/guardar`, item);
  }
}
