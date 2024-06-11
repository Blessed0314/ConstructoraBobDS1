import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) { }

  registrarTarea(datosTarea: any ) : Observable<any>  {
    return this.http.post('http://127.0.0.1:8000/tarea/', datosTarea)
  }

  traerTareasId() : Observable<any> {
    return this.http.get('http://127.0.0.1:8000/tipo_tarea/')
  }

  traerTareas(obraId: string): Observable<any> {
    let params = new HttpParams().set('obraId', obraId);
    return this.http.get('http://127.0.0.1:8000/tarea', { params: params });
  }

}
