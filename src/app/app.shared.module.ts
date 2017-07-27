import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule,
} from '@covalent/core';
import {
    MdButtonModule, MdCardModule, MdIconModule,
    MdListModule, MdMenuModule, MdTooltipModule,
    MdSlideToggleModule, MdInputModule, MdCheckboxModule,
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule,
} from '@angular/material';
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormsMaterialUIModule } from "@ng2-dynamic-forms/ui-material";

// import { NgxChartsModule, } from '@swimlane/ngx-charts';
const DYNAMIC_FORMS_MODULES: any[] = [
    DynamicFormsCoreModule, DynamicFormsMaterialUIModule
];

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
    MdToolbarModule, MdSnackBarModule, MdSidenavModule,
    MdTabsModule, MdSelectModule,
];

const COVALENT_MODULES: any[] = [
    CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
    CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
    CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
    CovalentCommonModule, CovalentDialogsModule,
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
        DYNAMIC_FORMS_MODULES
    ],
    declarations: [

    ],
    exports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        // CHART_MODULES,
        FLEX_LAYOUT_MODULES,
        DYNAMIC_FORMS_MODULES
    ]
})
export class SharedModule { }