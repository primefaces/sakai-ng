import { Component, OnInit ,Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { NotaDevolucion } from '../../models/notadevolucion';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { DetalleNotaDevolucion } from '../../models/detalledevolucion';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { NotaDevolucionService } from '../../services/nota-devolucion.service';

@Component({
  standalone: false,
  selector: 'app-nota-devolucion-detalle',
  templateUrl: './nota-devolucion-detalle.component.html',
  styleUrl: './nota-devolucion-detalle.component.scss'
})

export class NotaDevolucionDetalleComponent implements OnChanges {

  gestiones: Gestion[] = [];
  detalles: DetalleNotaDevolucion[] = [];

  constructor(
    private GestionService: GestionService,
    private NotaDevolucionService: NotaDevolucionService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_devolucion!: NotaDevolucion;
  @Input() OptionNotaDevolucion!: number;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.GestionService.getIndex().subscribe(response => {
        this.gestiones = response.data ;
      });
      this.nota_devolucion.fecha = new Date(this.nota_devolucion.fecha + 'T00:00:00'); // Para evitar problemas de hora
      this.NotaDevolucionService.getDetallesNota(this.nota_devolucion).subscribe(response => {
        this.detalles=response;
      });
    }
  }

  getSeverity(status: boolean, opcion: number = 0) {
    if (opcion === 1) {
      return status ? 'info' : 'warn';
    }
    return status ? 'success' : 'warn';
  }

  getStatus(status: boolean,opcion: number = 0) {
    if (opcion === 1) {
      return status ? 'FIRMADO' : 'SIN FIRMA';
    }
    return status ? 'EN PROCESO' : 'PENDIENTE';
  }
}