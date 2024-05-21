import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestionObrasGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = JSON.parse(localStorage.getItem('user') ?? '{}').data.tipoUsuario;

    // Verificar si el usuario es Gerente o Director de Obra
    if (role === 'Gerente' || role === 'Director de Obra') {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
