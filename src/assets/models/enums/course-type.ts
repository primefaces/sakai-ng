export enum CourseType {
  VO,
  VU,
  PS,
  SE,
  SL,
  PR
}

export function getCourseOptions() {
  return Object.keys(CourseType).filter(k => isNaN(Number(k)));
}
