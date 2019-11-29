import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowWatchingComponent } from './now-watching.component';

describe('NowWatchingComponent', () => {
  let component: NowWatchingComponent;
  let fixture: ComponentFixture<NowWatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowWatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
