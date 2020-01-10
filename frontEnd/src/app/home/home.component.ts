import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Quote, Notification } from '@app/_models';
import { UserService, AuthenticationService, QuoteService, NotificationService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser;
    currentUserSubscription: Subscription;
    // users: User[] = [];
    quote;
    notifications: Notification[];
    notificationForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private quoteService: QuoteService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (user.role === 'patient') {
                this.getQuote(user._id);
                this.getSelfNotifications(user._id);
            } else {
                this.getNotifications();
            }
        });
    }

    ngOnInit() {
        this.notificationForm = this.formBuilder.group({
            userId: ['', Validators.required],
            username: ['', Validators.required],
            tel: ['', Validators.required],
            alert: ['', Validators.required],
            resolved: [false, Validators.required]
        });
    }

    getQuote(id) {
        this.quoteService.getByPatientId(id).subscribe(quote => {
            this.quote = quote;
            // quotes = quotes.toArray();
            // if (quotes && quotes.length) {
            //     this.quote = quotes[quotes.length - 1]
            // }
        });
    }

    getSelfNotifications(id) {
        this.notificationService.getByPatientId(id).subscribe(notifications => this.notifications = notifications);
    }

    getNotifications() {
        this.notificationService.getAll().subscribe(notifications => this.notifications = notifications);
    }

    sendNotification() {
        this.notificationForm.controls.userId.patchValue(this.currentUser._id);
        this.notificationForm.controls.username.patchValue(this.currentUser.username);
        this.notificationForm.controls.tel.patchValue(this.currentUser.tel);
        this.notificationService.create(this.notificationForm.value)
            .subscribe(notification => notification);
    }

    resolveAlert(notification, resolved) {
        notification.resolved = resolved;
        this.notificationService.update(notification).subscribe(res => res);
    }

    hasUnresolvedAlerts() {
        let resolved = true;
        const notif = this.notifications;
        if (this.notifications) {
            this.notifications.forEach(element => {
                if (element.resolved === false) {
                    resolved = false;
                }
            });
        }
        return resolved;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => {
    //         this.loadAllPatients()
    //     });
    // }

    // private loadAllPatients() {
    //     this.userService.getAllPatients().pipe(first()).subscribe(users => {
    //         this.users = users;
    //     });
    // }
}
