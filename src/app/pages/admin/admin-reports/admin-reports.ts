import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css'
})
export class AdminReports implements OnInit {
  adminService = inject(AdminService);
  
  reports: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.isLoading = true;
    this.adminService.getReports().subscribe({
      next: (data) => {
        this.reports = data.items || data || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Mock data
        this.reports = [
          { id: '1', listingId: '101', listingTitle: 'Fake iPhone', reason: 'Scam', description: 'User asking for money upfront.', status: 'Pending', createdAt: new Date() },
          { id: '2', listingId: '102', listingTitle: 'Offensive Ad', reason: 'Inappropriate Content', description: 'Image contains offensive material.', status: 'Reviewed', createdAt: new Date() }
        ];
      }
    });
  }

  resolveReport(id: string, status: string) {
    this.adminService.resolveReport(id, status).subscribe({
      next: () => {
        const report = this.reports.find(r => r.id === id);
        if (report) {
          report.status = status;
        }
      },
      error: () => alert('Failed to resolve report')
    });
  }
}
