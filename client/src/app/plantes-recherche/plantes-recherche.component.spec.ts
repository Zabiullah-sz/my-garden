import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantesRechercheComponent } from './plantes-recherche.component';

describe('PlantesRechercheComponent', () => {
  let component: PlantesRechercheComponent;
  let fixture: ComponentFixture<PlantesRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantesRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantesRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
