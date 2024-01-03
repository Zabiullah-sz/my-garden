import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierVarieteComponent } from './modifier-variete.component';

describe('ModifierVarieteComponent', () => {
  let component: ModifierVarieteComponent;
  let fixture: ComponentFixture<ModifierVarieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierVarieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierVarieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
