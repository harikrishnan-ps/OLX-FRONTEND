import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly footerColumns = [
    {
      links: [
        { label: 'Help Center', route: '/help' },
        { label: 'Safety Information', route: '/safety' },
      ],
    },
    {
      links: [
        { label: 'Terms of Use', route: '/terms' },
        { label: 'Privacy Policy', route: '/privacy' },
      ],
    },
    {
      links: [
        { label: 'Mobile Apps', route: '/apps' },
        { label: 'Contact Us', route: '/contact' },
      ],
    },
  ];
}
