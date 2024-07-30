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
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  startEditUser(user: User): void {
    this.editUser = { ...user }; // Create a copy for editing
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
        },
        (error) => {
          console.error('Error editing user:', error);
        }
      );
    }
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
}
