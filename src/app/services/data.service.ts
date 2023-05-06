import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Course } from '../Models/course';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private courseAddedSource = new Subject<Course>();
  courseAdded$ = this.courseAddedSource.asObservable();

    Course: Course = {
    courseId: 0,
    name: '',
    duration: '',
    description: '',
    }



  apiUrl = 'http://localhost:5116/api/'

 

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  courseDeleted$: any;

  constructor(private httpClient: HttpClient) { 
  }

  GetCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
    
  }

  deleteCourse(courseId: number): Observable<any> {
    const url = `${this.apiUrl}Course/${courseId}`;
    return this.httpClient.delete(url, this.httpOptions)
      .pipe(map(result => result));
  }

  addCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.apiUrl}Course/`, course, this.httpOptions)
      .pipe(
        tap((newCourse: Course) => this.courseAddedSource.next(newCourse))
      );
  }
  
  

  updateCourse(course: Course): Observable<any> {
    const url = `${this.apiUrl}Course/${course.courseId}`;
    return this.httpClient.put(url, course, this.httpOptions)
      .pipe(map(result => result));
  }
  
  


 

  getCoursebyId(courseId: number): Observable<Course> {
    const url = `${this.apiUrl}Course/${courseId}`;
    return this.httpClient.get<Course>(url, this.httpOptions)
      .pipe(map(result => result));
  }
  


}


