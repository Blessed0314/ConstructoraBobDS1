import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TareaService } from '../../../services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @ViewChild('registroForm') registroForm!: NgForm;

  isLoading = false;

  idTypoDeTarea: any[] = [];

  listaTrabajadores: any[] = []
  capataces: any[] = []
  usuariosSeleccionados: any[] = [];
  tipoDeTarea: String[] = [
    'Obra blanca',
    'Obra negra'
  ]

  datos: any = {
    capatazId: "Selecciona el Capataz de la Obra",
    tipoDeTarea: "Selecciona el Tipo de Obra",
    fecha: "",
    hora: "",
    descripcion: "",
    usuarios: [],
    obraId:"",
    tipoTareaId: "",
    fecha_estimada: "",
    fecha_asignacion: "",

  }



  id: String = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService,
              private tareaService: TareaService) {
   
  {
    this.route.params.subscribe(params => {
      this.datos.obraId = params['id'];
    }); 
    console.log(this.id);
    this.getTrabajadores();
    this.getCapataces();
    this.tareaService.traerTareasId().subscribe((data: any) => {
      this.idTypoDeTarea= data;
    });
 
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

actualizarUsuarios() {
  this.datos.usuarios = this.usuariosSeleccionados.map(usuario => usuario);
}

actualizaridTarea() {
  const tareaEncontrada = this.idTypoDeTarea.find((tarea: any) => tarea.nombre === this.datos.tipoDeTarea);
  if (tareaEncontrada) {
    this.datos.tipoTareaId= tareaEncontrada.tipoTareaId;
  }
}



// ...

crearTarea() {
  this.actualizaridTarea();
  const fechaActual = new Date();
this.datos.fecha_asignacion = fechaActual.toISOString().slice(0, 10);
  console.log(this.datos)
  this.isLoading = true;
  this.tareaService.registrarTarea(this.datos).subscribe((data: any) => {
    this.isLoading = false;
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Se creó la tarea exitosamente',
    });
  });
}



}
