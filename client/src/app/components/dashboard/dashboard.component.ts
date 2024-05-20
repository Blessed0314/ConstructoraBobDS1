import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tipoUsuario: any;

  constructor(private router: Router) {
    this.getTipoUsuario();
  }

  getTipoUsuario() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(localStorage.getItem('user')==null){
      this.router.navigate(['login']);
    }else{
      this.tipoUsuario = user.data.tipoUsuario;
    }

  }



}
