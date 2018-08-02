import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLogosGroupComponent } from './set-logos-group.component';

describe('SetLogosGroupComponent', () => {
  let component: SetLogosGroupComponent;
  let fixture: ComponentFixture<SetLogosGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLogosGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLogosGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
