import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { routes } from './routes';
import { CourseCardComponent } from './course-card/course-card.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
    declarations: [CoursesComponent, CoursesListComponent, CourseCardComponent, AddCourseComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CoursesModule { }