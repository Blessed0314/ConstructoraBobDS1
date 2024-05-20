import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { directorObraGuard } from './director-obra.guard';

describe('directorObraGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => directorObraGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
