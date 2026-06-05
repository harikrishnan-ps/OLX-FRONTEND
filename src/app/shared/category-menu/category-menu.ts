import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-category-menu',
  imports: [RouterLink],
  templateUrl: './category-menu.html',
  styleUrl: './category-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryMenu {
  @Input({ required: true }) categories: Category[] = [];
}
