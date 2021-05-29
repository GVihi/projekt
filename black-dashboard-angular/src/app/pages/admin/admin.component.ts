import { Component, OnInit } from '@angular/core';
import { UserItem } from '../../models/user-item';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: UserItem[] = [];
  hostUsers = AdminService.hostUsers;
  hostAdmin = AdminService.hostAdmin;

  constructor(private adminService: AdminService) { }

  getAllUsers(): void {
    this.adminService.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

}
