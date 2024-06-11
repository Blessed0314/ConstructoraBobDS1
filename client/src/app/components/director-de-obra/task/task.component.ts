import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @ViewChild('registroForm') registroForm!: NgForm;

  listaTrabajadores: any[] = []
  capataces: any[] = []
  usuariosSeleccionados: any[] = [];
  tipoDeTarea: String[] = [
    'Blanca',
    'Negra'
  ]

  datos: any = {
    capatazId: "Selecciona el Capataz",
    tipoDeTarea: "Selecciona el tipo de tarea",
    fecha: "",
    hora: "",
    descripcion: "",
    trabajadores: []

  }

  id: String = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
            private usuarioService: UsuarioService) {
   
  {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    }); 
    console.log(this.id);
    this.getTrabajadores();
    this.getCapataces();
 
  }

  }

  getTrabajadores() {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.listaTrabajadores = data.filter((user:any) => 
       user.tipoUsuarioId == 'Peón' ||
        user.tipoUsuarioId == 'Ayudante de albañil' ).map((user:any) => ({ usuarioId: user.usuarioId, nombreApellido: `${user.nombre} ${user.apellido}` }));
    });
  }

  getCapataces() {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
    this.capataces = data.filter((user:any) => user.tipoUsuarioId == 'Capataz de Obra')
  });
}

}


