import { Component } from '@angular/core';
import { ObraService } from '../../../services/obra.service';
import { UsuarioService } from '../../../services/usuario.service';
import { forkJoin, map, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-obras',
  templateUrl: './list-obras.component.html',
  styleUrl: './list-obras.component.css'
})
export class ListObrasComponent {

  obras: any[] = [];
  obra : any = {};
  loading: boolean;

  constructor(private userService: UsuarioService ,private obraService: ObraService, private router: Router) {
    this.getObras();
    this.loading = true;
  }

  getObras() {
    this.obraService.getObras().pipe(
      switchMap((data: any) => {
        const requests = data.map((obra: any) => this.getObraWithUsers(obra));
        return forkJoin(requests);
      })
    ).subscribe((obrasConUsuarios: any) => {
      this.obras = obrasConUsuarios;
      console.log(this.obras);
      this.loading = false;
    });
  }

  getUsuario(id: string) {
    return this.userService.getUsuario(id);
  }

  getObraWithUsers(obra: any) {
    return this.getUsuario(obra.directorId).pipe(
      switchMap((director: any) => {
        obra.directorNombre = director.nombre + ' ' + director.apellido;
        return forkJoin(obra.usuarios.map((userId: string) => this.getUsuario(userId)));
      }),
      map((usuarios: any) => {
        obra.usuariosNombres = usuarios.map((usuario: any) => usuario.nombre + ' ' + usuario.apellido);
        return obra;
      })
    );
  }

  cambiarEstadoObra(id: string, estado: boolean) {

    this.obraService.cambiarEstadoObra(id, !estado).subscribe((data: any) => {
      console.log(data)

      this.getObras()
      Swal.fire({
        icon: 'success',
        title: 'Se ha cambiado el estado de la Obra',
        timer: 2000,
        showConfirmButton: false
      })
    })
  }

  detalles(id: string) {
    this.obraService.getObra(id).pipe(
      switchMap((obra: any) => {
        this.obra = obra;
        return this.getObraWithUsers(obra);
      })
    ).subscribe(() => {
      Swal.fire({
        title: "Nombre Obra: " + this.obra.nombre,
        html: `<hr>
              <p><b>Tipo de Obra:</b> ${this.obra.tipoObraId}</p> <hr>
              <p><b>Ubicación:</b> ${this.obra.ubicacion}</p> <hr>
              <p><b>Nombre del Director:</b> ${this.obra.directorNombre}</p> <hr>
              <p><b>Nombre de los Trabajadores:</b> ${this.obra.usuariosNombres.join(', ')}</p> <hr>`,
        icon: "info"
      });
    });
  }




  editarUsuario(id: string) {

    this.router.navigate(['/dashboard/obraDetail', id]);

  }
}
