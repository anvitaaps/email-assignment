import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IndexeddbService } from 'app/main/indexeddb.service';

@Component({
    selector     : 'app-compose-mail',
    templateUrl  : './compose-mail.component.html',
    styleUrls    : ['./compose-mail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ComposeMailComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<ComposeMailComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private indexDB: IndexeddbService
    )
    {
        this.indexDB.updateMail(_data);
        this.indexDB.checkMails();
        // Set the defaults
        this.composeForm = this.createComposeForm();
        if (this._data) {
            this.composeForm.patchValue({
                from   : _data.from, 
                to     : _data.to,
                cc     : _data.cc,
                subject: _data.subject,
                message: _data.message
                // formControlName2: myValue2 (can be omitted)
              });
            this.composeForm.controls['to'].disable();
            this.composeForm.controls['cc'].disable();
            this.composeForm.controls['subject'].disable();
            this.composeForm.controls['message'].disable();
        }
        this.showExtraToFields = false;
        console.log('data: ', _data)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        console.log(localStorage.getItem('current_user'))
        return new FormGroup({
            from   : new FormControl({
                value   : localStorage.getItem('current_user'),
                disabled: true
            }),
            to     : new FormControl(''),
            cc     : new FormControl(''),
            subject: new FormControl(''),
            message: new FormControl(''),
            read    : new FormControl('false'),
            time:   new FormControl(new Date())
        });

    }

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }
}
