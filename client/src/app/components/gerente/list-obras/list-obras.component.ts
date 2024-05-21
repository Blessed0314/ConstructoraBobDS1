import { Component } from '@angular/core';
import { ObraService } from '../../../services/obra.service';
import { UsuarioService } from '../../../services/usuario.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-obras',
  templateUrl: './list-obras.component.html',
  styleUrl: './list-obras.component.css'
})
export class ListObrasComponent {

  obras: any[] = [];
  loading: boolean;

  constructor(private userService: UsuarioService ,private obraService: ObraService) {
    this.getObras();
    this.loading = true;
  }

  getObras() {
    this.obraService.getObras().pipe(
      switchMap((data: any) => {
        const requests = data.map((obra: any) =>
          this.getUsuario(obra.directorId).pipe(
            switchMap((director:any) => {
              obra.directorNombre = director.nombre + ' ' + director.apellido;
              return forkJoin(obra.usuarios.map((userId: string) => this.getUsuario(userId)));
            }),
            map((usuarios:any) => {
              obra.usuariosNombres = usuarios.map((usuario:any) => usuario.nombre + ' ' + usuario.apellido);
              return obra;
            })
          )
        );
        return forkJoin(requests);
      })
    ).subscribe((obrasConUsuarios: any) => {
      this.obras = obrasConUsuarios;
      this.loading = false;
    });
  }

  getUsuario(id: string) {
    return this.userService.getUsuario(id);
  }
}
