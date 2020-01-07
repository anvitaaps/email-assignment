import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { mySidebarModule } from '@my/components/index';
import { mySharedModule } from '@my/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { VerticalLayout3Component } from 'app/layout/vertical/layout-3/layout-3.component';

@NgModule({
    declarations: [
        VerticalLayout3Component
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
        VerticalLayout3Component
    ]
})
export class VerticalLayout3Module
{
}
