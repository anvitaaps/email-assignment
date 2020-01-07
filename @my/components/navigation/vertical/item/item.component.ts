import { Component, HostBinding, Input } from '@angular/core';

import { myNavigationItem } from '@my/types';
import { IndexeddbService } from 'app/main/indexeddb.service';

@Component({
    selector   : 'my-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class myNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: myNavigationItem;
    unreadCount;

    /**
     * Constructor
     */
    constructor(private indexdbService: IndexeddbService)
    {
        this.indexdbService.currentUnreadCount.subscribe(status => this.unreadCount = status);
    }
}
