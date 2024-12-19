export enum CollisionType {
  COURSE_TIMING_CONSTRAINTS,
  SEMESTER_INTERSECTION,
  ROOM_COMPUTERS,
  ROOM_CAPACITY,
}


export function getCollisionTypes() {
  return Object.keys(CollisionType).filter(k => isNaN(Number(k)));
}
