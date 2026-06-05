import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.html',
  styleUrl: './seller-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerCard {
  seller = input.required<any>();
}
