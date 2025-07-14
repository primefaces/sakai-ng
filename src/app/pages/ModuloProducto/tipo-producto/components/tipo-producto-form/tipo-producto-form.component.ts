import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { TipoProducto } from '../../models/TipoProducto';
import { UtilsService } from '../../../../../../shared/utils.service';
import { TipoProductoService } from '../../services/tipo-producto.service';

@Component({
  standalone: false,
  selector: 'app-tipo-producto-form',
  templateUrl: './tipo-producto-form.component.html',
  styleUrl: './tipo-producto-form.component.scss',
  providers: [UtilsService]
})

export class TipoProductoFormComponent {

  saving: boolean = false; // para saber si se esta guardando el tipo de producto
  constructor(
    public utils: UtilsService,
    private TipoProductoService: TipoProductoService
  ) {}

  @Input() visible: boolean = false;
  @Input() TipoProducto!: TipoProducto;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveTipoProducto() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;

      const Data = {
        ...this.TipoProducto
      }
      const req = this.TipoProducto.id
        ? this.TipoProductoService.updateTipoProducto(Data.id, Data)
        : this.TipoProductoService.createTipoProducto(Data);

      req.subscribe({
        next: () => {
          const isUpdate = !!this.TipoProducto.id;
          const msg = isUpdate ? 'El tipo producto ha sido modificada.' :
            `El tipo producto ${this.TipoProducto.nombre} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.TipoProducto = {} as TipoProducto;
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