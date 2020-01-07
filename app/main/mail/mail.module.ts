import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { mySharedModule } from '@my/shared.module';

import { MailComponent } from './mail.component';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MailListItemComponent } from './mail-list-item/mail-list-item.component';
import { ComposeMailComponent } from './compose-mail/compose-mail.component';

const routes = [
    {
        path     : 'mail/inbox',
        component: MailComponent
    }, 
    {
        path     : 'mail/sent',
        component: MailComponent
    }
];

@NgModule({
    declarations: [
      MailComponent,
      MailListItemComponent,
      ComposeMailComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        TranslateModule,
        MatTooltipModule,

        mySharedModule
    ],
    exports     : [
      MailComponent
    ],
    entryComponents: [
      ComposeMailComponent
  ]
})

export class MailModule
{
}
