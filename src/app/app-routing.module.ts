import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleListComponent } from './components/roles/role-list.component';

const routes: Route[] = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin/role', component: RoleListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}