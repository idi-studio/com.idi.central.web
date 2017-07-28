import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { LoginComponent } from './components/pages/login/login.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/pages/lock-screen/lock-screen.component';
import { MainComponent } from './components/pages/main/main.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RoleListComponent } from './components/pages/role-list/role-list.component';
import { UserListComponent } from './components/pages/user-list/user-list.component';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/shared/sidebar-right/sidebar-right.component';
import { FootbarComponent } from './components/shared/footbar/footbar.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

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
            { path: 'user/list', component: UserListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

export const CentralComponents: any[] = [
    MainComponent, TopbarComponent, SidebarComponent, SidebarRightComponent, FootbarComponent, PageHeaderComponent,
    DashboardComponent,
    LoginComponent, LogoutComponent, ForgotPasswordComponent, LockScreenComponent,
    RoleListComponent, UserListComponent
];