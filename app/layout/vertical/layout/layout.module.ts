import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { mySidebarModule } from '@my/components';
import { mySharedModule } from '@my/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { VerticalLayoutComponent } from './layout.component';

@NgModule({
    declarations: [
        VerticalLayoutComponent
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
        VerticalLayoutComponent
    ]
})
export class VerticalLayoutModule
{
}
