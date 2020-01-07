import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { myConfigService } from '@my/services/config.service';
import { myNavigationService } from '@my/components/navigation/navigation.service';
import { myPerfectScrollbarDirective } from '@my/directives/my-perfect-scrollbar/my-perfect-scrollbar.directive';
import { mySidebarService } from '@my/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy
{
    myConfig: any;
    myPerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _myPerfectScrollbar: myPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {myConfigService} _myConfigService
     * @param {myNavigationService} _myNavigationService
     * @param {mySidebarService} _mySidebarService
     * @param {Router} _router
     */
    constructor(
        private _myConfigService: myConfigService,
        private _myNavigationService: myNavigationService,
        private _mySidebarService: mySidebarService,
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(myPerfectScrollbarDirective)
    set directive(theDirective: myPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._myPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._myNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.myPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._myPerfectScrollbar.update();
                }, 310);
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if ( activeNavItem )
                        {
                            const activeItemOffsetTop       = activeNavItem.offsetTop,
                                  activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

                            this._myPerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._mySidebarService.getSidebar('navbar') )
                    {
                        this._mySidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Subscribe to the config changes
        this._myConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.myConfig = config;
            });

        // Get current navigation
        this._myNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._myNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.myPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.myPerfectScrollbarUpdateTimeout);
        }

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._mySidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._mySidebarService.getSidebar('navbar').toggleFold();
    }
}
