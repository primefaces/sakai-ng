export enum Status {
  NEW = 'info',
  IN_WORK = 'warning',
  EDITED = 'warning',
  FINISHED = 'success',
  DEFAULT = 'danger',
  LOCAL = 'danger'
}

export function getStatusKey(value: string): string {
  for (const [key, enumValue] of Object.entries(Status)) {
    if (enumValue === value) {
      return key;
    }
  }
  return 'undefined';
}
