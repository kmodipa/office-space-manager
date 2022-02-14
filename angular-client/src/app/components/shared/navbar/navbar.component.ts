import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/http/auth-service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() label!: string;
  loginConditionText = "";

  constructor(private location: Location,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.LogOut();
    this.router.navigate(['login']);
  }

  signUp(): void {
    this.router.navigate(['signUp']);
  }

  back(): void {
    this.location.back();
  }

  /* Control the Login/LogOut text */
  loginCondition(): boolean {
    if (this.activatedRoute.snapshot.url[0].path != 'login' &&
      this.activatedRoute.snapshot.url[0].path != 'signUp') {
      if (this.authService.isLoggedIn()) {
        this.loginConditionText = 'LogOut';
      } else {
        this.loginConditionText = 'Login';
      }
      return true;
    }
    return false;
  }

}
