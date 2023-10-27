import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppmaterialModule } from '../appmaterial/appmaterial.module';

import { OrderPlaceComponent } from './order-place.component';

describe('OrderPlaceComponent', () => {
  let component: OrderPlaceComponent;
  let fixture: ComponentFixture<OrderPlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPlaceComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, AppmaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(OrderPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
