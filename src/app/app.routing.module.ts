import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

//Components
import { LoginComponent } from './components/common/login/login.component';
import { LogoutComponent } from './components/common/logout/logout.component';
import { ForgotPasswordComponent } from './components/common/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/common/lock-screen/lock-screen.component';
import { MainComponent } from './components/common/main/main.component';

import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/shared/sidebar-right/sidebar-right.component';
import { FootbarComponent } from './components/shared/footbar/footbar.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RoleListComponent } from './components/administration/role-list/role-list.component';
import { UserListComponent } from './components/administration/user-list/user-list.component';

import { ProductListComponent } from './components/retailing/product-list/product-list.component';
import { ProductComponent } from './components/retailing/product/product.component';
import { ProductImageComponent } from './components/retailing/product-image/product-image.component';
import { ProductPriceComponent } from './components/retailing/product-price/product-price.component';
import { ProductPriceListComponent } from './components/retailing/product-price-list/product-price-list.component';

import { OrderListComponent } from './components/retailing/order-list/order-list.component';
import { OrderComponent } from './components/retailing/order/order.component';

import { CustomerListComponent } from './components/retailing/cust-list/cust-list.component';
import { CustomerComponent } from './components/retailing/cust/cust.component';

import { VoucherComponent } from './components/retailing/voucher/vchr.component';

const routes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'lock-screen', component: LockScreenComponent },
    {
        path: 'central', component: MainComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'role/list', component: RoleListComponent },
            { path: 'user/list', component: UserListComponent },
            { path: 'product/list', component: ProductListComponent },
            { path: 'product/info/:mode', component: ProductComponent },
            { path: 'product/info/:mode/:id', component: ProductComponent },
            { path: 'product/prices/:id', component: ProductPriceListComponent },
            { path: 'product/price/:mode/:id', component: ProductPriceComponent },
            { path: 'product/images/:id', component: ProductImageComponent },
            { path: 'order/list', component: OrderListComponent },
            { path: 'order/:mode/:id', component: OrderComponent },
            { path: 'cust/list', component: CustomerListComponent },
            { path: 'cust/info/:mode', component: CustomerComponent },
            { path: 'cust/info/:mode/:id', component: CustomerComponent },
            { path: 'vchr/info/:mode/:id', component: VoucherComponent },
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
    MainComponent, LoginComponent, LogoutComponent, ForgotPasswordComponent, LockScreenComponent,
    DashboardComponent, RoleListComponent, UserListComponent, ProductListComponent, ProductComponent,
    ProductPriceComponent, ProductPriceListComponent, ProductImageComponent, OrderListComponent,
    OrderComponent, CustomerListComponent, CustomerComponent, VoucherComponent,
];