import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export class Student {
  id: number;
  name: string;
  major: MajorEnum;
  gender: GenderEnum;
}

export enum GenderEnum {
  Male = 'male',
  Female = 'female'
}

export enum MajorEnum {
  KNI = 'Kompjuterski nauki i inzenerstvo',
  PET = 'Primena na E-Tehnologii',
  MT = 'Mrezni Tehnologii',
}


const STUDENTS: Student[] = [
  {
    id: 1,
    major: MajorEnum.PET,
    name: 'Filip',
    gender: GenderEnum.Male
  },
  {
    id: 2,
    major: MajorEnum.KNI,
    name: 'Dimitar',
    gender: GenderEnum.Male
  },
  {
    id: 3,
    major: MajorEnum.MT,
    name: 'Mario',
    gender: GenderEnum.Male
  },
  {
    id: 4,
    major: MajorEnum.KNI,
    name: 'Maria',
    gender: GenderEnum.Female
  },
  {
    id: 5,
    major: MajorEnum.PET,
    name: 'Aleksandra',
    gender: GenderEnum.Female

  },
  {
    id: 6,
    major: MajorEnum.PET,
    name: 'Stefani',
    gender: GenderEnum.Female
  },
  {
    id: 7,
    major: MajorEnum.KNI,
    name: 'Ace',
    gender: GenderEnum.Male
  },
];

@Injectable()
export class DataService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS);
  }

  getStudent(id: number): Observable<Student> {
    return of(STUDENTS.filter(x => x.id === id)[0]);
  }

  saveStudent(student: Student) {
    if (student.id === 0) {
      STUDENTS.push({
        gender: student.gender,
        id: STUDENTS.length + 1,
        major: student.major,
        name: student.name
      });
    } else {
      STUDENTS.filter(x => x.id === student.id)[0] = student;
    }
  }

  removeStudent(student: Student) {
    STUDENTS.splice(STUDENTS.findIndex(x => x === student), 1);
  }
}

