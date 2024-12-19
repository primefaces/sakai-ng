export interface TableData {
  getTableColumns(): any[];

  getData(): any[];

  editItem(val: any): any;

  saveItem(val: any): any;

  uploadItemToBackend(val: any): void;

  deleteSingleItem(val: any): void;

  deleteMultipleItems(val: any[]): void;
  checkForFilledElements(): boolean;
}
