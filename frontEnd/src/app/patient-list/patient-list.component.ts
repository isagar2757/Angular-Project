import { Component, OnInit } from '@angular/core';
import { User } from "@app/_models";
import { Subscription } from "rxjs";
import { AuthenticationService, UserService, QuoteService } from "@app/_services";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  currentUser: User;
  currentPatient: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  quoteForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private quoteService: QuoteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllPatients();
    this.quoteForm = this.formBuilder.group({
      userId: ['', Validators.required],
      username: ['', Validators.required],
      quote: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllPatients()
    });
  }

  getUserDetails(id: number) {
    this.router.navigate([`/patient/${id}`]);
    // this.userService.delete(id).pipe(first()).subscribe(() => {
    //   this.loadAllPatients()
    // });
  }

  private loadAllPatients() {
    this.userService.getAllPatients().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  setCurrentPatient(user: User) {
    this.currentPatient = user;
    this.quoteForm.controls.userId.patchValue(user.id);
    this.quoteForm.controls.username.patchValue(user.username);
  }

  sendQuote() {
    this.quoteService.create(this.quoteForm.value).subscribe(res => res)
  }

}
