import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }


  registrarObra(datosObra: any ) : Observable<any>  {
    return this.http.post('http://127.0.0.1:8000/obra/', datosObra)
  }

  actualizarObra(id: string, datosObra: any) {
    return this.http.patch('http://127.0.0.1:8000/obra/' + id + '/', datosObra)
  }

  getObras() {
    return this.http.get('http://127.0.0.1:8000/obra/');
  }

  getObra(id: string) {
    return this.http.get('http://127.0.0.1:8000/obra/' + id);
  }

  cambiarEstadoObra(id: string, estado: boolean) {
    return this.http.patch('http://127.0.0.1:8000/obra/' + id + '/', {obra_delete: estado})
  }
}
