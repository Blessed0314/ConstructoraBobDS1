import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gestionObrasGuard } from './gestion-obras.guard';

describe('gestionObrasGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gestionObrasGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
