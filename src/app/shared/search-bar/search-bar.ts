import { Component, ChangeDetectionStrategy, output, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  placeholder = input('Search...');
  searchQuery = signal('');
  search = output<string>();

  onSearch(): void {
    this.search.emit(this.searchQuery());
  }
}
