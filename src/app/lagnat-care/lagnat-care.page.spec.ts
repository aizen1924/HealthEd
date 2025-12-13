import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LagnatCarePage } from './lagnat-care.page';

describe('LagnatCarePage', () => {
  let component: LagnatCarePage;
  let fixture: ComponentFixture<LagnatCarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LagnatCarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
