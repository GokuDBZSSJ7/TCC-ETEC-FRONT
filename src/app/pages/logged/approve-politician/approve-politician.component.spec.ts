import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePoliticianComponent } from './approve-politician.component';

describe('ApprovePoliticianComponent', () => {
  let component: ApprovePoliticianComponent;
  let fixture: ComponentFixture<ApprovePoliticianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovePoliticianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovePoliticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
