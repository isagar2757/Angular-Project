import { Component, OnInit } from '@angular/core';
import { User } from "@app/_models";
import { Subscription } from "rxjs";
import { AuthenticationService, UserService } from "@app/_services";
import { first } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Record } from "@app/_models";
import { RecordService } from "@app/_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  currentPatient;
  patientRecords: Record[] = [];
  recordForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private recordService: RecordService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.getPatientInfo(params['id']);
        this.loadPatientRecords(params['id']);
      }
    })
    this.recordForm = this.formBuilder.group({
      userId: ['', Validators.required],
      username: ['', Validators.required],
      pulseRate: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      temprature: ['', Validators.required],
      weight: ['', [Validators.required]],
      comments: ['', Validators.required],
    });
  }

  getPatientInfo(id) {
    this.userService.getById(id)
      .subscribe(data => {
        this.currentPatient = data;
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.recordForm.controls; }

  createRecord() {
    this.recordForm.controls.userId.patchValue(this.currentPatient.id)
    this.recordForm.controls.username.patchValue(this.currentPatient.username)
    debugger
    if (this.recordForm.invalid) {
      return;
    }

    this.recordService.create(this.recordForm.value)
      .pipe(first())
      .subscribe(
      data => {
        this.recordForm.reset();
        this.loadPatientRecords(this.currentPatient.id);
        // this.alertService.success('Registration successful', true);
        // this.router.navigate(['/login']);
      },
      error => {
        // this.alertService.error(error);
        // this.loading = false;
      });
  }
  //   id: number;
  // userId: string;
  // username: string;
  // pulseRate: string;
  // bloodPressure: string;
  // temprature: string;
  // weight: string;
  // comments: string;

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteRecord(id: number) {
    this.recordService.delete(id).pipe(first()).subscribe(() => {
      this.loadPatientRecords(id)
    });
  }

  private loadPatientRecords(id: number) {
    this.recordService.getByPatientId(id).pipe(first()).subscribe(records => {
      this.patientRecords = records;
    });
  }

}
