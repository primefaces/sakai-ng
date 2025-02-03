import {TimeTable} from "../../../../../assets/models/dto/time-table";

export interface Command {
    execute(tableID?: string): Promise<TimeTable>;
}
