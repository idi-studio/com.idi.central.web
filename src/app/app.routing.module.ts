import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Common
import { LoginComponent } from './components/common/login/login.component';
import { LogoutComponent } from './components/common/logout/logout.component';
import { ForgotPasswordComponent } from './components/common/forgot-password/forgot-password.component';
import { OAuthComponent } from './components/common/oauth/oauth.component';
import { MainComponent } from './components/common/main/main.component';

//Shared
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/shared/sidebar-right/sidebar-right.component';
import { FootbarComponent } from './components/shared/footbar/footbar.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Administration
import { RoleListComponent } from './components/administration/role-list/role-list.component';
import { RolePermissionComponent } from './components/administration/role-permission/role-permission.component';
import { RoleMenuComponent } from './components/administration/role-menu/role-menu.component';
import { UserListComponent } from './components/administration/user-list/user-list.component';
import { UserRoleComponent } from './components/administration/user-role/user-role.component';

//Basicinfo
import { ProductListComponent } from './components/basicinfo/product-list/product-list.component';
import { ProductComponent } from './components/basicinfo/product/product.component';
import { ProductImageComponent } from './components/basicinfo/product-image/product-image.component';
import { ProductPriceComponent } from './components/basicinfo/product-price/product-price.component';
import { ProductPriceListComponent } from './components/basicinfo/product-price-list/product-price-list.component';

//Sales
import { OrderListComponent } from './components/sales/order-list/order-list.component';
import { OrderComponent } from './components/sales/order/order.component';
import { CustomerListComponent } from './components/sales/cust-list/cust-list.component';
import { CustomerComponent } from './components/sales/cust/cust.component';
import { VoucherComponent } from './components/sales/voucher/vchr.component';
import { DeliverComponent } from './components/sales/deliver/deliver.component';

//Inventory
import { StoreListComponent } from './components/inventory/store-list/store-list.component';
import { StoreDetailsComponent } from './components/inventory/store-details/store-details.component';

const routes: Route[] = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'oauth/login', component: OAuthComponent },
    {
        path: 'central', component: MainComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'role/list', component: RoleListComponent },
            { path: 'role/permission/:name', component: RolePermissionComponent },
            { path: 'role/menu/:name', component: RoleMenuComponent },
            { path: 'user/list', component: UserListComponent },
            { path: 'user/role/:username', component: UserRoleComponent },
            { path: 'product/list', component: ProductListComponent },
            { path: 'product/info/:cmd', component: ProductComponent },
            { path: 'product/info/:cmd/:id', component: ProductComponent },
            { path: 'product/prices/:id', component: ProductPriceListComponent },
            { path: 'product/price/:cmd/:id', component: ProductPriceComponent },
            { path: 'product/images/:id', component: ProductImageComponent },
            { path: 'order/list', component: OrderListComponent },
            { path: 'order/:cmd/:id', component: OrderComponent },
            { path: 'deliver/:id', component: DeliverComponent },
            { path: 'cust/list', component: CustomerListComponent },
            { path: 'cust/info/:cmd', component: CustomerComponent },
            { path: 'cust/info/:cmd/:id', component: CustomerComponent },
            { path: 'vchr/:id', component: VoucherComponent },
            { path: 'store/list', component: StoreListComponent },
            { path: 'store/details/:id', component: StoreDetailsComponent },
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
    MainComponent, LoginComponent, LogoutComponent, ForgotPasswordComponent, OAuthComponent,
    DashboardComponent,
    RoleListComponent, RolePermissionComponent, RoleMenuComponent,
    UserListComponent, UserRoleComponent,
    ProductListComponent, ProductComponent, ProductPriceComponent, ProductPriceListComponent, ProductImageComponent,
    OrderListComponent, OrderComponent,
    CustomerListComponent, CustomerComponent,
    VoucherComponent,
    DeliverComponent,
    StoreListComponent, StoreDetailsComponent,
];