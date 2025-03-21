import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CityFormComponent } from '../../city-form/city-form.component';
@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss',
})
export class AddCityComponent {
  private dialog = inject(MatDialog);

  openCityForm(cityData: any = null): void {
    const dialogRef = this.dialog.open(CityFormComponent, {
      width: '40vw',
      height: '100%',
      disableClose: true, // ✅ Prevents accidental closing
      // position: { top: '15vh', left: '35vw' }, // ✅ Positions dialog
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('City added or updated, refresh list.');
        // ✅ Add logic to refresh city list after closing the modal
      }
    });
  }
}
