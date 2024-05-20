import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlImg: string = 'https://api.cloudinary.com/v1_1/dck1pqw4h/image/upload';

  url: string = '';

  constructor(private http: HttpClient ) { }




  getUsuarios() {
    return this.http.get('http://127.0.0.1:8000/usuario/');
  }

  getUsuario(id: string) {
    return this.http.get('http://127.0.0.1:8000/usuario/' + id);
  }

  deleteUsuario(id: string) {
    return this.http.delete('http://127.0.0.1:8000/usuario/' + id);
  }

  cambiarEstadoUsuario(id: string, estado: boolean) {
    return this.http.patch('http://127.0.0.1:8000/usuario/' + id + '/', {usuariodelete: estado})
  }

  getTipoUsuario() {
    return this.http.get('http://127.0.0.1:8000/tipo_usuario/');
  }

  getTipoIdentidad() {
    return this.http.get('http://127.0.0.1:8000/tipo_identificacion/');
  }

  registrarUsuario(datosCliente: any ) : Observable<any>  {
    return this.http.post('http://127.0.0.1:8000/usuario/', datosCliente)
  }

  uploadImg(foto: any): Observable<any> {
    return this.http.post(this.urlImg, foto )
  }

  seturl(url: string){
    this.url = url;
  }

  getUrl(){
    return this.url;
  }


}
