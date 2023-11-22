import { Component, OnDestroy } from '@angular/core';
import { AddSkillsetRequest } from '../models/add-skillset-request.model';
import { SkillsetService } from '../services/skillset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-skillset',
  templateUrl: './add-skillset.component.html',
  styleUrls: ['./add-skillset.component.css']
})
export class AddSkillsetComponent implements OnDestroy {

  model: AddSkillsetRequest;
  private addSkillsetSubscription?: Subscription;

  constructor(private skillsetService: SkillsetService){
    this.model = {
      skillname: ''
    };
  }


  onSubmit(){
    console.log(this.model);
    this.addSkillsetSubscription = this.skillsetService.addSkillset(this.model).subscribe({
      next: (data) => {
        console.log("Successfully added skill: "+data);
        // his.router.navigateByUrl('/admin/skillset');
      },
      error: (err: { message: string; }) => {
        console.error('Error, model wasnt added or data wasnt bound properly'+err.message);
      }
    })
  }

  ngOnDestroy(): void {
    this.addSkillsetSubscription?.unsubscribe();
  }
}
