import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candel-dialog',
  templateUrl: './candel-dialog.component.html',
  styleUrls: ['./candel-dialog.component.scss'],
})
export class CandelDialogComponent implements OnInit {
  descriptionInput = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { content: string }
  ) {}

  ngOnInit(): void {}

  cancelled() {
    if (this.descriptionInput.valid) {
      return this.descriptionInput.value;
    }
  }
}
