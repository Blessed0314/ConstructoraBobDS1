import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TareaService } from '../../../services/tarea.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  id: string = '';

  nombreUsuarios: string[] = [];

  tarea: { usuarios: string[] } = { usuarios: [] };

  constructor(private usuarioService: UsuarioService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private tareaService: TareaService
            ) { 

                this.activatedRoute.params.subscribe(params => {
                  this.id = params['id'];
                });

                this.tareaService.traerTarea(this.id).subscribe(
                  data => {
                    this.tarea = data;
                    console.log(this.tarea)
                  },
                  error => {
                    console.log(error);
                  }
                );

            

                console.log("nombre " +this.nombreUsuarios);
               
  }


}
