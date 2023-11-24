import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit,OnDestroy {

  users?: User[]; // This will store the fetched user data

  users$?: Observable<User[]>;
  profileImageUrls: string[] = [];
  private usersSubscription?: Subscription;

  constructor(
    private userService: UserService,
  ){}


  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(){
    this.users$ = this.userService.getAllUsers();

    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users; // Store the user data
        this.profileImageUrls = users.map(user => user.profileImageUrl || 'default_image_path_here'); // Map the image URLs
      },
      (error) => {
        // Handle error
        console.error('Error fetching users:', error);
      }
    );
    this.users$.subscribe(users => {
      this.profileImageUrls = users.map(user => user.profileImageUrl || 'default_image_path_here');
    });

  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
