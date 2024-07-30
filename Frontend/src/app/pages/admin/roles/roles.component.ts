import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles: any[] = [];
  selectedRole: any = null;
  newRole: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.adminService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }

  createRole(): void {
    this.adminService.createRole(this.newRole).subscribe(() => {
      this.loadRoles();
      this.newRole = {};
    });
  }

  editRole(): void {
    if (this.selectedRole) {
      this.adminService.editRole(this.selectedRole.id, this.selectedRole).subscribe(() => {
        this.loadRoles();
        this.selectedRole = null;
      });
    }
  }

  deleteRole(id: string): void {
    this.adminService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    });
  }

  selectRole(role: any): void {
    this.selectedRole = { ...role };
  }

  clearSelection(): void {
    this.selectedRole = null;
  }
}