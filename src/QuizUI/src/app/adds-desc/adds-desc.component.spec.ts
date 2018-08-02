import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsDescComponent } from './adds-desc.component';

describe('AddsDescComponent', () => {
  let component: AddsDescComponent;
  let fixture: ComponentFixture<AddsDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
