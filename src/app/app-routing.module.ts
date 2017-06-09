import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Route[] = [
    { path: '', component: LayoutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}