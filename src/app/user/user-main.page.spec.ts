import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainPage } from './user-main.page';

describe('UserMainPage', () => {
  let component: UserMainPage;
  let fixture: ComponentFixture<UserMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
