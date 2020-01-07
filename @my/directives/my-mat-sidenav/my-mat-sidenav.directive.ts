import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { myMatchMediaService } from '@my/services/match-media.service';
import { myMatSidenavHelperService } from '@my/directives/my-mat-sidenav/my-mat-sidenav.service';

@Directive({
    selector: '[myMatSidenavHelper]'
})
export class myMatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input('myMatSidenavHelper')
    id: string;

    @Input('mat-is-locked-open')
    matIsLockedOpenBreakpoint: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {myMatchMediaService} _myMatchMediaService
     * @param {myMatSidenavHelperService} _myMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _myMatchMediaService: myMatchMediaService,
        private _myMatSidenavHelperService: myMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _observableMedia: ObservableMedia
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the sidenav to the service
        this._myMatSidenavHelperService.setSidenav(this.id, this._matSidenav);

        if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._myMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[myMatSidenavToggler]'
})
export class myMatSidenavTogglerDirective
{
    @Input('myMatSidenavToggler')
    id;

    /**
     * Constructor
     *
     * @param {myMatSidenavHelperService} _myMatSidenavHelperService
     */
    constructor(
        private _myMatSidenavHelperService: myMatSidenavHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick()
    {
        this._myMatSidenavHelperService.getSidenav(this.id).toggle();
    }
}
