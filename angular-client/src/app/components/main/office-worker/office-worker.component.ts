import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfficeModel} from "../../../core/models/office-model";
import {ToastrService} from "ngx-toastr";
import {OfficeWorkerHttpService} from "../../../services/http/office-worker-service/office-worker.service";
import {OfficeWorkerModel} from "../../../core/models/office-worker-model";
import {ModalService} from "../../shared/_modal";

@Component({
  selector: 'app-office-worker',
  templateUrl: './office-worker.component.html',
  styleUrls: ['./office-worker.component.scss']
})
export class OfficeWorkerComponent implements OnInit {

  @Input() office!: OfficeModel;
  officeWorkers: OfficeWorkerModel[];
  officeWorkerForm!: FormGroup;
  newWorker = false;
  nextFormSectionToggle = false;
  deleteOfficeWorkerToggle = false;
  searchString = "";
  currentOfficeWorker!: OfficeWorkerModel;

  listOfAvatarsRow1 = [
    "../../../assets/icons/avatars-baloons.png",
    "../../../assets/icons/avatars-moon.png",
    "../../../assets/icons/avatars-saturn.png",
    "../../../assets/icons/avatars-baseball.png"
  ]
  listOfAvatarsRow2 = [
    "../../../assets/icons/avatars-rocket.png",
    "../../../assets/icons/avatars-superhero.png",
    "../../../assets/icons/avatars-peace.png"
  ]

  constructor(public modalService: ModalService,
              private  formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private officeWorkerHttpService: OfficeWorkerHttpService) {
    this.officeWorkers = Array<OfficeWorkerModel>();
  }

  ngOnInit(): void {
    this.getOfficeWorkerFromHttpService();
    this.initiateForm();
  }

  /* --CRUD-Methods-- */
  addNewOfficeWorker(): void {
    this.newWorker = false;
    this.markFormFieldsAsTouched();
    if (this.officeWorkerForm.valid) {
      if (this.officeWorkers.length >= this.office.capacity) {
        this.toastrService.error( this.office.name + ' office is full');
      } else {
        const officeWorker: OfficeWorkerModel = <OfficeWorkerModel>{
          avatarUrl: this.avatarUrl.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          officeId: this.office.officeId
        }

        this.officeWorkerHttpService.Update(officeWorker).subscribe( worker => {
          if (worker) {
            this.toastrService.success( this.firstName.value + ' added to ' + this.office.name + ' office');
            this.modalService.close('edit-office-worker-modal');
          }
        });
      }
    }
  }

  editOfficeWorker(): void {
    this.markFormFieldsAsTouched();
    if (this.officeWorkerForm.valid) {
      const workerModel: OfficeWorkerModel = <OfficeWorkerModel>{
        avatarUrl: this.avatarUrl.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        officeId: this.office.officeId
      }

      this.officeWorkerHttpService.Update(workerModel).subscribe( worker => {
        console.log(worker);
        if (worker) {
          this.toastrService.success( 'Staff Member updated');
          this.modalService.close('edit-office-worker-modal');
        }
      });
    }
  }

  getOfficeWorkerFromHttpService(): void {
    console.log(this.office);
    this.officeWorkerHttpService.GetAll(this.office._id).subscribe( workers => {
      this.officeWorkers = workers;
      console.log(workers);
    });
  }

  deleteOfficeWorkerFromHttpService(): void {
    const officeWorkerId = <string>this.currentOfficeWorker._id;
    this.officeWorkerHttpService.Delete(officeWorkerId).subscribe( response => {
      console.log(response);
      if (response) {
        this.toastrService.success( 'Staff Member removed');
        this.modalService.close('delete-office-worker-options');
      }
    });
  }

  /* --Helper Methods-- */
  initiateForm(): void {
    this.officeWorkerForm = this.formBuilder.group({
      avatarUrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  prefillForm(): void {
    this.officeWorkerForm = this.formBuilder.group({
      avatarUrl: [this.currentOfficeWorker.avatarUrl, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      firstName: [this.currentOfficeWorker.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [this.currentOfficeWorker.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  filterList(): void {
    if (this.searchString != "") {
      this.officeWorkers = this.officeWorkers.filter(member => {
        let result =  member.firstName?.toLocaleLowerCase().match(this.searchString.toLocaleLowerCase()) ||
          member.lastName?.toLocaleLowerCase().match(this.searchString.toLocaleLowerCase());
        return result;
      });
    } else {
      this.getOfficeWorkerFromHttpService();
    }
  }


  /* --Mark form as touched-- */
  markFormFieldsAsTouched(): void {
    this.avatarUrl.markAsTouched();
    this.firstName.markAsTouched();
    this.lastName.markAsTouched();
  }

  /* --Form-Getters-- */
  get avatarUrl(): AbstractControl {
    return <AbstractControl>this.officeWorkerForm.get('avatarUrl');
  }

  get firstName(): AbstractControl {
    return <AbstractControl>this.officeWorkerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return <AbstractControl>this.officeWorkerForm.get('lastName');
  }

  get id(): AbstractControl {
    return <AbstractControl>this.officeWorkerForm.get('id');
  }

  /* --Modal-Methods-- */
  openEditOfficeWorkerModal(newMember: boolean): void {

    this.newWorker = newMember;
    this.nextFormSectionToggle = false;
    if (newMember) {
      this.initiateForm();
    } else {
      this.prefillForm();
      this.modalService.close('office-worker-options');
    }
    this.modalService.open('edit-office-worker-modal');
  }

  openDeleteOfficeWorkerModal(): void {
    this.deleteOfficeWorkerToggle =true;
    this.modalService.close('office-worker-options');
    this.modalService.open('delete-office-worker-options');
  }

  openOfficeWorkerOptions(officeWorker: OfficeWorkerModel): void {
    this.currentOfficeWorker = officeWorker;
    this.modalService.open('office-worker-options')
  }

  back(): void {
    this.nextFormSectionToggle = false;
    if (this.deleteOfficeWorkerToggle) {
      this.modalService.close('delete-office-worker-options');
      this.modalService.open('office-worker-options');
    }
    this.deleteOfficeWorkerToggle = false;
  }

  next(): void {
    this.nextFormSectionToggle = true;
  }

}
