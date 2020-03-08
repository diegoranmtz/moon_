import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private apiUrl: string ;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.url}pagina`;
  }

  selectItem_usuario(item: { usuario: string }) : Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}`, item);
  }
  selectItem_Usuario_AccionKey(item: { usuario: string, accionKey: string }) : Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/accionUser`, item);
  }
  insertItem(item) : Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/guardar`, item);
  }
  updateItem(item) : Observable<any>{
    return this.httpClient.put<any>(`${this.apiUrl}/${item._id}`, item);
  }
  deleteItem(id) : Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
