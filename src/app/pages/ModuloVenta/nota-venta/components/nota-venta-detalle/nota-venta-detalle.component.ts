import { Component, OnInit ,Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { NotaVenta } from '../../models/notaventa';
import { Gestion } from '../../../gestion/models/gestion';
import { Cultivo } from '../../../cultivo/models/cultivo';
import { DetalleNotaVenta } from '../../models/detalleventa';
import { GestionService } from '../../../gestion/services/gestion.service';
import { CultivoService } from '../../../cultivo/services/cultivo.service';
import { NotaVentaService } from '../../services/nota-venta.service';

@Component({
  standalone: false,
  selector: 'app-nota-venta-detalle',
  templateUrl: './nota-venta-detalle.component.html',
  styleUrl: './nota-venta-detalle.component.scss'
})

export class NotaVentaDetalleComponent implements OnInit,OnChanges {

  gestiones: Gestion[] = [];
  cultivos: Cultivo[] = [];
  detalles: DetalleNotaVenta[] = [];

  constructor(
    private GestionService: GestionService,
    private CultivoService: CultivoService,
    private NotaVentaService: NotaVentaService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_venta!: NotaVenta;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.GestionService.getIndex().subscribe(response => {
        this.gestiones = response.data ;
      });
      this.CultivoService.getIndex().subscribe(response => {
        this.cultivos = response.data ;
      });
      this.nota_venta.fecha = new Date(this.nota_venta.fecha + 'T00:00:00'); // Para evitar problemas de hora
      this.NotaVentaService.getDetallesNota(this.nota_venta).subscribe(response => {
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