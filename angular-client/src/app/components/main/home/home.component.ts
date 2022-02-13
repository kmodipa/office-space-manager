import { Component, OnInit } from '@angular/core';
import {OfficeModel} from "../../../core/models/office-model";
import {Router} from "@angular/router";
import {OfficeHttpService} from "../../../services/http/office-service/office.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offices: OfficeModel[];

  constructor(private router: Router,
              private officeHttpService: OfficeHttpService) {
    this.offices = Array<OfficeModel>();
  }

  ngOnInit(): void {
    this.getOfficesFromHttpService();
  }

  addNewOffice(): void {
    this.router.navigate(['add-office']);
  }

  getOfficesFromHttpService(): void {
    this.officeHttpService.GetAll().subscribe(offices => {
      console.log(offices);
      this.offices = offices;
    });
  }

}
