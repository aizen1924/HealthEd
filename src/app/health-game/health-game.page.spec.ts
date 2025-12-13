import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthGamePage } from './health-game.page';

describe('HealthGamePage', () => {
  let component: HealthGamePage;
  let fixture: ComponentFixture<HealthGamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
