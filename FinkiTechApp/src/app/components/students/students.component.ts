import { Component, OnInit } from '@angular/core';
import { Student, DataService, GenderEnum } from 'src/app/services/data.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor( private dataService: DataService, private snackbar: MatSnackBar, private router: Router) { }
  females = new MatTableDataSource<Student>([]);
  males = new MatTableDataSource<Student>([]);
  working = false;

  ngOnInit() {
    this.working = true;
    this.dataService.getStudents().subscribe(
      students => {
        this.females.data = students.filter(x => x.gender === GenderEnum.Female);
        this.males.data = students.filter(x => x.gender === GenderEnum.Male);
        this.working = false;
      },
      error => {
        this.snackbar.open('There was an error');
      }
    );

  }

  toStudentsdetails(id: number) {
    this.router.navigateByUrl(`students/${id}`);
  }

}
