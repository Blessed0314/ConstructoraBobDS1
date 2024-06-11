import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private recorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordedAudio: Blob | null = null;
  downloadURL: any;

  constructor(private storage: AngularFireStorage) { }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', event => {
          this.audioChunks.push(event.data);
        });
        this.recorder.start();
      })
      .catch(error => console.error('Error al acceder al micrófono', error));
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
      this.recordedAudio = new Blob(this.audioChunks, { type: 'audio/mpeg' });
      this.audioChunks = [];
    }
  }

  getRecordedAudio(): Blob | null {
    return this.recordedAudio;
  }

  getUrl(){
    return this.downloadURL;
  }

  uploadAudioToFirebase(id: string) {
    const recordedAudio = this.getRecordedAudio();
    if (recordedAudio) {
      const audioRef = this.storage.ref(`audios/${id}.mp3`);
      const uploadTask = audioRef.put(recordedAudio);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          audioRef.getDownloadURL().subscribe(
            (url) => {
              this.downloadURL = url;
            },
            (error) => {
              console.error('Error al obtener URL de descarga:', error);
            }
          );
        })
      ).subscribe();
    }
  }
}
