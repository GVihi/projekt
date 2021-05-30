import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(username: String, nickname: String, email: String, password: String, passwordConfirm: String, age: Number) {
    if(password === passwordConfirm){
      console.log("Passwords match!");
      this.authService.register(username, nickname, email, password, age).subscribe((res) => {
        if (res) this.router.navigate(['/login']);
        else this.error = true;
      })
    }else{
      console.log("Password do not match!");
    }

    
  }


}
