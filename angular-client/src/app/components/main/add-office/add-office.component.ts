import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNumeric} from "rxjs/internal-compatibility";
import {OfficeModel} from "../../../core/models/office-model";
import {Router} from "@angular/router";
import {OfficeHttpService} from "../../../services/http/office-service/office.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.scss']
})
export class AddOfficeComponent implements OnInit {

  navLabel = "New Office";
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
              private router: Router,
              private toastrService: ToastrService,
              private officeHttpService: OfficeHttpService) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  /*- CRUD Methods -*/
  addNewOffice(): void {
    this.markFormFieldsAsTouched();
    if (this.newOfficeForm.valid) {
      console.log('pass');
      const office: OfficeModel = <OfficeModel>{
        email: this.emailAddress.value,
        hexcolor: this.hexColor.value,
        capacity: this.maximumCapacity.value,
        name: this.officeName.value,
        phone: this.phoneNumber.value,
        address: this.physicalAddress.value
      };

      this.officeHttpService.Upsert(office).subscribe( office => {
        if (office) {
          console.log(office);
          this.toastrService.success( this.officeName.value + ' Added');
          this.returnHome();
        }
      });

    } else {
      this.toastrService.error( this.officeName.value + ' failed to be added');
    }
  }

  /*-- Helper Methods --*/
  initiateForm(): void {
    this.newOfficeForm = this.formBuilder.group({
      officeName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      physicalAddress: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      emailAddress: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      maximumCapacity: ['', [Validators.required, Validators.min(1)]],
      hexColor: ['', [Validators.required]],
    });
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

}
