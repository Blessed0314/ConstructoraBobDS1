import { Component } from '@angular/core';
import { TareaService } from '../../../services/tarea.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent {
  tareas: any[] = [];
  tareaId: any[] = [];
  usuario: any = {};
  obraId: string = '';
  datos: any = {
    fecha: "",
    hora: "",
    descripcion: "",
    tipoTareaId: "",
    fecha_estimada: "",
    fecha_asignacion: "",
  }

  loading = false;

  constructor(
    public tareaService: TareaService,
    public route: ActivatedRoute,
    public usuarioService: UsuarioService,
    private router: Router
  ){
    this.route.params.subscribe(params => {
      this.obraId = params['id'];
    });

    forkJoin({
      tareas: this.tareaService.traerTareas(this.obraId),
      tareaId: this.tareaService.traerTareasId()
    }).subscribe(({ tareas, tareaId }) => {
      this.tareas = tareas;
      this.tareaId = tareaId;
      this.actualizarNombreTareas();
      this.setNombreUsuario();
    }, error => {
      console.error('Error fetching tasks:', error);
    });
  }

  actualizarNombreTareas() {
    console.log("actualizar")
    this.tareas = this.tareas.map(tarea => {
      const tareaEncontrada = this.tareaId.find(tipoTarea => tipoTarea.tipoTareaId === tarea.tipoTareaId);
      if (tareaEncontrada) {
        console.log(tareaEncontrada)
        tarea.nombreDeTarea = tareaEncontrada.nombre;
      }else{
        console.log("no se encontro")
      }
      return tarea;
    });
  }

  getNombreDeCapataz(id: string) {
    this.usuarioService.getUsuarioById(id).subscribe(usuario => {
        return usuario.nombre
        console.log(usuario.nombre)
    });

  }

  async setNombreUsuario() {
    this.tareas = await Promise.all(this.tareas.map(async tarea => {
        const capatazNombre = await this.usuarioService.getUsuarioById(tarea.capatazId).toPromise();
        return { ...tarea, capatazNombre: capatazNombre.nombre };
    }));
  }

  detalles(id: string) {
    this.router.navigate(['/dashboard/taskDetail', id]);
  }
  crearAvance(id: string) {
    this.router.navigate(['/dashboard/avances', id]);
  }
}
