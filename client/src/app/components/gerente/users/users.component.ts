import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios: any[] = []
  usuario: any = {}

  loading: boolean;

  constructor(  private usuarioService: UsuarioService,
                private router:Router)
                {
                  this.getUsuarios()
                  this.loading = true;
                }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      this.loading = false;
    });
  }

  deleteUsuario(id: string) {

    this.usuarioService.deleteUsuario(id).subscribe((data: any) => {
      this.getUsuarios();
      Swal.fire({
        icon: 'success',
        title: 'Se ha borrado el Usuario',
        timer: 2000,
        showConfirmButton: false
      })
    })
  }

  cambiarEstadoUsuario(id: string, estado: boolean) {

    this.usuarioService.cambiarEstadoUsuario(id, !estado).subscribe((data: any) => {
      console.log(data)

      this.getUsuarios();
      Swal.fire({
        icon: 'success',
        title: 'Se ha cambiado el estado del Usuario',
        timer: 2000,
        showConfirmButton: false
      })
    })
  }

  detalles(id:string){

    this.usuarioService.getUsuario(id).subscribe((data: any) => {
      this.usuario = data;
      Swal.fire({
        title: "Usuario: "+ this.usuario.username,
        html: `<img class="img-circle" src="${this.usuario.foto}" alt=""><hr>
              <p><b>Nombres:</b> ${this.usuario.nombre}</p> <hr>
              <p><b>Apellidos:</b> ${this.usuario.apellido}</p> <hr>
              <p><b>Identificación:</b> ${this.usuario.noIdentificacion}</p> <hr>
              <p><b>Cargo:</b> ${this.usuario.tipoUsuarioId}</p> <hr>
              <p><b>Género:</b> ${this.usuario.genero}</p> <hr>
              <p><b>Dirección:</b> ${this.usuario.direccion}</p> <hr>
              <p><b>Teléfono:</b> ${this.usuario.noCelular}</p> <hr>`
              ,
        icon: "info"
      });
    })
  }

  editarUsuario(id: string) {

    this.router.navigate(['/dashboard/userDetail', id]);

  }
}
