import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIntercambiosComponent } from './gestion-intercambios.component';

describe('GestionIntercambiosComponent', () => {
  let component: GestionIntercambiosComponent;
  let fixture: ComponentFixture<GestionIntercambiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionIntercambiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionIntercambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
