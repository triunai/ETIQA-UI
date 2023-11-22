import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsetListComponent } from './features/skillset/skillset-list/skillset-list.component';
import { AddSkillsetComponent } from './features/skillset/add-skillset/add-skillset.component';

const routes: Routes = [

  {path: 'admin/skillset', component: SkillsetListComponent},
  {path: 'admin/skillset/add', component: AddSkillsetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
