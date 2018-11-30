import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service';
import { MaterialModule } from './modules/material.module';
import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes  = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'students/:id',
        component: StudentComponent
      }
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule,
    ReactiveFormsModule
 ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
