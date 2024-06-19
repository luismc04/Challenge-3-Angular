import { AfterContentChecked, Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/profile-response.interface';

@Component({
  selector: 'app-cards-users',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsUsersComponent implements AfterContentChecked {


  private userService = inject(UsersServiceService)
  public users : User[] = []

  ngAfterContentChecked(): void {
    this.users = this.userService.usersGuards
    this.users =this.userService.users

    if(localStorage.getItem('user')){
      this.users = JSON.parse(localStorage.getItem('user')!)
    }

    if(this.users.length <1){
      localStorage.removeItem('user')
    }



  }
}
