import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SkillsetService } from '../../skillset/services/skillset.service';
import { Subscription, Observable } from 'rxjs';
import { Skillset } from '../../skillset/models/skillset.model';
import { User } from '../models/user.model';
import { UpdateUserModel } from '../models/update-user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit,OnDestroy {

  RouteSubscription?: Subscription; // <-- For routing purposes only
  skillsets$?: Observable<Skillset[]>;
  editUserSubscription?: Subscription;
  getUserSubscription?: Subscription;
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
  ngOnInit(): void {
    this.getIdFromRoute();
  }

  getIdFromRoute(){
    this.RouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (routeInformation) => {
        this.id = routeInformation.get('id');  // <---getting value from route, check your app-routing for the *EXACT* variable
        if(this.id){
          console.log('ID from route:', this.id);  // Add this line in getIdFromRoute method

          this.skillsets$ = this.skillsetService.getAllSkillsets(); // to fetch skillsets
          this.skillsets$.subscribe(data => {
            console.log('Skillsets:', data);
          });


          // using user domain model
          this.getUser = this.userService.getUsersById(this.id).subscribe({
            next: (userResponse) => {
              if (!userResponse) {
                console.error('User not found:', userResponse);
                return;
              }
              if (!userResponse.skillset) {
                console.error('User has no skillsets:', userResponse);
                return;
              }
              this.model = userResponse;
              this.selectedSkillsets = userResponse.skillset?.map(skill => skill.skillsetId) || [];
              console.log("these are the fetched skillsets "+this.selectedSkillsets); // Log to check if IDs are correct

            },
            error: (err) =>{
              console.error('couldnt get the right id')
            }
          });
        }
      },
      error: () =>{
        alert("unable to return id, check route if it has anything");
      }
    });
  }


  onFormSubmit(){
    // check if model and id is populated
    if(this.model && this.id){
      let updateUser: UpdateUserModel ={
        username : this.model.username,
        email: this.model.email,
        hobby: this.model.hobby,
        isVisible: this.model.isVisible,
        phoneNumber: this.model.phoneNumber,
        registerDate: this.model.registerDate,
        profileImageUrl: this.model.profileImageUrl,
        skillset: this.selectedSkillsets ? this.selectedSkillsets : []


      };

      if(this.id){
        this.editUserSubscription = this.userService.updateUsersById(updateUser, this.id).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/admin/user');
          },
          error: (err) => {
            console.error("Unable to update data, check the params in onFormSubmit or api");
          }
      })
      }
    }
  }

  onDelete(){
    if(this.id){
      this.deleteUser = this.userService.deleteUser(this.id).subscribe({
        next: (data) => {
          // maybe remove data return
          this.router.navigateByUrl('/admin/user')
        },
        error: (err)=>{
          console.error('Couldnt be deleted, check id in params or service')
        }
      })
    }
  }

  openImageSelector(){
    this.imageSelectorVisibilityFlag = true;
  }

  closeModal(){
    this.imageSelectorVisibilityFlag = false;
  }

  ngOnDestroy(): void {
    this.RouteSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
    this.getUser?.unsubscribe();
    this.deleteUser?.unsubscribe();
  }
}
