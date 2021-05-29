import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private adminService: AdminService, private router: Router) { }

  getAllUsers(): void {
    this.adminService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: Number): void {
    //console.log("delete triggered" + id);
    this.adminService.deleteSpecificUser(id).subscribe(response => this.router.navigate(['/admin']));
  }

  createBackupOfPhotos(): void {
    console.log("Creating backup...");
    this.adminService.backupPhotos().subscribe(response => console.log(response));
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

}
