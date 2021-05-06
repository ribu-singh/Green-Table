import { TestBed } from '@angular/core/testing';

import { CalculateTimeService } from './calculate-time.service';

describe('CalculateTimeService', () => {
  let service: CalculateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
