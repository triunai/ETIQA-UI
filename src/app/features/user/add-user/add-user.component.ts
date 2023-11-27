import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddUserModel } from '../models/add-user-model';
import { Observable, Subscription } from 'rxjs';
import { Skillset } from '../../skillset/models/skillset.model';
import { SkillsetService } from '../../skillset/services/skillset.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ImageSelectorService } from 'src/app/shared/components/image-selector/image-selector.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy{


  model: AddUserModel;
  skillset$?: Observable<Skillset[]>;
  imageSelectorVisibilityFlag?: boolean = false;
  imageSelectSubscription$?: Subscription;
  // image selector stuff goes here

  constructor(
    private skillsetService: SkillsetService,
    private userService: UserService,
    private router: Router,
    private imageService: ImageSelectorService
  ) {


    this.model = {
      username: '',
      email: '',
      phoneNumber: '',
      hobby: '',
      registerDate: new Date(),
      isVisible: true,
      profileImageUrl: '',

      skillset: [],
    }
  }

  ngOnInit(): void {
    this.fetchSkillsets();
    this.imageSelectSubscription$ = this.imageService.onSelectImage().subscribe({
      // Do something with the new image
      next: (response) => {
        if(this.model){
          this.model.profileImageUrl = response.fileUrl;
          this.closeImageSelector(); // closes it for you
        }
      },
      error: (err) => {
        console.error("Something worng happened "+err)
      }
    });
  }
  onFormSubmit(){
    console.log(this.model); // <-- to check two way data binding

    // <-- use ur logic, ur returning an observable, so you have to subscribe to it!
   this.userService.createUser(this.model).subscribe({
      next: (apiResponse) =>{
        console.log("Successful addition "+apiResponse.username)
        //add routing to blogpost list later
        this.router.navigateByUrl('/admin/user')
      },
      error: (err) => {
        console.error("Error, couldnt insert, check api, or angular service class"+err.message)
      }
    });
  }

  private fetchSkillsets(){
    this.skillset$ = this.skillsetService.getAllSkillsets();
  }

  openImageSelector(){
    this.imageSelectorVisibilityFlag = true;
  }

  closeImageSelector(){
    this.imageSelectorVisibilityFlag = false;
  }
  ngOnDestroy(): void {
    this.imageSelectSubscription$?.unsubscribe();
  }
}
