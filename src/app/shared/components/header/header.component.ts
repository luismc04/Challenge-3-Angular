import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../../users/services/users-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private debounceTimer?:NodeJS.Timeout;
  private userService = inject(UsersServiceService)

  search(query: string){
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.userService.getAllUsers()
    this.userService.getAllUsersPost()
    this.debounceTimer = setTimeout(()=> {

      // this.cardService(name)
      // this.cardService.findCardByName(name)
      this.userService.find(query);

    }, 350)
  }
}
