import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CityService } from '../../../services/city.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CityDTO } from '../../../models/city.dto';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent {
  private fb = inject(FormBuilder);
  private cityService = inject(CityService);
  private snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<CityFormComponent>);

  cityForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CityDTO | null) {
    this.cityForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      name_native: [data?.name_native || '', Validators.required],
      country: [data?.country || '', Validators.required],
      continent: [data?.continent || '', Validators.required],
      latitude: [
        data?.latitude || null,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        data?.longitude || null,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
      population: [
        data?.population || 0,
        [Validators.required, Validators.min(1)],
      ],
      founded: [data?.founded || null],
      landmarks: this.fb.array(
        data?.landmarks?.map((lm) => this.fb.control(lm)) || []
      ),
    });
  }

  get landmarks(): FormArray {
    return this.cityForm.get('landmarks') as FormArray;
  }

  addLandmark(): void {
    this.landmarks.push(this.fb.control('')); // ✅ Add empty landmark field
  }

  removeLandmark(index: number): void {
    this.landmarks.removeAt(index); // ✅ Remove selected landmark
  }

  saveCity(): void {
    if (this.cityForm.invalid) return;

    const cityData = { ...this.cityForm.value, id: this.data?.id };

    if (cityData.id) {
      // ✅ Edit existing city
      this.cityService.updateCity(cityData.id, cityData).subscribe({
        next: () => {
          this.snackBar.open('City updated successfully!', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: () =>
          this.snackBar.open('Failed to update city!', 'Close', {
            duration: 3000,
          }),
      });
    } else {
      // ✅ Add new city
      this.cityService.addCity(cityData).subscribe({
        next: () => {
          this.snackBar.open('City added successfully!', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: () =>
          this.snackBar.open('Failed to add city!', 'Close', {
            duration: 3000,
          }),
      });
    }
  }
}
