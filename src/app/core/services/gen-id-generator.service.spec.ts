import { TestBed } from '@angular/core/testing';

import { GenIdGeneratorService } from './gen-id-generator.service';

describe('GenIdGeneratorService', () => {
  let service: GenIdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenIdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
