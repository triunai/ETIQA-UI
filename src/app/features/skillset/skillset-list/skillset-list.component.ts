import { Component, OnInit } from '@angular/core';
import { SkillsetService } from '../services/skillset.service';
import { Skillset } from '../models/skillset.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skillset-list',
  templateUrl: './skillset-list.component.html',
  styleUrls: ['./skillset-list.component.css']
})
export class SkillsetListComponent implements OnInit {

  skillset$?: Observable<Skillset[]>;
  showTable: boolean = false; // Initialize to true if you want the table to be visible initially

  constructor(private skillsetService: SkillsetService){
  }
  ngOnInit(): void {
    this.fetchSkillsets();
  }

  fetchSkillsets(): void{
    this.toggleTable();
    this.skillset$ = this.skillsetService.getAllSkillsets();
    this.skillset$.subscribe(data => {
      console.log('Skillsets:', data);
    });
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }
}
