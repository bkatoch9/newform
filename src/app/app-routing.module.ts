import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppDashComponent } from './app-dash/app-dash.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppUsersComponent } from './app-users/app-users.component';
import { UsersComponent } from './users/users.component';
import { AppUploadComponent } from './app-upload/app-upload.component';
import { AppBrowseComponent, AppBrowsedComponent } from './app-browse/app-browse.component';
import { NewUserComponent } from './new-user/new-user.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { FormTableComponent } from './form-table/form-table.component';

const routes: Routes = [
  { path: 'app-nav', component: AppNavComponent},
  { path: 'app-dash', component: AppDashComponent},
  { path: 'app-users', component: AppUsersComponent},
  { path: 'users', component: UsersComponent},
  { path: 'app-upload', component: AppUploadComponent},
  { path: 'app-browse', component: AppBrowseComponent},
  { path: 'app-browsed', component: AppBrowsedComponent},
  { path: 'app-new-user', component: NewUserComponent},
  { path: 'app-table', component: TableComponent},
  { path: 'app-form', component: FormComponent},
  { path: 'app-form-table', component: FormTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=
[
  AppNavComponent,
  AppDashComponent,
  AppUsersComponent,
  UsersComponent,
  AppUploadComponent,
  AppBrowseComponent,
  AppBrowsedComponent,
  NewUserComponent,
  TableComponent,
  FormComponent,
  FormTableComponent
]