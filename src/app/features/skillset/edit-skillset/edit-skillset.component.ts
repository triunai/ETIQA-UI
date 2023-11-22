import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsetService } from '../services/skillset.service';
import { Subscription } from 'rxjs';
import { Skillset } from '../models/skillset.model';

@Component({
  selector: 'app-edit-skillset',
  templateUrl: './edit-skillset.component.html',
  styleUrls: ['./edit-skillset.component.css']
})
export class EditSkillsetComponent implements OnInit, OnDestroy {

  id: string | null = null;
  skillset?: Skillset;

  paramsSubscription?: Subscription; // <-- For routing purposes only
  editSkillsetSubscription?: Subscription;
  deleteSkillsetSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillsetService: SkillsetService,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log('EditSkillsetComponent initialized')
    this.getIdFromRoute();

  }

  getIdFromRoute(){
    this.paramsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');  // <---getting value from route, check your app-routing for the *EXACT* variable
        if(this.id){
          this.skillsetService.getSkillsById(this.id).subscribe({
            next: (responseFromApi) =>{
              this.skillset = responseFromApi;
            },
            error: (error) => {
              console.error('Error fetching skillset:', error);
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
    const updateModel = {
      skillsetName: this.skillset?.skillName ?? '',

    };
    // transform this object using service
    if(this.id) {
      this.editSkillsetSubscription = this.skillsetService.updateSkillset(updateModel, this.id).subscribe({
        next: (data) =>{
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error("unable to update data, check params or api: "+error.message)
        }
      })
    }
  }

  onDelete(){
    // add from service
    if(this.id){
        this.deleteSkillsetSubscription = this.skillsetService.deleteSkillset(this.id).subscribe({
          next: (responseFromApi) =>{
            console.log(`This is the deleted category ${responseFromApi.skillsetId}, ${responseFromApi.skillName}`);
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) =>{
            console.error("Couldnt be deleted, maybe check id: "+error.message)
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe;
    this.deleteSkillsetSubscription?.unsubscribe;
    this.editSkillsetSubscription?.unsubscribe;
  }
}
