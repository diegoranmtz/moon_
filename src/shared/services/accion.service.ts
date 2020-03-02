import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccionService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}accion`;
  }

  selectItem_paginaKey(item: { paginaKey: string }) : Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
}
