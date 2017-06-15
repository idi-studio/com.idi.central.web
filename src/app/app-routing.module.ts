import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleListComponent } from './components/roles/role-list.component';
import { UserListComponent } from './components/users/user-list.component';

const routes: Route[] = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'role/list', component: RoleListComponent },
    { path: 'user/list', component: UserListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}