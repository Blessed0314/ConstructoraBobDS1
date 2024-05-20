import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GerenteGuard implements CanActivate {

  constructor(private router: Router){}
  
  canActivate(): boolean {

    const role = JSON.parse(localStorage.getItem('user') || '{}').data.tipoUsuario;

    if(role === 'Gerente'){
      return true;
    }else{
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}