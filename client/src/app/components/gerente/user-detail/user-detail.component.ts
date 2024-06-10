import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @ViewChild('registroForm') registroForm!: NgForm;
  @Output() userUpdated = new EventEmitter<any>();

  tipoUsuario: any[] = [];
  tipoIdentidad: any[] = [];
  files: File[] = [];
  isLoading = false;

  datos: any = {
    tipoUsuario : "Selecciona el tipo de usuario"
  }

  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService ,
              private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.usuarioService.getUsuario(params['id']).subscribe(
        data => {
          this.datos = data;
          console.log(this.datos)
        },
        error => {
          console.log(error);
        }
      );
    });

    this.usuarioService.getTipoUsuario().subscribe((data: any) => {
      this.tipoUsuario = data;
    });

    this.usuarioService.getTipoIdentidad().subscribe((data: any) => {
      this.tipoIdentidad = data;
    });
  }

  async registrarUsuario() {
    this.isLoading = true;
    this.usuarioService.actualizarUsuario(this.datos.usuarioId, this.datos).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Usuario: '+ data.username + ' ha sido actualizado',
          text: 'Se ha actualizado el usuario correctamente',
          icon: 'success',
          showConfirmButton:false,
          timer: 2000
        });
        let usuarioId = this.datos.usuarioId; // Almacena el usuarioId aquí
        this.datos = {};
        this.registroForm.resetForm();
        this.isLoading = false;
        this.usuarioService.getUsuario(usuarioId).subscribe( // Usa el usuarioId aquí
        data => {
          this.datos = data;
          console.log(this.datos)
        },
        error => {
          console.log(error);
        }
      );

      },
      error: (error: any) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar el usuario',
          icon: 'error',
          showConfirmButton:false,
          timer: 2000
        });
        this.isLoading = false;
      }
    });
  }

  onSelect(event:any) {
    const images = event.addedFiles.filter((file:any) => this.isFileImage(file));
    this.files.push(...images);
  }

  private isFileImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async upload() {
    if(this.files.length > 0) {
      const file_data = this.files[0];
      const form_data = new FormData();
      form_data.append('file', file_data);
      form_data.append('upload_preset', 'constructora-bob');
      form_data.append('cloud_name', 'dck1pqw4h');
      try {
        const data: any = await this.usuarioService.uploadImg(form_data).toPromise();
        this.datos.foto = data.url;
        this.usuarioService.seturl(data.url);
      } catch (error) {
        console.error(error);
      }
    }
  }

  validarNombre() {
    console.log(this.datos);
  }
}
