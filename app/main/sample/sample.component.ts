import { Component } from '@angular/core';

import { myTranslationLoaderService } from '@my/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    /**
     * Constructor
     *
     * @param {myTranslationLoaderService} _myTranslationLoaderService
     */
    constructor(
        private _myTranslationLoaderService: myTranslationLoaderService
    )
    {
        this._myTranslationLoaderService.loadTranslations(english, turkish);
    }
}
