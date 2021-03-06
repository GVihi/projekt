import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserItem } from '../../models/user-item';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: UserItem;
  hostUsers = AdminService.hostUsers;
  hostAdmin = AdminService.hostAdmin;

  constructor(private adminService: AdminService, private router: Router) { }

  getUser(id: Number): void {
    this.adminService.getUser(id).subscribe(user => this.user = user);
    console.log(this.user.username);
  }

  confirm(nickname: String, email: String, age: Number): void {
    const idUser = localStorage.getItem("userId");
    var userId: number = +idUser;
    this.adminService.updateUser(userId, nickname, email, age).subscribe(response => console.log(response));
  }

  ngOnInit(): void {
    const idUser = localStorage.getItem("userId");
    var userId: number = +idUser;
    this.getUser(userId); //static for now!! To be changed to get by token
  }

}
