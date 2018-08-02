import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLogosComponent } from './set-logos.component';

describe('SetLogosComponent', () => {
  let component: SetLogosComponent;
  let fixture: ComponentFixture<SetLogosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLogosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
