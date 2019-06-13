import { Component, OnInit } from '@angular/core';
import CourseInterface from '../models/course.model';
import { CoursesService } from '../courses.service';
import AuthService from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: CourseInterface[] = [];

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getLoggedUser().role === "admin";
    }
  }

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((courses) => {
      console.log(courses);
      this.courses = courses;
    });
  }

  onCourseDeleted(id: string): void {
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(t => t.id !== id);
    });
  }

  onCourseAdd(): void {
    this.router.navigateByUrl('courses/add-course');
  }

}
