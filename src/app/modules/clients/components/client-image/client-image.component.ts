import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-client-image',
  templateUrl: './client-image.component.html',
  styleUrls: ['./client-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClientImageComponent),
      multi: true,
    },
  ],
})
export class ClientImageComponent implements OnInit, ControlValueAccessor {
  initialValue!: string | null;
  file!: File;

  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled!: boolean;

  photoSelected: string | ArrayBuffer = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.initialValue);
  }

  writeValue(photo: string): void {
    if (photo) {
      this.initialValue = photo;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  removePhoto() {
    // this.photo = null;
  }

  onPhotoSelected(event: any) {
    if (event?.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      //image reader
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result!);
      reader.readAsDataURL(this.file);
      this.initialValue = null;
      this.onTouch();
      this.onChange(this.file);
    }
  }
}
