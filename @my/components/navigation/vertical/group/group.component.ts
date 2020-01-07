import { Component, HostBinding, Input } from '@angular/core';

import { myNavigationItem } from '@my/types';

@Component({
    selector   : 'my-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class myNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: myNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
