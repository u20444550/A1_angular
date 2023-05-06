import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './course/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddCourseComponent } from './addcourse/addcourse.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    NavbarComponent,
  

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule to imports
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: CoursesComponent
      },

      {
        path: 'courses',
        component: CoursesComponent
      },

      {
        path: 'addcourse',
        component: AddCourseComponent
      },

      {
        path: 'editcourse/:id',
        component: AddCourseComponent
      },

  

      // { path: '**', 
      // component: notFoundComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
