import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { LoginComponent } from './components/common/login/login.component';
import { LogoutComponent } from './components/common/logout/logout.component';
import { ForgotPasswordComponent } from './components/common/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/common/lock-screen/lock-screen.component';
import { MainComponent } from './components/common/main/main.component';

import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/shared/sidebar-right/sidebar-right.component';
import { FootbarComponent } from './components/shared/footbar/footbar.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RoleListComponent } from './components/administration/role-list/role-list.component';
import { UserListComponent } from './components/administration/user-list/user-list.component';

import { ProdListComponent } from './components/retailing/prod-list/prod-list.component';

const routes: Route[] = [
    { path: '', redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'lock-screen', component: LockScreenComponent },
    {
        path: 'central', component: MainComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'role/list', component: RoleListComponent },
            { path: 'user/list', component: UserListComponent },
            { path: 'prod/list', component: ProdListComponent }
        ]
    },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

export const CentralComponents: any[] = [
    TopbarComponent, SidebarComponent, SidebarRightComponent, FootbarComponent, PageHeaderComponent,
    MainComponent, LoginComponent, LogoutComponent, ForgotPasswordComponent, LockScreenComponent,
    DashboardComponent,
    RoleListComponent, UserListComponent,
    ProdListComponent,
];