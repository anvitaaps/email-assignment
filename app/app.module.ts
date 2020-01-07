import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { myModule } from '@my/my.module';
import { mySharedModule } from '@my/shared.module';
import { myProgressBarModule, mySidebarModule, myThemeOptionsModule } from '@my/components';

import { myConfig } from 'app/my-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LoginModule } from './login/login.module';
import { MailModule } from './main/mail/mail.module';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'login'
    },
    {
        path      : 'dashboard',
        redirectTo: 'mail'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // my modules
        myModule.forRoot(myConfig),
        myProgressBarModule,
        mySharedModule,
        mySidebarModule,
        myThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        LoginModule,
        MailModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
