import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddsComponent } from './main-adds.component';

describe('MainAddsComponent', () => {
  let component: MainAddsComponent;
  let fixture: ComponentFixture<MainAddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
