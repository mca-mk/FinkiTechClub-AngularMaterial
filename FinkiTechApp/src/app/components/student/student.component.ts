import { Component, OnInit, Inject } from '@angular/core';
import {
  MatTableDataSource,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  DataService,
  Student,
  GenderEnum,
  MajorEnum
} from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  MajorEnum = MajorEnum;
  GendeEnum = GenderEnum;
  working = false;
  student: Student;
  studentId: number;
  studentsLen: number;
  formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.working = true;

    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      if (this.studentId === 0) {
        this.dataService.getStudents().subscribe(students => {
          this.studentsLen = students.length;

          this.student = {
            name: '',
            gender: null,
            id: 0,
            major: null
          };
        });
      } else {
        this.dataService.getStudent(this.studentId).subscribe(student => {
          this.student = student;
          console.log(student);
        });
      }
      this.formGroup = this.formBuilder.group(
        {
          name: [this.student.name, Validators.required],
          major: [this.student.major, Validators.required],
          gender: [this.student.gender, Validators.required]
        });
        this.working = false;

    });
  }
  saveStudent() {
    this.student = {
      name: this.formGroup.controls.name.value,
      gender: this.formGroup.controls.gender.value,
      major: this.formGroup.controls.major.value,
      id: this.student.id
    };
    this.dataService.saveStudent(this.student);
    this.router.navigateByUrl('students');
  }

  removeStudent() {
    this.dataService.removeStudent(this.student);
    this.router.navigateByUrl('students');
  }
}
