import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsetListComponent } from './features/skillset/skillset-list/skillset-list.component';
import { AddSkillsetComponent } from './features/skillset/add-skillset/add-skillset.component';
import { EditSkillsetComponent } from './features/skillset/edit-skillset/edit-skillset.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';

const routes: Routes = [

  // for skillset
  {path: 'admin/skillset', component: SkillsetListComponent},
  {path: 'admin/skillset/add', component: AddSkillsetComponent},
  {path: 'admin/skillset/:id', component: EditSkillsetComponent},

  // for user
  {path: 'admin/user', component: UserListComponent},
  {path: 'admin/user/add', component: AddUserComponent},
  {path: 'admin/user/:id', component: EditUserComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
