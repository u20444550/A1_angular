import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Course } from '../Models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  courseId: any|string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
    this.subscribeToCourseAdded();
    
  }

  getCourses(): void {
    this.dataService.GetCourses().subscribe((result: any[]) => {
      this.courses = result;
    });
  }

  deleteCourse(courseId: number): void {
    this.dataService.deleteCourse(courseId).subscribe(() => {
      this.getCourses(); // Update the courses list after deleting a course
    });
  }
  

  editItem(course: Course): void {
    this.router.navigateByUrl(`editcourse/${course.courseId}`);
  }

  private subscribeToCourseAdded(): void {
    this.dataService.courseAdded$.subscribe((newCourse: Course) => {
      // Update the courses array with the new course
      this.courses.push(newCourse);
    });
  }

  

}
