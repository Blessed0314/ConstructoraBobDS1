import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AvancesService } from '../../../services/avances.service';
import { AudioRecorderService } from '../../../services/audio-recorder.service';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrl: './avances.component.css'
})
export class AvancesComponent {


  @ViewChild('registroForm') registroForm!: NgForm;

  isLoading = false;
  files: File[] = [];
  recordedAudioUrl: string | null = null;

  datos: any = {

  }


  constructor(private avancesService:AvancesService, private audioRecorderService: AudioRecorderService) {

  }

  startRecording() {
    this.audioRecorderService.startRecording();
  }

  stopRecording() {
  this.audioRecorderService.stopRecording();
  const recordedAudio = this.audioRecorderService.getRecordedAudio();
  if (recordedAudio) {
    const audioFile = new File([recordedAudio], 'recorded-audio.mp3', { type: 'audio/mpeg' });
    this.recordedAudioUrl = URL.createObjectURL(audioFile);
    this.audioRecorderService.uploadAudioToFirebase();
    this.datos.audios = this.recordedAudioUrl;
  }
}


  async registrarAvance() {
    this.isLoading = true;

    this.avancesService.registrarAvance(this.datos).subscribe({
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



  onSelect(event:any) {
    const images = event.addedFiles.filter((file:any) => this.isFileImage(file));
    this.files.push(...images);
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
        const data: any = await this.avancesService.uploadImg(form_data).toPromise();
        this.datos.fotos = data.url;
        this.avancesService.seturl(data.url);
      } catch (error) {
        console.error(error);
      }
    }
  }

  private isFileImage(file: File): boolean {
    return file.type.startsWith('image/');
  }


}
