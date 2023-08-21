import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductV2Component } from './product-v2.component';

describe('ProductV2Component', () => {
  let component: ProductV2Component;
  let fixture: ComponentFixture<ProductV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductV2Component],
    });
    fixture = TestBed.createComponent(ProductV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
