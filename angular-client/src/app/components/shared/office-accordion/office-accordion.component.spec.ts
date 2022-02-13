import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAccordionComponent } from './office-accordion.component';

describe('OfficeAccordionComponent', () => {
  let component: OfficeAccordionComponent;
  let fixture: ComponentFixture<OfficeAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
