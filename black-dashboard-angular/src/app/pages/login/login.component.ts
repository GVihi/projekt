import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  login(username: String, password: String) {
    this.authService.login(username, password).subscribe((res) => {
      if (res.status === 200) {
        this.router.navigate(['/photos'])
      }
    })
  }


  ngOnInit(): void {
  }

}
