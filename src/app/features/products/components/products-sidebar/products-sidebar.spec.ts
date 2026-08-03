import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSidebar } from './products-sidebar';

describe('ProductsSidebar', () => {
  let component: ProductsSidebar;
  let fixture: ComponentFixture<ProductsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
