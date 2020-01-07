import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { mySharedModule } from '@my/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        mySharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
