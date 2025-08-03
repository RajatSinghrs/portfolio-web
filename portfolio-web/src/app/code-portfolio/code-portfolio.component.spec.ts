import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePortfolioComponent } from './code-portfolio.component';

describe('CodePortfolioComponent', () => {
  let component: CodePortfolioComponent;
  let fixture: ComponentFixture<CodePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodePortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
