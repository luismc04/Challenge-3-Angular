import { User } from './../../interfaces/profile-response.interface';
import { Component, inject, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../services/users-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, AfterContentChecked{

    private activatedRoute = inject(ActivatedRoute)
    private userService = inject(UsersServiceService)

    public id!:string;
    public users: User[] = [];
    public user: User[] =[];
    ngOnInit(): void {
      this.userService.getAllUsers()
      this.userService.getAllComments()
      this.userService.getAllUsersPost()
      this.id = this.activatedRoute.snapshot.params['id'];

    }

    ngAfterContentChecked(){
      this.userService.getUserById(this.id)!;
      this.user =  this.userService.user


    }


  }

