import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatProductPagesComponent } from './creat-product-pages.component';

describe('CreatProductPagesComponent', () => {
  let component: CreatProductPagesComponent;
  let fixture: ComponentFixture<CreatProductPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatProductPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatProductPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
