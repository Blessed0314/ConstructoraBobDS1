import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent {

  @ViewChild('registroForm') registroForm!: NgForm;



  nombresDirectores: any[] = []

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
    nombreDirector : "Selecciona el Director de la Obra",
    tipoDeObra: "Selecciona el Tipo de Obra",
  }


  constructor(private usuarioService: UsuarioService) {
    this.getGerentes();
  }


  getGerentes() {
      this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.nombresDirectores = data.filter((user:any) => user.tipoUsuarioId == 'Gerente').map((user:any) => `${user.nombre} ${user.apellido}` )
      console.log(this.nombresDirectores);
    });
  }

}
