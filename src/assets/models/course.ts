import {CourseType} from "./enums/course-type";

export class Course{
  id!: number;
  courseType?: CourseType;
  studyType?: string;
  name?: string;
  lecturer?: string;
  semester?: number;
  duration?: number;
  numberOfParticipants?: number;
  computersNecessary?: boolean;

  static getTableColumns(): any[] {
    return [
      {field: 'id', header: 'Id'},
      {field: 'courseType', header: 'Type'},
      {field: 'studyType', header: 'Degree'},
      {field: 'name', header: 'Name'},
      {field: 'lecturer', header: 'Lecturer'},
      {field: 'semester', header: 'Semester'},
      {field: 'duration', header: 'Duration'},
      {field: 'numberOfParticipants', header: 'Nr of Participants'},
      {field: 'computersNecessary', header: 'computer needed'}
    ]
  }

  static getFilterFields(): string[]{
      return ['id', 'name', 'lecturer'];
  }
}
