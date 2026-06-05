import { Component } from '@angular/core';

@Component({
  selector: 'app-my-ads-dashboard',
  template: `
    <div class="page-with-navbar-and-bottom-nav">
      <div class="container section-padding text-center" style="padding-top: 100px;">
        <span class="material-symbols-outlined" style="font-size: 64px; color: var(--color-outline);">inventory_2</span>
        <h2>My Ads</h2>
        <p style="color: var(--color-outline);">You don't have any active ads right now.</p>
      </div>
    </div>
  `
})
export class MyAdsDashboard {}
