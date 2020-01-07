import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { mySidebarModule } from '@my/components';
import { mySharedModule } from '@my/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';

@NgModule({
    declarations: [
        VerticalLayout1Component
    ],
    imports     : [
        RouterModule,

        mySharedModule,
        mySidebarModule,

        ContentModule,
        NavbarModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayout1Component
    ]
})
export class VerticalLayout1Module
{
}
