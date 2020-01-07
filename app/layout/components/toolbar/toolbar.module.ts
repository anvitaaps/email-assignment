import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatBadgeModule } from '@angular/material';

import { mySearchBarModule } from '@my/components';
import { mySharedModule } from '@my/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatBadgeModule,
        mySharedModule,
        mySearchBarModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
