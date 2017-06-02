import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
export const routes: Routes = [ // Routes类型的数组
  {
    path      : 'index',
    component : AppComponent
  },{
    path      : '',
    redirectTo: 'index',
    pathMatch : 'full'
  }
];