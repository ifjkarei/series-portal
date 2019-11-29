import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeWatchedComponent } from './to-be-watched.component';

describe('ToBeWatchedComponent', () => {
  let component: ToBeWatchedComponent;
  let fixture: ComponentFixture<ToBeWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToBeWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBeWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
