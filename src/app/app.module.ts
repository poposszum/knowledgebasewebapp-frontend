import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AlertComponent } from './alert/alert.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CreatearticleComponent } from './components/createarticle/createarticle.component';
import { ArticleComponent } from './components/article/article.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileComponent } from './components/profile/profile.component';
import { TermsofuseandppComponent } from './components/termsofuseandpp/termsofuseandpp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material';
import { ContenteditableModule } from '@ng-stack/contenteditable';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignUpComponent,
    SignInComponent,
    AlertComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    CreatearticleComponent,
    ArticleComponent,
    ProfileComponent,
    TermsofuseandppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ContenteditableModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
