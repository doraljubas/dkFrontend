import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovijestBolestComponent } from './povijest-bolest.component';

describe('PovijestBolestComponent', () => {
  let component: PovijestBolestComponent;
  let fixture: ComponentFixture<PovijestBolestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PovijestBolestComponent]
    });
    fixture = TestBed.createComponent(PovijestBolestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
