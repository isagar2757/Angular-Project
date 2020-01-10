import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { PatientListComponent } from "@app/patient-list/patient-list.component";
import { PatientComponent } from "@app/patient/patient.component";
import { InspireComponent } from "@app/inspire/inspire.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] },
    { path: 'patient/:id', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'inspire', component: InspireComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);