import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    http = inject(HttpClient);

    url = 'http://localhost:5000/api';

    getServiceTypes() {
        return this.http.get(`${this.url}/service-types`);
    }

    getSeviceType(id: number) {
        return this.http.get(`${this.url}/service-types/${id}`);
    }

    createServiceType(serviceType: any) {
        return this.http.post(`${this.url}/service-types`, serviceType);
    }

    updateServiceType(serviceType: any) {
        return this.http.patch(`${this.url}/service-types/${serviceType._id}`, serviceType);
    }

    deleteServiceType(id: string) {
        return this.http.delete(`${this.url}/service-types/${id}`);
    }

    getClients() {
        return this.http.get(`${this.url}/clients`);
    }

    getClient(id: string) {
        return this.http.get(`${this.url}/clients/${id}`);
    }

    createClient(client: any) {
        return this.http.post(`${this.url}/clients`, client);
    }

    updateClient(client: any) {
        return this.http.patch(`${this.url}/clients/${client._id}`, client);
    }

    deleteClient(id: string) {
        return this.http.delete(`${this.url}/clients/${id}`);
    }

    getSales(dateRange: any) {
        const [start, end] = dateRange;

        const params = new HttpParams().set('start', start).set('end', end);
        return this.http.get(`${this.url}/sales`, { params });
    }

    getSale(id: string) {
        return this.http.get(`${this.url}/sales/${id}`);
    }

    createSale(sale: any) {
        sale.date = new Date(sale.date).setHours(0, 0, 0, 0);

        if (sale._id) {
            return this.http.patch(`${this.url}/sales/${sale._id}`, sale);
        }
        return this.http.post(`${this.url}/sales`, sale);
    }

    updateSale(sale: any) {
        return this.http.patch(`${this.url}/sales/${sale._id}`, sale);
    }

    deleteSale(id: string) {
        return this.http.delete(`${this.url}/sales/${id}`);
    }

    getSuppliers(params: any) {
        return this.http.get(`${this.url}/suppliers`, { params });
    }

    getSupplier(id: string) {
        return this.http.get(`${this.url}/suppliers/${id}`);
    }

    createSupplier(supplier: any) {
        return this.http.post(`${this.url}/suppliers`, supplier);
    }

    updateSupplier(supplier: any) {
        return this.http.patch(`${this.url}/suppliers/${supplier._id}`, supplier);
    }

    deleteSupplier(id: string) {
        return this.http.delete(`${this.url}/suppliers/${id}`);
    }

    getExpenses(params: any) {
        return this.http.get(`${this.url}/expenses`, { params });
    }

    getExpense(id: string) {
        return this.http.get(`${this.url}/expenses/${id}`);
    }

    createExpense(expense: any) {
        if (expense._id) {
            return this.http.patch(`${this.url}/expenses/${expense._id}`, expense);
        }
        return this.http.post(`${this.url}/expenses`, expense);
    }

    updateExpense(expense: any) {
        return this.http.patch(`${this.url}/expenses/${expense._id}`, expense);
    }

    deleteExpense(id: string) {
        return this.http.delete(`${this.url}/expenses/${id}`);
    }

    getEmployees() {
        return this.http.get(`${this.url}/employees`);
    }

    getEmployee(id: string) {
        return this.http.get(`${this.url}/employees/${id}`);
    }

    createEmployee(employee: any) {
        return this.http.post(`${this.url}/employees`, employee);
    }

    updateEmployee(employee: any) {
        return this.http.patch(`${this.url}/employees/${employee._id}`, employee);
    }

    deleteEmployee(id: string) {
        return this.http.delete(`${this.url}/employees/${id}`);
    }
}
