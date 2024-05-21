import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }


  registrarObra(datosCliente: any ) : Observable<any>  {
    return this.http.post('http://127.0.0.1:8000/obra/', datosCliente)
  }

  getObras() {
    return this.http.get('http://127.0.0.1:8000/obra/');
  }

  getObra(id: string) {
    return this.http.get('http://127.0.0.1:8000/obra/' + id);
  }
}
