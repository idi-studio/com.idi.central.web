//Angular
import { NgModule, Type } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Module
import { AppRoutingModule, CentralComponents } from './app.routing.module';
import { SharedModule } from './app.shared.module';

//Common
import { AppComponent } from './app.component';

//Services
import { TokenService, RoleService, UserService } from './services';

export const CentralServices: any[] = [
  TokenService, RoleService, UserService
];

@NgModule({
  declarations: [AppComponent, CentralComponents],
  exports: [],//declarations 的子集，可用于其它模块的组件模板。
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, SharedModule, HttpModule],//本模块声明的组件模板需要的类所在的其它模块
  providers: [CentralServices],// 服务的创建者，并加入到全局服务列表中，可用于应用任何部分
  bootstrap: [AppComponent]//指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
})
export class AppModule { }
