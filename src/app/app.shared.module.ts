import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentChipsModule,
    CovalentFileModule
} from '@covalent/core';
import {
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule, MdRadioModule,
    MdTabsModule, MdSelectModule, MdChipsModule, MdDatepickerModule, MdNativeDateModule,
} from '@angular/material';

// import { NgxChartsModule, } from '@swimlane/ngx-charts';

const FLEX_LAYOUT_MODULES: any[] = [
    FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
    FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule, MdRadioModule,
    MdTabsModule, MdSelectModule, MdChipsModule, MdDatepickerModule, MdNativeDateModule
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule, CovalentFileModule,
    CovalentCommonModule, CovalentDialogsModule, CovalentChipsModule,
];

// const CHART_MODULES: any[] = [
//   NgxChartsModule,
// ];

@NgModule({
    imports: [
        CommonModule,
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        // CHART_MODULES,
        FLEX_LAYOUT_MODULES,
    ],
    declarations: [],
    providers: [],
    exports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        // CHART_MODULES,
        FLEX_LAYOUT_MODULES,
    ]
})
export class SharedModule { }