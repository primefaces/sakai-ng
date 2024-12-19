import {CourseSession} from "./course-session";
import {Timing} from "./timing";
import {CourseType} from "./enums/course-type";

export class Course {
  id!: string;
  courseType?: CourseType;
  studyType?: string;
  name?: string;
  lecturer?: string;
  semester?: number;
  duration?: number;
  numberOfParticipants?: number;
  computersNecessary?: boolean;
  courseSessions?: CourseSession[];
  timingConstraints?: Timing[];
  numberOfGroups: number = 0;
  isSplit: boolean = false;
  splitTimes: number[] = [];
  createdAt?: Date;
  updatedAt?: Date;

  static getTableColumns(): any[] {
    return [
      {field: 'id', header: 'Id'},
      {field: 'courseType', header: 'Type'},
      {field: 'studyType', header: 'Degree'},
      {field: 'name', header: 'Name'},
      {field: 'lecturer', header: 'Lecturer'},
      {field: 'semester', header: 'Semester'},
      {field: 'duration', header: 'Duration'},
      {field: 'numberOfParticipants', header: '#Participants'},
      {field: 'computersNecessary', header: 'computer needed'},
      {field: 'createdAt', header: 'created at'},
      {field: 'updatedAt', header: 'updated at'}
    ]
  }
}
