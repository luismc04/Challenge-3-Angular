import { Component, inject } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { Post } from '../../interfaces/posts-response.interface';

@Component({
  selector: 'app-cards-posts',
  templateUrl: './cards-posts.component.html',
  styleUrl: './cards-posts.component.css'
})
export class CardsPostsComponent {

  public userService = inject(UsersServiceService)
  public posts : Post[] = []
  ngAfterContentChecked(): void {
      this.posts= this.userService.postsGuards
      this.posts =this.userService.posts

      if(localStorage.getItem('posts')){
        this.posts = JSON.parse(localStorage.getItem('posts')!)
      }
      if(this.posts.length <1){
        localStorage.removeItem('posts')
      }
  }
}
