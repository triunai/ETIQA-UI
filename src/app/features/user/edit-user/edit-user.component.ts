import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SkillsetService } from '../../skillset/services/skillset.service';
import { Subscription, Observable } from 'rxjs';
import { Skillset } from '../../skillset/models/skillset.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  RouteSubscription?: Subscription; // <-- For routing purposes only
  getUserSubscription?: Subscription; // <-- For subs purposes only
  skillset$?: Observable<Skillset[]>;
  getUser?: Subscription;
  deleteUser?: Subscription;
  // image select subscription

  id: string | null = null; // Declared here for routing logic
  model?: User;
  modelContent: string = '';
  selectedSkillsets?: string[];
  imageSelectorVisibilityFlag = false;
  paramsSubscription?: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private skillsetService: SkillsetService
    // image service goes here
  ){}
  onFormSubmit(){

  }
  getIdFromRoute(){
    this.paramsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');  // <---getting value from route, check your app-routing for the *EXACT* variable
        if(this.id){
          console.log('ID from route:', this.id);  // Add this line in getIdFromRoute method

          this.skillset$ = this.skillsetService.getAllSkillsets(); // to fetch skillsets
          this.getUser = this.userService.getUsersById(this.id).subscribe({
            next: (users) => {
              this.model = users;
              this.selectedSkillsets = users.skillset.map(skillset => skillset.skillsetId)
            },
            error: (err) =>{
              console.error('couldnt get the right id')
            }
          }); //

        }
      },
      error: () =>{
        alert("unable to return id, check route if it has anything");
      }
    });
  }
}
