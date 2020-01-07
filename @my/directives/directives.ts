import { NgModule } from '@angular/core';

import { myIfOnDomDirective } from '@my/directives/my-if-on-dom/my-if-on-dom.directive';
import { myInnerScrollDirective } from '@my/directives/my-inner-scroll/my-inner-scroll.directive';
import { myPerfectScrollbarDirective } from '@my/directives/my-perfect-scrollbar/my-perfect-scrollbar.directive';
import { myMatSidenavHelperDirective, myMatSidenavTogglerDirective } from '@my/directives/my-mat-sidenav/my-mat-sidenav.directive';

@NgModule({
    declarations: [
        myIfOnDomDirective,
        myInnerScrollDirective,
        myMatSidenavHelperDirective,
        myMatSidenavTogglerDirective,
        myPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        myIfOnDomDirective,
        myInnerScrollDirective,
        myMatSidenavHelperDirective,
        myMatSidenavTogglerDirective,
        myPerfectScrollbarDirective
    ]
})
export class myDirectivesModule
{
}
