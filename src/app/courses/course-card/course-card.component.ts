import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CourseInterface from '../models/course.model';
import { CoursesService } from '../courses.service';
import AuthService from '../../auth/auth.service';
import { Router } from '@angular/router';
import UsersService from 'src/app/users/users.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseInterface;
  @Output() onDelete = new EventEmitter();

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isAssigned: boolean = false;

  constructor(private coursesService: CoursesService,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getLoggedUser().role === "admin";
      this.userService.getById(this.authService.getLoggedUser().id).subscribe((user) => {
        var userCourses = user.joinedCourses;
        userCourses.forEach(c => {
          if (c.id === this.course.id) {
            this.isAssigned = true;
          }
        })
      });
    }
  }

  ngOnInit() {
  }

  onAssignClick() {
    //   window.location.reload();
    this.userService.getById(this.authService.getLoggedUser().id).subscribe((user) => {
      var loggedUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        isBlocked: user.isBlocked,
        joinedCourses: user.joinedCourses
      };
      if (loggedUser.joinedCourses.filter(c => c.id === this.course.id).length === 0) {
        loggedUser.joinedCourses.push(this.course);
        this.isAssigned = true;
        this.userService.addNewUser(loggedUser)
          .subscribe(() => {
            console.log('USER UPDATED');
          })
      } else {
        loggedUser.joinedCourses = loggedUser.joinedCourses.filter(c => c.id != this.course.id);
        this.isAssigned = false;
        this.userService.addNewUser(loggedUser)
          .subscribe(() => {
            console.log('USER UPDATED');
          })
      }
    });
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.course.id);
  }

  onEditClick(): void {
    this.router.navigate(['courses/add-course', this.course.id]);
  }

  rateUp(): void {
    var courseRated = this.course;
    courseRated.rating++;
    this.coursesService.addCourse(courseRated).subscribe(() => {
      console.log('COURSE RATING UPDATED');
    });
  }

  rateDown(): void {
    var courseRated = this.course;
    if (courseRated.rating > 0) {
      courseRated.rating--;
      this.coursesService.addCourse(courseRated).subscribe(() => {
        console.log('COURSE RATING UPDATED');
      });
    }
  }

  // get canAssign(): boolean {
  //   const user = this.authService.getLoggedUser();

  //   if (!user)
  //     return false;

  //   const userId = user.id;

  //   return this.course.assignees.findIndex(u => u.id === userId) === -1;
  // }

}
