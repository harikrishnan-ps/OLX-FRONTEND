import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Output() favoriteToggled = new EventEmitter<string>();

  get timeAgo(): string {
    const now = new Date();
    const posted = new Date(this.product.postedAt);
    const diffMs = now.getTime() - posted.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hrs ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  }

  get displayLocation(): string {
    const loc = this.product.location;
    return loc.neighborhood ? `${loc.neighborhood}, ${loc.city}` : loc.city;
  }

  get hasImage(): boolean {
    return this.product.images && this.product.images.length > 0;
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteToggled.emit(this.product.id);
  }
}
