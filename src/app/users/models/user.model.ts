import CourseInterface from 'src/app/courses/models/course.model';

export default interface UserInterface {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    isBlocked: boolean;
    joinedCourses: CourseInterface[];
}
