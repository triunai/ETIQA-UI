import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { MarkdownModule } from 'ngx-markdown'


import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SkillsetListComponent } from './features/skillset/skillset-list/skillset-list.component';
import { AddSkillsetComponent } from './features/skillset/add-skillset/add-skillset.component';
import { SkillsetService } from './features/skillset/services/skillset.service';
import { EditSkillsetComponent } from './features/skillset/edit-skillset/edit-skillset.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { UserService } from './features/user/services/user.service';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SkillsetListComponent,
    AddSkillsetComponent,
    EditSkillsetComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    ImageSelectorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    // MarkdownModule.forRoot()

  ],
  // populate this with your service
  providers: [SkillsetService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
