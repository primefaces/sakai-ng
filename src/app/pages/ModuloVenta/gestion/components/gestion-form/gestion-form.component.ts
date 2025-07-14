import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Gestion } from '../../models/gestion';
import { GestionService } from '../../services/gestion.service';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-gestion-form',
  templateUrl: './gestion-form.component.html',
  styleUrl: './gestion-form.component.scss',
  providers: [UtilsService]
})

export class GestionFormComponent implements OnInit {

  saving: boolean = false; // para saber si se esta guardando 

  constructor(
    public utils: UtilsService,
    private GestionService: GestionService
  ) {}

  @Input() visible: boolean = false;
  @Input() gestion!: Gestion;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void { }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveGestion() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.gestion
      }

      const req = this.gestion.id
        ? this.GestionService.updateGestion(Data.id, Data)
        : this.GestionService.createGestion(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.gestion.id;
          const msg = isUpdate ? 'La gestion ha sido modificado.' :
            `La gestion ${this.gestion.anio} ${this.gestion.nombre_campania} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.gestion = {} as Gestion;
        },
        error: () => {
          this.saving = false;
        },
        complete: () => {
          this.saving = false;
          this.closeDialog();
        }
    });
  }
}