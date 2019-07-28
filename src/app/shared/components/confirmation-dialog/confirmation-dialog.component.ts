import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Input data for the dialog component
 */
export interface DialogData {
  title: string;
  confirm: any;
}

/**
 * Dialog used for confirmation purposes.
 * For example, prompting the user before any deletion
 */
@Component({
  selector: 'oevents-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  /**
   *
   * Closes the dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

}
