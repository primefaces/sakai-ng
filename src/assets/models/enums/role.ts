export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export function getRoleOptions() {
  return Object.keys(Role).filter(k => isNaN(Number(k)));
}
