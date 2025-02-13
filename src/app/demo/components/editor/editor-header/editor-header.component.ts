import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomTable} from "../../../../../assets/models/room-table";

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
})
export class EditorHeaderComponent implements OnInit{
    @Input() currentRooms!: RoomTable[];
    @Output() changeRoom = new EventEmitter<RoomTable>();

    selectedRoom: RoomTable;
    constructor() {
    }

    triggerRoomChange(){
        this.changeRoom.emit(this.selectedRoom);
    }

    ngOnInit(): void {
        this.selectedRoom = this.currentRooms[0];
        this.triggerRoomChange();
    }
}
