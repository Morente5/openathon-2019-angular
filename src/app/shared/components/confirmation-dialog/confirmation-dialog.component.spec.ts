import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent, DialogData } from './confirmation-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogRefStub = {
  close: () => {},
};

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  let data: DialogData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
      ],
      declarations: [
        ConfirmationDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.get(MatDialogRef);
    data = TestBed.get(MAT_DIALOG_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNoClick', () => {
    it('should close the dialog', () => {
      spyOn(dialogRef, 'close');
      component.onNoClick();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

});
