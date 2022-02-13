import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNumeric} from "rxjs/internal-compatibility";
import {ActivatedRoute, Router} from "@angular/router";
import {OfficeModel} from "../../../core/models/office-model";
import {OfficeHttpService} from "../../../services/http/office-service/office.service";
import {OfficeWorkerHttpService} from "../../../services/http/office-worker-service/office-worker.service";
import {ToastrService} from "ngx-toastr";
import {ModalService} from "../../shared/_modal";

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss']
})
export class EditOfficeComponent implements OnInit {

  officeId: string;
  offices: OfficeModel[];
  officeWorkersCount = 0;
  officeObject: OfficeModel;
  navLabel = "Edit Office";
  listOfColorsToPickRow1 = [
    "#FEBE0B",
    "#FE9B71",
    "#FB5606",
    "#97512C",
    "#DBBADE",
    "#FD146E"
  ]
  listOfColorsToPickRow2 = [
    "#A9F0D1",
    "#12B401",
    "#489DDA",
    "#0B72E8",
    "#8338EC"
  ]

  newOfficeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private officeHttpService: OfficeHttpService,
              private officeWorkerHttpService: OfficeWorkerHttpService,
              private toastrService: ToastrService,
              public modalService: ModalService) {
    this.offices = Array<OfficeModel>();
    this.officeObject = <OfficeModel>{};
    this.officeId = <string>this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.officeId);
  }

  ngOnInit(): void {
    this.initiateForm();
    this.getOfficeFromHttpService();
    this.getOfficeWorkerFromHttpService();
  }

  /*- CRUD Methods -*/
  updateOffice(): void {
    this.markFormFieldsAsTouched();
    if (this.newOfficeForm.valid) {
      const office: OfficeModel = <OfficeModel>{
        _id: this.officeId,
        email: this.emailAddress.value,
        hexcolor: this.hexColor.value,
        capacity: this.maximumCapacity.value,
        name: this.officeName.value,
        phone: this.phoneNumber.value,
        address: this.physicalAddress.value
      };

      this.officeHttpService.Update(office).subscribe(office => {
        if (office) {
          this.toastrService.success( this.officeName.value + ' Updated');
        }
        console.log('pass');
      });
    }
    console.log('fail');
  }

  deleteOfficeFromHttpService(): void {
    if (this.officeId && this.officeWorkersCount === 0) {
      console.log(this.officeId);
      this.officeHttpService.Delete(this.officeId).subscribe( response => {
        console.log(response);
        if (response == 'Ok') {
          this.toastrService.success( this.officeName.value + ' Deleted');
          this.returnHome();
        }
      });
    } else {
      this.toastrService.error( this.officeName.value + ' office has occupants');
    }
  }

  getOfficeFromHttpService(): void {
    this.officeHttpService.GetById(this.officeId).subscribe(office => {
      console.log(office);
      this.officeObject = office;
      this.initiateForm();
    });
  }

  getOfficeWorkerFromHttpService(): void {
    this.officeWorkerHttpService.GetAll(this.officeId).subscribe( workers => {
      this.officeWorkersCount = workers.length;
      console.log(workers);
    });
  }

  /*-- Helper Methods --*/
  initiateForm(): void {
    this.newOfficeForm = this.formBuilder.group({
      officeName: [this.officeObject.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      physicalAddress: [this.officeObject.address, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      emailAddress: [this.officeObject.email, [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phoneNumber: [this.officeObject.phone, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      maximumCapacity: [+this.officeObject.capacity, [Validators.required, Validators.min(1)]],
      hexColor: [this.officeObject.hexcolor, [Validators.required]],
    });
  }

  selectOfficeFromList(): void {
    this.officeObject = this.offices.filter( office => office._id == this.officeId)[0];
    this.initiateForm();
    console.log(this.officeObject);
  }

  validateIfPhoneNumberIsNumeric(value: string): boolean {
    return isNumeric(value);
  }

  returnHome(): void {
    this.router.navigate(['all-offices']);
  }

  /* -Mark form as touched- */
  markFormFieldsAsTouched(): void {
    this.officeName.markAsTouched();
    this.physicalAddress.markAsTouched();
    this.emailAddress.markAsTouched();
    this.phoneNumber.markAsTouched();
    this.maximumCapacity.markAsTouched();
    this.hexColor.markAsTouched();
  }

  /* Form Getters */
  get officeName(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('officeName');
  }

  get physicalAddress(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('physicalAddress');
  }

  get emailAddress(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('emailAddress');
  }

  get phoneNumber(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('phoneNumber');
  }

  get maximumCapacity(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('maximumCapacity');
  }

  get hexColor(): AbstractControl {
    return <AbstractControl>this.newOfficeForm.get('hexColor');
  }

  /* --Modal-Methods-- */
  openDeleteOption(): void {
    this.modalService.open('delete-office-options');
  }
}
