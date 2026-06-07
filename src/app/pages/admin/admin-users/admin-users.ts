import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {
  adminService = inject(AdminService);
  
  users: any[] = [];
  isLoading = true;
  searchQuery = '';
  page = 1;
  pageSize = 20;
  totalCount = 0;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    const params: any = { page: this.page, pageSize: this.pageSize };
    if (this.searchQuery) {
      params.search = this.searchQuery;
    }
    this.adminService.getUsers(params).subscribe({
      next: (data) => {
        this.users = data.items || data || [];
        this.totalCount = data.totalCount || this.users.length;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load users', err);
      }
    });
  }

  onSearch() {
    this.page = 1;
    this.loadUsers();
  }

  blockUser(id: string, currentlyBlocked: boolean) {
    const isBlocked = !currentlyBlocked;
    const reason = isBlocked ? prompt('Reason for blocking:') : '';
    if (isBlocked && reason === null) return; // User cancelled

    this.adminService.blockUser(id, isBlocked, reason || 'No reason provided').subscribe({
      next: () => {
        const user = this.users.find(u => u.id === id);
        if (user) {
          user.isBlocked = isBlocked;
        }
      },
      error: () => alert('Failed to update block status')
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to completely delete this user? This cannot be undone.')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: () => alert('Failed to delete user')
      });
    }
  }

  nextPage() {
    if (this.users.length === this.pageSize) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}
