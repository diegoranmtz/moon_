import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}pagina`;
  }

  selectItem_usuario(item: { usuario: string }){
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
}
