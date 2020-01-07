import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { myNavigationComponent } from './navigation.component';
import { myNavVerticalItemComponent } from './vertical/item/item.component';
import { myNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { myNavVerticalGroupComponent } from './vertical/group/group.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        myNavigationComponent
    ],
    declarations: [
        myNavigationComponent,
        myNavVerticalGroupComponent,
        myNavVerticalItemComponent,
        myNavVerticalCollapsableComponent
    ]
})
export class myNavigationModule
{
}
