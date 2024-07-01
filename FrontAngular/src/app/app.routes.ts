import { Routes } from '@angular/router';
import path from 'path';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginPagesComponent } from './pages/client/login-pages/login-pages.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { RegisterPagesComponent } from './pages/client/register-pages/register-pages.component';

const titleGlobal = 'Trueques |';
export const routes: Routes = [
    {
        path: '', component: ClientComponent,
        title: `${titleGlobal} Cliente`,
        children: [
            {path: '', component: HomePageComponent, pathMatch: 'full', data: { animation: 'HomePage' }},
            {path: 'login', component: LoginPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Login` },
            {path: 'register', component: RegisterPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Register`}
        ]
    },
    {
        path: 'dashboard', component: AdminComponent,
        title: `${titleGlobal} Dashboard`,
        children: [
            { path: '', component: AdminComponent, pathMatch: 'full' },
        ]
    },
    {
        path: '**', component: NotFound404Component,
        title: `${titleGlobal} 404`,
    }
];
