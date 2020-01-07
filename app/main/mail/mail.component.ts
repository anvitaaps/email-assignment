import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ComposeMailComponent } from './compose-mail/compose-mail.component';
import { IndexeddbService } from '../indexeddb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  hasSelectedMails: boolean;
  folders = [
    {
        'id'    : 0,
        'handle': 'inbox',
        'title' : 'Inbox',
        'icon'  : 'inbox'
    },
    {
        'id'    : 1,
        'handle': 'sent',
        'title' : 'Sent',
        'icon'  : 'send'
    },
    {
        'id'    : 2,
        'handle': 'drafts',
        'title' : 'Drafts',
        'icon'  : 'email_open'
    },
    {
        'id'    : 3,
        'handle': 'spam',
        'title' : 'Spam',
        'icon'  : 'error'
    },
    {
        'id'    : 4,
        'handle': 'trash',
        'title' : 'Trash',
        'icon'  : 'delete'
    }
  ];
  mails:any;
  dialogRef: any;

  constructor(public _matDialog: MatDialog,
              private indexDB: IndexeddbService,
              private matsnackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
      console.log(window.location.href);
      let type:any = (window.location.href).split('/');
      console.log(type[type.length-1])
    this.indexDB.testService();
    window.setTimeout(() => {
        if (type[type.length-1] == 'inbox') {
            this.indexDB.checkMails();
            this.indexDB.currentInbox.subscribe(mail => this.mails = mail);
        }
        else if (type[type.length-1] == 'sent') {
            console.log('here')
            this.indexDB.sentMails();
            this.indexDB.currentSent.subscribe(mail => this.mails = mail);
        }
        
        console.log(this.mails)
    }, 500)
  }

  composeDialog(): void
    {
        this.dialogRef = this._matDialog.open(ComposeMailComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Mail', formData.getRawValue());
                        this.indexDB.testService();
                        window.setTimeout(() => {
                            this.indexDB.addEntry('mails', formData.getRawValue());
                            this.indexDB.sentMails();
                            this.matsnackbar.open('Mail sent', '', {
                                duration: 2000
                              });
                        }, 500)
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            });
    }

    readMail(mail): void
    {
        this.dialogRef = this._matDialog.open(ComposeMailComponent, {
            panelClass: 'mail-compose-dialog',
            data: mail
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                window.setTimeout(() => {
                    this.indexDB.updateMail(mail);
                    this.indexDB.checkMails();
                    window.setTimeout(() => {
                        this.indexDB.currentInbox.subscribe(mail => {
                            console.log(mail);
                            this.mails = mail;
                            this.indexDB.getUnreadCount(this.mails)
                        })
                            
                    },1000)
                    
                    // this.indexDB.getUnreadCount();
                    // this.mails = JSON.parse(localStorage.getItem("current_inbox") || "[]");
                }, 500)
            });
    }

    goToFolder(folder) {
        console.log(folder)
        folder = folder.toLowerCase(); 
        this.router.navigateByUrl('/mail/'+folder);
    }

    selectMails() {
        this.mails.map( (mail) => {
            mail.selected = true;
        })
    }

    toggleSelectAll() {
        console.log(this.mails);
        this.hasSelectedMails = true;
        this.mails.map( (mail) => {
            mail.selected = true;
        })
        // this.indexDB.UpdateInbox(this.mails)
    }

    deleteMails() {
        if (this.indexDB.selectedMails.length == 0) {
            this.matsnackbar.open('No mail selected!', '', {
                duration: 2000
            });
            return;
        }
        console.log(this.indexDB.selectedMails);
        // this.indexDB.deleteMail();
        // setTimeout(() => {
        //     this.indexDB.getUnreadCount(this.mails)
        // },500);
    }

}
