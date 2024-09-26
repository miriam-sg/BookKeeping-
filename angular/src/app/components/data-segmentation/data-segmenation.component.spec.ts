import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSegmenationComponent } from './data-segmenation.component';

describe('DataSegmenationComponent', () => {
  let component: DataSegmenationComponent;
  let fixture: ComponentFixture<DataSegmenationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSegmenationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSegmenationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
