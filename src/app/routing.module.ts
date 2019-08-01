import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './services/canActivate/auth.guard';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { CreatearticleComponent } from './components/createarticle/createarticle.component';
import { ArticleComponent } from './components/article/article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TermsofuseandppComponent } from './components/termsofuseandpp/termsofuseandpp.component';

const routes: Routes = [
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'createarticle', component: CreatearticleComponent, canActivate: [AuthGuard]},
    { path: 'article', component: ArticleComponent, canActivate: [AuthGuard]},
    { path: 'forgotpassword', component: ForgotpasswordComponent},
    { path: 'changepassword', component: ChangepasswordComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'termsofuseandprivacypolicy', component: TermsofuseandppComponent },
    { path: '', redirectTo: 'signin', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }