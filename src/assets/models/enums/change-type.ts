export enum ChangeType {
  CREATE_TABLE,
  ASSIGN_COURSE,
  MOVE_COURSE,
  FIX_COURSE,
  UNASSIGN_COURSE,
  ADD_ROOM,
  REMOVE_ROOM,
  ADD_COURSE,
  REMOVE_COURSE,
  APPLY_ALGORITHM,
  CLEAR_TABLE
}


export function getChangeTypes() {
  return Object.keys(ChangeType).filter(k => isNaN(Number(k)));
}
