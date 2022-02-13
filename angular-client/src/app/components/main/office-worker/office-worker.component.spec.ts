import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeWorkerComponent } from './office-worker.component';

describe('OfficeWorkerComponent', () => {
  let component: OfficeWorkerComponent;
  let fixture: ComponentFixture<OfficeWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
