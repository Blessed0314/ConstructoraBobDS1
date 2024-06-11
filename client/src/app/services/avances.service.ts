import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvancesService {
  urlImg: string = 'https://api.cloudinary.com/v1_1/dck1pqw4h/image/upload';

  url: string = '';

  constructor(private http: HttpClient ) { }


  registrarAvance(datosAvance: any ) : Observable<any>  {
    return this.http.post('http://127.0.0.1:8000/reporte/', datosAvance)
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
