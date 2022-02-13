import {Component, Input, OnInit} from '@angular/core';
import {OfficeModel} from "../../../core/models/office-model";
import {ActivatedRoute, Router} from "@angular/router";
import {OfficeWorkerHttpService} from "../../../services/http/office-worker-service/office-worker.service";

@Component({
  selector: 'app-office-accordion',
  templateUrl: './office-accordion.component.html',
  styleUrls: ['./office-accordion.component.scss']
})
export class OfficeAccordionComponent implements OnInit {

  @Input() office!: OfficeModel;
  @Input() index!: number;
  staffMembersCount = 0;
  staffMemberCountString?: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private officeWorkerHttpService: OfficeWorkerHttpService) { }

  ngOnInit(): void {
    console.log(this.office, this.index);
    this.getOfficeWorkersFromHttpService();
  }

  openOffice(office: OfficeModel): void {
    console.log(office);
    if (this.activatedRoute.snapshot.url[0].path !== 'office') {
      this.router.navigate(['office', office.officeId]);
    }
  }

  openEditOffice(office: OfficeModel): void {
    this.router.navigate(['edit-office', office.officeId]);
  }

  getOfficeWorkersFromHttpService(): void {
    this.officeWorkerHttpService.GetAll(this.office._id).subscribe(officeWorker => {
      this.staffMembersCount = officeWorker.filter(worker => worker.officeId === this.office.officeId).length;
      this.buildStaffMemberCountString();
    });
  }

  buildStaffMemberCountString(): void {
    if (this.staffMembersCount > 1) {
      this.staffMemberCountString = this.staffMembersCount + " Staff Members in Office";
    } else if (this.staffMembersCount === 1) {
      this.staffMemberCountString = "1 Staff Member in Office"
    } else if (this.staffMembersCount === 0) {
      this.staffMemberCountString = "Office has no Staff Members"
    }
  }

  trimHexColorCode(hexcolor: string): string {
    return hexcolor.slice(1);
  }
}
