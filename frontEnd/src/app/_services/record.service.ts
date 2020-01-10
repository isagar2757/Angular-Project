import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Record } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class RecordService {
    constructor(private http: HttpClient) { }

    create(record: Record) {
        return this.http.post(`${environment.apiUrl}/records/`, record);
    }

    getAll() {
        return this.http.get<Record[]>(`${environment.apiUrl}/records`);
    }

    getByPatientId(id: number) {
        return this.http.get<Record[]>(`${environment.apiUrl}/records/patient/${id}`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/records/${id}`);
    }

    update(record: Record) {
        return this.http.put(`${environment.apiUrl}/records/${record.id}`, record);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/records/${id}`);
    }
}