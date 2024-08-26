import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { AuthGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoggedComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'politicians',
                loadComponent: () => import('./pages/logged/politicians/politicians.component').then((c) => c.PoliticiansComponent)
            },
            {
                path: 'parties',
                loadComponent: () => import('./pages/logged/parties/parties.component').then((c) => c.PartiesComponent)
            },
            {
                path: 'parties/create-party',
                loadComponent: () => import('./pages/logged/parties/create-party/create-party.component').then((c) => c.CreatePartyComponent)
            },
            {
                path: 'approve-politician',
                loadComponent: () => import('./pages/logged/approve-politician/approve-politician.component').then((c) => c.ApprovePoliticianComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];