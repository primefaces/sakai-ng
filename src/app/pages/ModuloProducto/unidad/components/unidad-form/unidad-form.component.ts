
import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { Unidad } from '../../models/unidad';
import { UtilsService } from '../../../../../../shared/utils.service';
import { UnidadService } from '../../services/unidad.service';

@Component({
  standalone: false,
  selector: 'app-unidad-form',
  templateUrl: './unidad-form.component.html',
  styleUrls: ['./unidad-form.component.scss'],
  providers: [UtilsService]
})

export class UnidadFormComponent {

  saving: boolean = false; // para saber si se esta guardando

  constructor(
    public utils: UtilsService,
    private UnidadService: UnidadService
  ) {}

  @Input() visible: boolean = false;
  @Input() unidad!: Unidad;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveUnidad() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.unidad
      }

      const req = this.unidad.id
        ? this.UnidadService.updateUnidad(Data.id, Data)
        : this.UnidadService.createUnidad(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.unidad.id;
          const msg = isUpdate ? 'La categoria ha sido modificada.' :
            `La categoria ${this.unidad.nombre} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.unidad = {} as Unidad;
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
