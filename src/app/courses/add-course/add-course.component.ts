import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import CourseInterface from '../models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  constructor(private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute) {

    this.route.params.subscribe((params) => {
      console.log(params);

      if (params.id) {
        this.coursesService.getById(params.id)
          .subscribe((course) => {
            this.createForm();

            this.courseForm.patchValue({ ...course });
            // this.userForm.name = user.name;
            // this.userForm.password = user.paswwrod;
          });
      }
    });
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.courseForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['']
    });
  }

  onFormSubmit(event): void {
    const newCourse = { ...this.courseForm.value } as CourseInterface;
    this.coursesService.addCourse(newCourse)
      .subscribe(() => {
        console.log('Course CREATED');
        this.router.navigateByUrl('courses/list');
      })
  }

  get isFormValid(): boolean {
    return this.courseForm.valid;
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get creationDate() {
    return this.courseForm.get('creationDate');
  }

}
