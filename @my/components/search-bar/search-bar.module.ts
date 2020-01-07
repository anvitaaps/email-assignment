import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { mySearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        mySearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        mySearchBarComponent
    ]
})
export class mySearchBarModule
{
}
