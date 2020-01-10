import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Notification } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private http: HttpClient) { }

    create(notification: Notification) {
        return this.http.post(`${environment.apiUrl}/notifications/`, notification);
    }

    getAll() {
        return this.http.get<Notification[]>(`${environment.apiUrl}/notifications`);
    }

    getByPatientId(id: number) {
        return this.http.get<Notification[]>(`${environment.apiUrl}/notifications/patient/${id}`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/notifications/${id}`);
    }

    update(notification: Notification) {
        return this.http.put(`${environment.apiUrl}/notifications/${notification.id}`, notification);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/notifications/${id}`);
    }
}