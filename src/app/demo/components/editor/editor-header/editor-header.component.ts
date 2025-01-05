import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface DisplayRoom{
    id: number;
    roomId: string;
    capacity?: number;
}

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
})
export class EditorHeaderComponent implements OnInit{
    @Input() currentRooms!: DisplayRoom[];
    @Output() changeRoom = new EventEmitter<number>();

    selectedRoom: DisplayRoom;
    constructor() {
    }

    triggerRoomChange(){
        this.changeRoom.emit(this.selectedRoom.id);
    }

    ngOnInit(): void {
        this.selectedRoom = this.currentRooms[0];
    }
}
