import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { myConfigService } from '@my/services/config.service';
import { myNavigationService } from '@my/components/navigation/navigation.service';
import { mySidebarService } from '@my/components/sidebar/sidebar.service';
import { mySplashScreenService } from '@my/services/splash-screen.service';
import { myTranslationLoaderService } from '@my/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { IndexeddbService } from './main/indexeddb.service';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    myConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {myConfigService} _myConfigService
     * @param {myNavigationService} _myNavigationService
     * @param {mySidebarService} _mySidebarService
     * @param {mySplashScreenService} _mySplashScreenService
     * @param {myTranslationLoaderService} _myTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _myConfigService: myConfigService,
        private _myNavigationService: myNavigationService,
        private _mySidebarService: mySidebarService,
        private _mySplashScreenService: mySplashScreenService,
        private _myTranslationLoaderService: myTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private indexDB: IndexeddbService
    )
    {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._myNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._myNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._myTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

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
        this.indexDB.testService();
        window.setTimeout(() => {
            this.indexDB.addEntry('users', {email: 'anvita@gmail.com', password: '123'});
            this.indexDB.addEntry('users', {email: 'user@gmail.com', password: '123'})
  
          }, 500)
        // Subscribe to config changes
        this._myConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.myConfig = config;

                if ( this.myConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._mySidebarService.getSidebar(key).toggleOpen();
    }
}
