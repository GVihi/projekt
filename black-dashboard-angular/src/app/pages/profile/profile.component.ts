import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserItem } from '../../models/user-item';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserItem;
  hostUsers = AdminService.hostUsers;
  hostAdmin = AdminService.hostAdmin;

  constructor(private adminService: AdminService, private router: Router) { }

  getUser(id: Number): void {
    this.adminService.getUser(id).subscribe(user => this.user = user);
    console.log(this.user.username);
  }

  ngOnInit(): void {
    const idUser = localStorage.getItem("userId");
    var userId: number = +idUser;
    this.getUser(userId);
  }

}
