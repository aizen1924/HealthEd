import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs'; // Helper to create fake data

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  // 1. Create a fake Router so the test doesn't actually change pages
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  // 2. Create a fake Firebase Auth
  const mockFireAuth = {
    authState: of({ uid: 'test-user' }) // Simulate a user being logged in
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Tell the test to use our fakes instead of the real app components
        { provide: Router, useValue: mockRouter },
        { provide: AngularFireAuth, useValue: mockFireAuth }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});