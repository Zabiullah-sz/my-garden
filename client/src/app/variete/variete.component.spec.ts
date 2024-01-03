import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarieteComponent } from './variete.component';

describe('VarieteComponent', () => {
  let component: VarieteComponent;
  let fixture: ComponentFixture<VarieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
