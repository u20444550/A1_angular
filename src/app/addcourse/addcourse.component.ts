import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Course } from '../Models/course';
// import { RouterLink } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './addcourse.component.html',
})
export class AddCourseComponent {
  newCourse: Course = {
    courseId: 0,
    name: '',
    duration: '',
    description: ''
  };

  constructor(private DataService: DataService, private router: Router) {}

  addCourse() {

    this.DataService.addCourse(this.newCourse)
      .subscribe((response: any) => {
        console.log(response);
        
        // Reset the form
        this.newCourse = {
          courseId: 0,
          name: '',
          duration: '',
          description: '',

          
        };
      });
      this.router.navigateByUrl('courses')
      
      this.DataService.GetCourses;
  }
}

