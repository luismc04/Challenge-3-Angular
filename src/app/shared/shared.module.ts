import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    SideNavComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
