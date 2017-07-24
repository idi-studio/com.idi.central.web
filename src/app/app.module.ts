//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Module
import { AppRoutingModule } from './app-routing.module';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/pages/lock-screen/lock-screen.component';
import { MainComponent } from './components/pages/main/main.component';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/shared/sidebar-right/sidebar-right.component';
import { FootbarComponent } from './components/shared/footbar/footbar.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleListComponent } from './components/roles/role-list.component';
import { UserListComponent } from './components/users/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, LoginComponent, ForgotPasswordComponent, LockScreenComponent,
    TopbarComponent, SidebarComponent, SidebarRightComponent, FootbarComponent, PageHeaderComponent,
    DashboardComponent, RoleListComponent, UserListComponent
  ],
  exports: [],//declarations 的子集，可用于其它模块的组件模板。
  imports: [BrowserModule, FormsModule, AppRoutingModule],//本模块声明的组件模板需要的类所在的其它模块
  providers: [],// 服务的创建者，并加入到全局服务列表中，可用于应用任何部分
  bootstrap: [AppComponent]//指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
})
export class AppModule { }
