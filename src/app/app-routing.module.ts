import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { StaticPageComponent } from './static-page/static-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'layout',
    component: StaticPageComponent,
    data: { pageOverride: 'layout' }
  },
  { path: 'page/:page', component: StaticPageComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
