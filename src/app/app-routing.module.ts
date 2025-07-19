import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePortfolioComponent } from './code-portfolio/code-portfolio.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

// const routes: Routes = [];
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'coded-portfolio', component: CodePortfolioComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
