import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  adminService = inject(AdminService);
  
  stats: any = null;
  isLoading = true;

  ngOnInit() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Mock data for display purposes since we don't have backend
        this.stats = {
          totalUsers: 1250,
          activeListings: 4320,
          pendingReports: 12,
          totalRevenue: 15400
        };
      }
    });
  }
}
