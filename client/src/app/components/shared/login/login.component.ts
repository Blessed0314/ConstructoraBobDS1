import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = {
    username: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  login(forma: NgForm) {
    if (forma.valid) {
      const { username, password } = forma.value;
      this.authService.login(username, password).subscribe(
        response => {
          this.router.navigate(['/dashboard']);
          // Si la respuesta es correcta, guarda la respuesta en localStorage
          localStorage.setItem('user', JSON.stringify(response));
          // Muestra un SweetAlert de éxito
          Swal.fire('Éxito', 'Inicio de sesión correcto', 'success')
        },
        error => {
          // Si hay un error, muestra un SweetAlert con el mensaje de error
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llene todos los campos',
      });
    }
  }

}
