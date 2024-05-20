import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input()
  tipoUsuario: any;

  constructor(private router: Router) { }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
