import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-candel-dialog',
  templateUrl: './candel-dialog.component.html',
  styleUrls: ['./candel-dialog.component.scss'],
})
export class CandelDialogComponent implements OnInit {
  descriptionInput = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<CandelDialogComponent>) {}

  ngOnInit(): void {}

  cancelled() {
    if (this.descriptionInput.valid) {
      return this.descriptionInput.value;
    }
  }
}
