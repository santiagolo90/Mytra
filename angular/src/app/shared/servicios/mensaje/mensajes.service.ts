import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMensaje } from "../../modelos/mensaje.interface";
import { IPaginate } from "../../modelos/paginate.model";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private url: string;
  private server: string;


  constructor(protected http: HttpClient) {
    this.url = environment.SERVER_URL;
    this.server = environment.SERVER;

  }

  /**
* @example
* Obtener todos las noticias
* 
* @returns {Observable<paginate>} Lista con todos las mensajes
*/
  public getAll(pagination?: number, page?: number): Observable<IPaginate<IMensaje>> {
    return this.http.get<IPaginate<IMensaje>>(this.url + `/api/mensajes/?pagination=${pagination}&page=${page}`);
  }

  /**
* @example
* Busca por nombre
* 
* @returns {Observable<paginate>} Lista con todos las mensajes filtrados
*/
  public searchByName(datos: any): Observable<IPaginate<IMensaje>> {
    return this.http.post<IPaginate<IMensaje>>(this.url + `/api/mensajes/name`, datos);
  }

  /**
* @example
* Busca por nombre
* 
* @returns {Observable<paginate>} Lista con todos las mensajes filtrados
*/
  public globalSeach(datos: any): Observable<IPaginate<IMensaje>> {
    return this.http.post<IPaginate<IMensaje>>(this.url + `/api/mensajes/`, datos);
  }
  


}
