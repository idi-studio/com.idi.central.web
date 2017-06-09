import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Route[] = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}