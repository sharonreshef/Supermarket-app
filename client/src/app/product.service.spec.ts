import { TestBed } from '@angular/core/testing';

import { ProductstService } from './product.service';

describe('ProductstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductstService = TestBed.get(ProductstService);
    expect(service).toBeTruthy();
  });
});
