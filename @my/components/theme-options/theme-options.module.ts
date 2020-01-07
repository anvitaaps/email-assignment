import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { myDirectivesModule } from '@my/directives/directives';
import { mySidebarModule } from '@my/components/sidebar/sidebar.module';

import { myThemeOptionsComponent } from '@my/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        myThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        myDirectivesModule,
        mySidebarModule
    ],
    exports     : [
        myThemeOptionsComponent
    ]
})
export class myThemeOptionsModule
{
}
