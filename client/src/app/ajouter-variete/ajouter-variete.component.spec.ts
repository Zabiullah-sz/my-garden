import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVarieteComponent } from './ajouter-variete.component';

describe('AjouterVarieteComponent', () => {
  let component: AjouterVarieteComponent;
  let fixture: ComponentFixture<AjouterVarieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterVarieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVarieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
