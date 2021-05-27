import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '@app/_models';

// array in local storage for registered employees
const employeesKey = 'angular-11-crud-firebase-employees';
const employeesJSON = localStorage.getItem(employeesKey);
let employees: any[] = employeesJSON ? JSON.parse(employeesJSON) : [{
    id: 1,
    title: 'Mr',
    firstName: 'Vijesh',
    lastName: 'Madhavan',
    email: 'vijesh.madhavan@gmail.com',
    address:'test address',
    role: Role.Supervisor,
    password: 'test123'
}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/employees') && method === 'GET':
                    return getEmployees();
                case url.match(/\/employees\/\d+$/) && method === 'GET':
                    return getEmplyeeById();
                case url.endsWith('/employees') && method === 'POST':
                    return createEmployee();
                case url.match(/\/employees\/\d+$/) && method === 'PUT':
                    return updateEmployee();
                case url.match(/\/employees\/\d+$/) && method === 'DELETE':
                    return deleteEmployee();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function getEmployees() {
            return ok(employees.map(x => basicDetails(x)));
        }

        function getEmplyeeById() {
            const employee = employees.find(x => x.id === idFromUrl());
            return ok(basicDetails(employee));
        }

        function createEmployee() {
            const employee = body;

            if (employees.find(x => x.email === employee.email)) {
                return error(`Employee with the email ${employee.email} already exists`);
            }

            // assign employee id and a few other properties then save
            employee.id = newEmployeeId();
            delete employee.confirmPassword;
            employees.push(employee);
            localStorage.setItem(employeesKey, JSON.stringify(employees));

            return ok();
        }

        function updateEmployee() {
            let params = body;
            let employee = employees.find(x => x.id === idFromUrl());

            if (params.email !== employee.email && employees.find(x => x.email === params.email)) {
                return error(`Employee with the email ${params.email} already exists`);
            }

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save employee
            Object.assign(employee, params);
            localStorage.setItem(employeesKey, JSON.stringify(employees));

            return ok();
        }

        function deleteEmployee() {
            employees = employees.filter(x => x.id !== idFromUrl());
            localStorage.setItem(employeesKey, JSON.stringify(employees));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: any) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); 
        }

        function basicDetails(employee: any) {
            const { id, title, firstName, lastName, email, role, address } = employee;
            return { id, title, firstName, lastName, email, role, address };
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newEmployeeId() {
            return employees.length ? Math.max(...employees.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};