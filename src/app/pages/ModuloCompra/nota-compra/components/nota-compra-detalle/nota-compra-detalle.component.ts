import { Component ,Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { NotaCompra } from '../../models/notacompra';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { DetalleNotaCompra } from '../../models/detallecompra';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { NotaCompraService } from '../../services/nota-compra.service';

@Component({
  standalone: false,
  selector: 'app-nota-compra-detalle',
  templateUrl: './nota-compra-detalle.component.html',
  styleUrl: './nota-compra-detalle.component.scss'
})

export class NotaCompraDetalleComponent implements OnChanges {

  gestiones: Gestion[] = [];
  detalles: DetalleNotaCompra[] = [];

  constructor(
    private GestionService: GestionService,
    private NotaCompraService: NotaCompraService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_compra!: NotaCompra;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.GestionService.getIndex().subscribe(response => {
        this.gestiones = response.data ;
      });
      this.nota_compra.fecha = new Date(this.nota_compra.fecha + 'T00:00:00'); // Para evitar problemas de hora
      this.NotaCompraService.getDetallesNota(this.nota_compra).subscribe(response => {
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