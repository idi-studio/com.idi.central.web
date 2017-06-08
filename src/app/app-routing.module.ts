import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: LayoutComponent }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}