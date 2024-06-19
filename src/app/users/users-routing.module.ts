import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalViewComponent } from './pages/principal-view/principal-view.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalViewComponent
  },
  {
    path:'user-detail/:id',
    component: UserDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
