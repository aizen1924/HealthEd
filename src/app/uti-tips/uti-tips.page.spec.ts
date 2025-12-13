import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtiTipsPage } from './uti-tips.page';

describe('UtiTipsPage', () => {
  let component: UtiTipsPage;
  let fixture: ComponentFixture<UtiTipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UtiTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
