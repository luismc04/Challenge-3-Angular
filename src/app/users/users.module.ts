import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalViewComponent } from './pages/principal-view/principal-view.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsUsersComponent } from './components/cards/userCards.component';
import { CardsPostsComponent } from './components/cards-posts/cards-posts.component';


@NgModule({
  declarations: [
    PrincipalViewComponent,
    UserDetailComponent,
    CardsUsersComponent,
    CardsPostsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpClientModule,
  ]
})
export class UsersModule { }
