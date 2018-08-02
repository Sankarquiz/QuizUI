import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPagesComponent } from './set-pages.component';

describe('SetPagesComponent', () => {
  let component: SetPagesComponent;
  let fixture: ComponentFixture<SetPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
