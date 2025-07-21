import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlightComponent } from './starlight.component';

describe('StarlightComponent', () => {
  let component: StarlightComponent;
  let fixture: ComponentFixture<StarlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
