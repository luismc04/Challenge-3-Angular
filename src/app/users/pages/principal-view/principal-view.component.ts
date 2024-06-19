import { AfterContentChecked, Component, inject, OnInit } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/profile-response.interface';
import { Post } from '../../interfaces/posts-response.interface';
import { Comments } from '../../interfaces/comments-response.interface';

@Component({
  selector: 'app-principal-view',
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent implements OnInit, AfterContentChecked {

  private usersService = inject(UsersServiceService);

  public anyQuery : string = ''

  public users    : User[] = [];
  public posts    : Post[] = [];
  public comments : Comments[] =[];

  public topThreeUsers :User[] = [];
  public topThreePosts : Post[]=[];
  public topUsersMoreReviews :User[] = [];

  public postsFiltering :Post[][] = [];
  public postsFiltering2 :number[] = [];

  public commnetsFiltering :Comments[][] = [];
  public commnetsFiltering2 :string[] = [];

  ngOnInit(): void {


    if(this.users.length < 1){
      this.usersService.getAllUsers();
      this.usersService.getAllUsersPost();
      this.usersService.getAllComments();
    }
    if(localStorage.getItem('user')){
      this.users = JSON.parse(localStorage.getItem('user')!)
    }
    if(localStorage.getItem('posts')){
      this.posts = JSON.parse(localStorage.getItem('posts')!)
    }
  }

  ngAfterContentChecked(){
    this.users =  this.usersService.users;
    this.posts = this.usersService.posts;
    this.comments = this.usersService.comments;
    this.anyQuery = this.usersService.request

    if(this.users.length > 0 && this.posts.length > 0 && this.comments.length > 0 && this.anyQuery ==''){
      this.topUsers();
      this.topPosts();
      this.topUserReviews();
    }
  }

  topUsers(){
    this.postsFiltering = []
    this.topThreeUsers = []
    this.users.forEach( res =>{
      this.postsFiltering.push(this.getPostsByUserId(Number(res.id)))
    })
    this.postsFiltering = this.postsFiltering.sort().reverse().splice(0,3)
    this.postsFiltering2 = this.postsFiltering.map( res => res[0].userId)
    this.postsFiltering2.forEach( res => {this.topThreeUsers.push(this.getUserById(String(res)))})
  }

  topPosts(){
    this.commnetsFiltering = []
    this.topThreePosts = []
    this.users.forEach( res =>{
      this.commnetsFiltering.push(this.getComentsByPostId(Number(res.id)))
    })
    this.commnetsFiltering = this.commnetsFiltering.sort().reverse().splice(0,3)
    this.commnetsFiltering2 = this.commnetsFiltering.map( res => res[0].id)
    this.postsFiltering2.forEach( res => {this.topThreePosts.push(this.getPostById(String(res)))})

  }

  topUserReviews(){
    this.commnetsFiltering = []
    this.topUsersMoreReviews = []
    this.users.forEach( res =>{
      this.commnetsFiltering.push(this.getEmails((res.email)))
    })
    this.commnetsFiltering = this.commnetsFiltering.sort().reverse().splice(0,3)
    this.commnetsFiltering2 = this.commnetsFiltering.map( res => res[0].email)
    this.commnetsFiltering2.forEach( res => {this.topUsersMoreReviews.push(this.getUsersByEmail(res))})

  }

  //Get elements by theirs id
  getUserById(id : string):User{
    return this.users.find(res => res.id === id)!

  }
  getPostById(id : string):Post{
    return this.posts.find(res => res.id === id)!
  }
  getUsersByEmail(email : string){
    return this.users.find(res => res.email === email)!
  }

  //Others getters
  getPostsByUserId(id : number): Post[]{
    return this.posts.filter(res => res.userId === id)
  }


  getComentsByPostId(id : number): Comments[]{
    return this.comments.filter(res => res.postId === id)
  }
  getEmails(email : string){
    return this.comments.filter(res => res.email === email)
  }

}
