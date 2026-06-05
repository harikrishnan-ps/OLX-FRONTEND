import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPicker } from '../location-picker/location-picker';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule, FormsModule, LocationPicker],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSidebar {
  filtersChanged = output<any>();

  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedStateId: number | null = null;
  selectedCityId: number | null = null;

  onLocationChange(loc: { stateId: number, cityId: number }): void {
    this.selectedStateId = loc.stateId;
    this.selectedCityId = loc.cityId;
  }

  applyFilters(): void {
    this.filtersChanged.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      stateId: this.selectedStateId,
      cityId: this.selectedCityId
    });
  }
}
