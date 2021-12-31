import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { FormComponent } from './component/form/form.component';
import { RegisterNewUserComponent } from './component/register-new-user/register-new-user.component';
import { HeaderComponent } from './component/header/header.component';
import { ApiService } from './services/api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DataService } from './services/data.service';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';
import { ProfileComponent } from './component/profile/profile.component';
import {HeaderInterceptor} from './interceptors/headerInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterNewUserComponent,
    HeaderComponent,
    FormComponent,
    AllPatientsListComponent,
    ViewPatientComponent,
    AllRequestedAppointmentsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService, 
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
