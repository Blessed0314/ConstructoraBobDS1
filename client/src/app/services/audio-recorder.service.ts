import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private recorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordedAudio: Blob | null = null;

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

  uploadAudioToFirebase() {
    const recordedAudio = this.getRecordedAudio();
    if (recordedAudio) {
      const audioRef = this.storage.ref(`audios/${Date.now()}.mp3`);
      audioRef.put(recordedAudio)
        .then((res: any) => console.log('Audio cargado:', res))
        .catch((error: any) => console.error('Error al cargar audio:', error));
    }
  }
}
