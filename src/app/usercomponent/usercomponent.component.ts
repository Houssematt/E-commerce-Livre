// usercomponent.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service.ts.service';
import { Users } from '../interfaces/users';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-usercomponent',
  templateUrl: './usercomponent.component.html',
  styleUrls: ['./usercomponent.component.css'],
})
export class UsercomponentComponent implements OnInit {
  users: Users[] = [];
  userForm: FormGroup | any;
  isUpdateFormVisible: boolean = false;
  selectedUser: Users | null = null;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
    this.initForm();
    this.checkAdminStatus();
  }

  initForm() {
    this.userForm = this.fb.group({
      password: [''],
    });
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  checkAdminStatus() {
    this.isAdmin = this.authService.isAdminUser();
  }

  showUpdateForm(user: Users) {
    if (this.isAdmin) {
      this.isUpdateFormVisible = true;
      this.selectedUser = user;
      this.userForm.setValue({
        password: user.password,
      });
    } else {
      alert('You do not have permission to update user information.');
    }
  }

  updateUser(user: Users) {
    if (this.isAdmin && this.selectedUser) {
      const updatedUser: Users = { ...this.selectedUser, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.cancelUpdate();
        this.loadAllUsers();
      });
    } else {
      alert('Invalid operation. Please try again.');
    }
  }

  deleteUser(userId: number) {
    if (this.isAdmin) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
      });
    } else {
      alert('You do not have permission to delete users.');
    }
  }

  addmodel() {
    if (this.isAdmin) {
      this.isUpdateFormVisible = false;
      this.selectedUser = null;
      this.userForm.reset();
    } else {
      alert('You do not have permission to add new users.');
    }
  }

  cancelUpdate() {
    this.isUpdateFormVisible = false;
    this.selectedUser = null;
    this.userForm.reset();
  }
}
