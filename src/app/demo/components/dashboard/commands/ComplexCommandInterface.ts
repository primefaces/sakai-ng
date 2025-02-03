
export interface ComplexCommand {
    execute(tableID?: string): Promise<void>;
    showDialog(data: any): void;
}
