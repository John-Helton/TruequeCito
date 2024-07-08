import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginPagesComponent } from './pages/client/login-pages/login-pages.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { RegisterPagesComponent } from './pages/client/register-pages/register-pages.component';
import { ProfilePageComponent } from './pages/client/profile-page/profile-page.component';
import { CreatProductPagesComponent } from './pages/client/creat-product-pages/creat-product-pages.component';
import { ProposeExchangePagesComponent } from './pages/client/propose-exchange-pages/propose-exchange-pages.component';
import { UserProductsComponent } from './pages/client/user-products/user-products.component';
import { EditProductPageComponent } from './pages/client/edit-product-page/edit-product-page.component';
import { AuthGuard } from './guards/auth.guard';

const titleGlobal = 'Trueques |';

export const routes: Routes = [
    {
        path: '', component: ClientComponent,
        title: `${titleGlobal} Cliente`,
        children: [
            { path: '', component: HomePageComponent, pathMatch: 'full', data: { animation: 'HomePage' }},
            { path: 'login', component: LoginPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Login` },
            { path: 'register', component: RegisterPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Register`},
            { path: 'profile', component: ProfilePageComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Perfil`},
            { path: 'profile/products', component: UserProductsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Mis Productos`},
            { path: 'profile/edit-product-page/:id', component: EditProductPageComponent, canActivate: [AuthGuard] },
            { path: 'createProduct', component: CreatProductPagesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Crear Producto`},
            { path: 'propose-exchange/:id', component: ProposeExchangePagesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Postular Intercambio`}
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
