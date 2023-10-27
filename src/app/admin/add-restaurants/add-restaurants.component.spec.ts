import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppmaterialModule } from 'src/app/appmaterial/appmaterial.module';

import { AddRestaurantsComponent } from './add-restaurants.component';

describe('AddRestaurantsComponent', () => {
  let component: AddRestaurantsComponent;
  let fixture: ComponentFixture<AddRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRestaurantsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, AppmaterialModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AddRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
