import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePortfolioComponent } from './code-portfolio/code-portfolio.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './models/login/login.component';
import { SignupComponent } from './models/signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'coded-portfolio', component: CodePortfolioComponent, canActivate: [AuthGuard]  },
   { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
