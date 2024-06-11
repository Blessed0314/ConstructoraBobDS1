import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/enviroments';

//Modulos
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import {CloudinaryModule} from '@cloudinary/ng';
import { NgSelectModule } from '@ng-select/ng-select';



//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RetCaptchaComponent } from './components/shared/captcha/ret-captcha.component';
import { RegisterComponent } from './components/gerente/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/gerente/users/users.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { UserDetailComponent } from './components/gerente/user-detail/user-detail.component';
import { ObrasComponent } from './components/gerente/obras/obras.component';
import { ListObrasComponent } from './components/gerente/list-obras/list-obras.component';
import { TaskComponent } from './components/director-de-obra/task/task.component';
import { ObraDetailComponent } from './components/gerente/obra-detail/obra-detail.component';
import { AvancesComponent } from './components/director-de-obra/avances/avances.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ListTaskComponent } from './components/director-de-obra/list-task/list-task.component';
import { RecordingComponent } from './components/shared/recording/recording.component';





@NgModule({
  declarations: [
    AvancesComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    RetCaptchaComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    LoadingComponent,
    UserDetailComponent,
    ObrasComponent,
    ListObrasComponent,
    TaskComponent,
    ObraDetailComponent,
    ListTaskComponent,
    RecordingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaV3Module,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    CloudinaryModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule

  ],
  providers: [

    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.key,
    },

    FormsModule,
    NgxDropzoneModule,
    CloudinaryModule,
    provideFirebaseApp(() => initializeApp({"projectId":"proyectods-e74f3","appId":"1:907721758665:web:042afe04849e4ca3543a18","storageBucket":"proyectods-e74f3.appspot.com","apiKey":"AIzaSyBiPCONm9EOAONjMw5ZOv_3x7EKGpBdavA","authDomain":"proyectods-e74f3.firebaseapp.com","messagingSenderId":"907721758665","measurementId":"G-6YXFHW1VKZ"})),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
