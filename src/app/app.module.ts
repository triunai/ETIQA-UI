import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SkillsetListComponent } from './features/skillset/skillset-list/skillset-list.component';
import { AddSkillsetComponent } from './features/skillset/add-skillset/add-skillset.component';
import { SkillsetService } from './features/skillset/services/skillset.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SkillsetListComponent,
    AddSkillsetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  // populate this with your service
  providers: [SkillsetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
