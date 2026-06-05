import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from '../../core/services/locations.service';

@Component({
  selector: 'app-location-picker',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="location-picker">
      <div class="field-group">
        <label>State</label>
        <select [(ngModel)]="selectedStateId" (change)="onStateChange()" class="form-input">
          <option value="">Select State</option>
          <option *ngFor="let state of states" [value]="state.id">{{ state.name }}</option>
        </select>
      </div>
      <div class="field-group" *ngIf="selectedStateId">
        <label>City</label>
        <select [(ngModel)]="selectedCityId" (change)="onCityChange()" class="form-input">
          <option value="">Select City</option>
          <option *ngFor="let city of cities" [value]="city.id">{{ city.name }}</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .location-picker { display: flex; gap: 16px; }
    .field-group { flex: 1; }
    label { display: block; margin-bottom: 8px; font-weight: 500; }
    .form-input { width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; }
  `]
})
export class LocationPicker implements OnInit {
  locationsService = inject(LocationsService);

  @Input() stateId: number | null = null;
  @Input() cityId: number | null = null;
  @Output() locationChange = new EventEmitter<{ stateId: number, cityId: number }>();

  states: any[] = [];
  cities: any[] = [];
  selectedStateId: string = '';
  selectedCityId: string = '';

  ngOnInit() {
    this.locationsService.getStates().subscribe({
      next: (states) => {
        this.states = states;
        if (this.stateId) {
          this.selectedStateId = this.stateId.toString();
          this.loadCities(this.stateId);
        }
      }
    });
  }

  onStateChange() {
    this.selectedCityId = '';
    const sid = parseInt(this.selectedStateId, 10);
    if (!isNaN(sid)) {
      this.loadCities(sid);
    } else {
      this.cities = [];
    }
    this.emitChange();
  }

  loadCities(stateId: number) {
    this.locationsService.getCities(stateId).subscribe({
      next: (cities) => {
        this.cities = cities;
        if (this.cityId && cities.find(c => c.id === this.cityId)) {
          this.selectedCityId = this.cityId.toString();
        }
      }
    });
  }

  onCityChange() {
    this.emitChange();
  }

  private emitChange() {
    const sId = parseInt(this.selectedStateId, 10);
    const cId = parseInt(this.selectedCityId, 10);
    if (!isNaN(sId) && !isNaN(cId)) {
      this.locationChange.emit({ stateId: sId, cityId: cId });
    }
  }
}
