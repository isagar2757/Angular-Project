import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Quote } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class QuoteService {
    constructor(private http: HttpClient) { }

    create(quote: Quote) {
        return this.http.post(`${environment.apiUrl}/quotes/`, quote);
    }

    getAll() {
        return this.http.get<Quote[]>(`${environment.apiUrl}/quotes`);
    }

    getByPatientId(id: number) {
        return this.http.get(`${environment.apiUrl}/quotes/patient/${id}`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/quotes/${id}`);
    }

    update(quote: Quote) {
        return this.http.put(`${environment.apiUrl}/quotes/${quote.id}`, quote);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/quotes/${id}`);
    }
}