import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../Models/course';
import { FormGroup, FormBuilder, Validators, FormGroupName } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  Course: Course = {
    courseId: 0,
    name: '',
    duration: '',
    description: ''
  };

  selectedCourse: Course ={
    courseId: this.Course.courseId,
    name : this.Course.name,
    duration : this.Course.duration,
    description : this.Course.description
  };

  editForm!: FormGroup;
 


  
  isLoading = false;
  constructor(private route: ActivatedRoute, private DataService: DataService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];
    this.setForm(courseId);
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;

    const updatedCourse: Course = {
      courseId: this.editForm.value.courseId,
      name: this.editForm.value.firstName,
      description: this.editForm.value.description,
      duration: this.editForm.value.duration
    };

    this.DataService.updateCourse(updatedCourse).subscribe(x => {
      this.isLoading = false;
      this.router.navigateByUrl("courses");
    },
    error => {
      this.isLoading = false;
    });
  }

  
  get editFormData() { return this.editForm.controls; }

  private setForm(courseId:number){
    if (courseId) {
      this.DataService.getCoursebyId(courseId).subscribe(x => {
        this.selectedCourse = x
        this.editForm = this.formBuilder.group({
          courseId: [this.selectedCourse.courseId],
          firstName : [this.selectedCourse.name, Validators.required],
          description : [this.selectedCourse.description, Validators.required],
          duration : [this.selectedCourse.duration, Validators.required]
        });
      });
    }
  }
  
}