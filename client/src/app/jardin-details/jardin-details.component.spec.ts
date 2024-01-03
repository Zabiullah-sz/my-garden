import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JardinDetailsComponent } from './jardin-details.component';

describe('JardinDetailsComponent', () => {
  let component: JardinDetailsComponent;
  let fixture: ComponentFixture<JardinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JardinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JardinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
