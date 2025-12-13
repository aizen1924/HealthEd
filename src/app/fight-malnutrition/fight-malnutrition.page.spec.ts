import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FightMalnutritionPage } from './fight-malnutrition.page';

describe('FightMalnutritionPage', () => {
  let component: FightMalnutritionPage;
  let fixture: ComponentFixture<FightMalnutritionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FightMalnutritionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
