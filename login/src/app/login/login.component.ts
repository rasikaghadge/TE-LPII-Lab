import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupUsers: any = []

  signupobj: any = {
    username: '',
    password: ''
  }

  loginObj: any = {
    username: '',
    password: ''
  }

  ngOnInit(): void {
    const localData = localStorage.getItem("signup-users")
    if (localData != null) {
      this.signupUsers = JSON.parse(localData)
    }
  }

  onSignup() {
    this.signupUsers.push(this.signupobj)
    localStorage.setItem("signup-users", JSON.stringify(this.signupUsers))
    this.signupUsers = {
      username: '',
      password: ''
    }
  }

  onLogin() {
    const isPresent = this.signupUsers.find((m: any) => m.username === this.loginObj.username && m.password === this.loginObj.password)

    if (isPresent) {
      alert("User exists")
    } else {
      alert("User does not exist")
    }
  }
}
