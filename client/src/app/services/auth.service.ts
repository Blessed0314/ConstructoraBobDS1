import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private recaptcha_response: string = '';

  constructor( private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/login/', 
    { username: username, password: password, 
      recaptcha_response: this.recaptcha_response });
  }
  

  sendToken(token: string) {
    this.recaptcha_response = token;
  }
}
