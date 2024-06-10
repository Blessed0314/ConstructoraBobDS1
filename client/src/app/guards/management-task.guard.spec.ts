import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { managementTaskGuard } from './management-task.guard';

describe('managementTaskGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => managementTaskGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
