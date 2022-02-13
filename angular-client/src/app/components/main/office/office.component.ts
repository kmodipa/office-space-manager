import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OfficeModel} from "../../../core/models/office-model";
import {OfficeHttpService} from "../../../services/http/office-service/office.service";

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  officeId: string;
  officeObject: OfficeModel;
  navLabel = "Office";
  offices: OfficeModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private officeHttpService: OfficeHttpService) {
    this.officeId = <string>this.activatedRoute.snapshot.paramMap.get('id');

    this.offices = Array<OfficeModel>();
    this.officeObject = {_id: "", address: "", capacity: 0, email: "", hexcolor: "", name: "", officeId: "", phone: ""}
  }

  ngOnInit(): void {
    console.log(this.officeObject, this.officeId);
    this.getOfficeFromHttpService();
  }

  getOfficeFromHttpService(): void {
    this.officeHttpService.GetById(this.officeId).subscribe(office => {
      console.log(office);
      this.officeObject = office;
      console.log(this.officeObject);
    });
  }
}
