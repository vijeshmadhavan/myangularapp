import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'employees', loadChildren: employeesModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }