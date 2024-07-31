import { Component } from '@angular/core';
import { User } from '../../../shared/interfaces/auth.interfaces';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuario.component.html',
  styleUrl: './gestion-usuario.component.css'
})
export class GestionUsuarioComponent {
  users: User[] = [];
  newUser: User = new User();
  editUser: User | null = null;
  view: 'list' | 'create' | 'edit' = 'list';  // Controls the current view

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  createUser(): void {
    this.adminService.createUser(this.newUser).subscribe(
      (data: User) => {
        this.users.push(data);
        this.newUser = new User(); // Reset the form
        this.view = 'list'; // Return to the user list view
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  startEditUser(user: User): void {
    this.editUser = { ...user }; // Create a copy for editing
    this.view = 'edit'; // Switch to edit view
  }

  saveEditUser(): void {
    if (this.editUser) {
      this.adminService.editUser(this.editUser.id, this.editUser).subscribe(
        (data: User) => {
          const index = this.users.findIndex(u => u.id === data.id);
          if (index !== -1) {
            this.users[index] = data;
          }
          this.editUser = null; // Reset the edit form
          this.view = 'list'; // Return to the user list view
        },
        (error) => {
          console.error('Error editing user:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editUser = null;
    this.view = 'list'; // Return to the user list view
  }

  deleteUser(id: string): void {
    this.adminService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  toggleView(view: 'list' | 'create'): void {
    this.view = view;
  }
}