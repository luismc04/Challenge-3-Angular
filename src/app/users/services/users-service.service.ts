import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/profile-response.interface';
import { Post } from '../interfaces/posts-response.interface';
import { Comments } from '../interfaces/comments-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private http = inject(HttpClient)

  public isLoaded : boolean =false
  public user :User[] = [];
  public users  :User[] = [];
  public usersGuards  :User[] = [];

  public posts  : Post[] =[];
  public postsGuards :Post[]=[];

  public comments : Comments[] =[]
  public request : string = '';


  getAllUsers(){
    this.isLoaded = false
    this.http.get<User[]>('http://localhost:3000/profile/')
      .subscribe(res => {
        this.usersGuards = res
        this.users=res
      })


  }
  getAllUsersPost(){
    this.http.get<Post[]>('http://localhost:3000/posts/')
      .subscribe((res) =>{
        this.posts = res
        this.postsGuards = res
      } )
  }
  getAllComments(){
    this.http.get<Comments[]>('http://localhost:3000/comments/')
    .subscribe((res) => this.comments = res )
  }
  find(query : string){
    this.isLoaded = false


    this.request = query;

    if(this.request == '') {
      this.getAllUsers()
      this.getAllUsersPost();
      localStorage.removeItem('posts')
      localStorage.removeItem('user')
      return
    }
    this.getUsersByUserName(query);
     this.getPostByTitle(query);
     console.log('aaa');

    this.isLoaded = true
  }

  getUsersByUserName(query : string){
   this.users = this.users.filter( res => res.username.toLowerCase().startsWith(query.toLowerCase()))
   localStorage.setItem('user', JSON.stringify(this.users))
  }
  getPostByTitle(query : string){
    this.posts = this.posts.filter( res => res.title.toLowerCase().startsWith(query.toLowerCase()))
    localStorage.setItem('posts', JSON.stringify(this.posts))
  }

  getUserById(id :string){
    this.user = this.users.filter(res => res.id == id  )!

  }


}
