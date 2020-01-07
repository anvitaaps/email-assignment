import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { mySharedModule } from '@my/shared.module';
import { FormsModule } from '@angular/forms';

const routes = [
  {
      path     : 'login',
      component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    mySharedModule,
    MatSnackBarModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
