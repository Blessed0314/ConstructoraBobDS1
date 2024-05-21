import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { ObraService } from '../../../services/obra.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent {

  @ViewChild('registroForm') registroForm!: NgForm;

  isLoading = false;
  Directores: any[] = []

  listaTrabajadores: any[] = []
  usuariosSeleccionados: any[] = [];

  tiposDeObra: string[] =
  [
    'Casa',
    'Condominio',
    'Edificio',
    'Centro Comercial',
    'Plazoleta',
    'Colegio',
    'Universidad'
  ]

  datos: any = {
    directorId : "Selecciona el Director de la Obra",
    tipoObraId: "Selecciona el Tipo de Obra",
    ubicacion: "Univalle",
    usuarios: []
  }


  constructor(private usuarioService: UsuarioService, private obraService: ObraService) {
    this.getDirectores();
    this.getTrabajadores();
  }

  getTrabajadores() {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.listaTrabajadores = data.filter((user:any) => user.tipoUsuarioId == 'Capataz de Obra' ||
       user.tipoUsuarioId == 'Peón' ||
        user.tipoUsuarioId == 'Ayudante de albañil' ).map((user:any) => ({ usuarioId: user.usuarioId, nombreApellido: `${user.nombre} ${user.apellido}` }));
    });
  }


  getDirectores() {
      this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.Directores = data.filter((user:any) => user.tipoUsuarioId == 'Director de Obra')
    });
  }


  async registrarObra() {
    console.log(this.listaTrabajadores);
    console.log(this.datos);
    this.isLoading = true;

    this.obraService.registrarObra(this.datos).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Obra: '+ data.nombre + ' ha sido registrada',
          text: 'Se ha registrado la obra correctamente',
          icon: 'success',
          showConfirmButton:false,
          timer: 2000
        });
        this.datos = {};
        this.registroForm.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);

        let primerError;
        let campo;
        for (const key in error.error) {
          if (error.error.hasOwnProperty(key)) {
            primerError = error.error[key][0];
            campo = key
            break;
          }
        }

        Swal.fire({
          title: primerError,
          text: "Error en " + campo,
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      }
    });

  }

  actualizarUsuarios() {
    this.datos.usuarios = this.usuariosSeleccionados.map(usuario => usuario);
  }

}
