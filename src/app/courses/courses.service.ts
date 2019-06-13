import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import CourseInterface from './models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient) { }

    addCourse(course: CourseInterface): Observable<any> {
        if (course.id) {
            return this.http.put(`http://localhost:3000/courses/${course.id}`, course)
        }
        return this.http.post('http://localhost:3000/courses', course)
    }

    public getAllCourses(): Observable<CourseInterface[]> {
        return this.http.get<CourseInterface[]>('http://localhost:3000/courses');
    }

    public getById(id: string): Observable<CourseInterface> {
        return this.http.get<CourseInterface>(`http://localhost:3000/courses/${id}`);
    }

    public assignCourse(course: CourseInterface): Observable<any> {
        return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
    }

    public deleteCourse(id: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/courses/${id}`);
    }
}
