import { NgModule } from '@angular/core';

import { mySidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        mySidebarComponent
    ],
    exports     : [
        mySidebarComponent
    ]
})
export class mySidebarModule
{
}
