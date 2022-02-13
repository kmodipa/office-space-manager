import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() label!: string;

  constructor(private location: Location,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['login']);
  }

  signUp(): void {
    this.router.navigate(['signUp']);
  }

  back(): void {
    this.location.back();
  }

  loginCondition(): boolean {
    if (this.activatedRoute.snapshot.url[0].path != 'login' &&
      this.activatedRoute.snapshot.url[0].path != 'signUp') {
      return true;
    }
    return false;
  }

}
