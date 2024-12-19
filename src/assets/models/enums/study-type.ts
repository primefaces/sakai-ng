export enum StudyType {
  BACHELOR_CS,
  MASTER_CS,
  MASTER_SWE
}

export function getDegreeOptions(){
  return Object.keys(StudyType).filter(k => isNaN(Number(k)));
}
