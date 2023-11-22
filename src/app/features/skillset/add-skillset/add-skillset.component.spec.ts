import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsetComponent } from './add-skillset.component';

describe('AddSkillsetComponent', () => {
  let component: AddSkillsetComponent;
  let fixture: ComponentFixture<AddSkillsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillsetComponent]
    });
    fixture = TestBed.createComponent(AddSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
