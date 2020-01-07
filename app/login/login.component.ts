import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { myConfigService } from '@my/services/config.service';
import { Router } from '@angular/router';
import { IndexeddbService } from 'app/main/indexeddb.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    constructor(
        private _myConfigService: myConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private indexDB: IndexeddbService,
        private matsnackbar: MatSnackBar
    )
    {
        
        // Configure the layout
        this._myConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void
    {   
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login() {
        this.indexDB.testService();
        window.setTimeout(() => {
            
            this.indexDB.checkUserExists({email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value})
            window.setTimeout(() => { 
                console.log('current user: ', localStorage.getItem('current_user'))
                if(localStorage.getItem('current_user'))  
                    this.router.navigateByUrl('/mail/inbox')
                else  
                    this.matsnackbar.open('User does not exist', '', {
                        duration: 2000
                    });
            },1000)
            

          }, 500)  
    }
}
