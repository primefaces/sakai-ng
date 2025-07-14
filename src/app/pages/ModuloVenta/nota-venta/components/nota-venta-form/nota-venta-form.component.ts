import { Component, OnInit ,Input, Output, EventEmitter, signal, SimpleChanges, OnChanges} from '@angular/core';
import { NotaVenta } from '../../models/notaventa';
import { Cliente } from '../../../cliente/models/cliente';
import { Gestion } from '../../../gestion/models/gestion';
import { Cultivo } from '../../../cultivo/models/cultivo';
import { NotaVentaService  } from '../../../nota-venta/services/nota-venta.service';
import { GestionService } from '../../../gestion/services/gestion.service';
import { CultivoService } from '../../../cultivo/services/cultivo.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-nota-venta-form',
  templateUrl: './nota-venta-form.component.html',
  styleUrl: './nota-venta-form.component.scss',
  providers: [UtilsService]
})

export class NotaVentaFormComponent implements OnChanges {
  clientes = signal<Cliente[]>([]);
  gestiones: Gestion[] = [];
  cultivos: Cultivo[] = [];
  saving: boolean = false; // para saber si se esta guardando la Nota Venta

  // cliente 
  perPage: number = 6; // Elementos por página ejemplo [5,10,25]
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos

  tipoVenta = [
    { label: 'Contado', value: false },
    { label: 'Crédito', value: true }
  ];

  NewNotaVenta: NotaVenta = {} as NotaVenta;

  constructor(
    public  utils: UtilsService,
    private NotaVentaService: NotaVentaService,
    private GestionService: GestionService,
    private CultivoService: CultivoService,
    private ClienteService: ClienteService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_venta!: NotaVenta;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() AddProductoNewNota = new EventEmitter<NotaVenta>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.loadDemoDataCliente();
      this.loadDataGestion();
      this.loadDataCultivo();
      this.nota_venta.fecha = this.nota_venta.fecha 
      ? new Date(this.nota_venta.fecha + 'T00:00:00') 
      : new Date(); // Si no hay fecha, usar la actual    
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  emitirAddProductoNewNota(){
    console.log('emitirAddProductoNewNota', this.NewNotaVenta);
    this.AddProductoNewNota.emit(this.NewNotaVenta);
  }
  
  saveNotaVenta() {
    if (this.saving) return; // prevención por doble click
    this.saving = true;

    this.nota_venta.gestion_id = this.nota_venta.gestion?.id ;
    this.nota_venta.cliente_id = this.nota_venta.cliente?.id ;
    this.nota_venta.cultivo_id = this.nota_venta.cultivo?.id ;
    this.nota_venta.user_id = this.nota_venta.user?.id || 1; // Cambia esto según tu lógica

    const req = this.nota_venta.id
      ? this.NotaVentaService.updateNotaVenta(this.nota_venta.id, this.nota_venta)
      : this.NotaVentaService.createNotaVenta(this.nota_venta);

    req.subscribe({
      next: (response) => {
        const isUpdate = !!this.nota_venta.id;
        const msg = isUpdate ? 'Se ha modificado la Nota Venta.' :
          `Se añadió la Nota Venta ${this.nota_venta.codigo_factura}.`;
        this.utils.showSuccess(msg);
        //this.nota_venta = {} as NotaVenta;
        this.NewNotaVenta = response;
        //console.log('Nota Venta guardada:', response);
      },
      error: (error) => {
        //console.error('Error al guardar la Nota Venta:', error);
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
        this.closeDialog();
        if(!!this.nota_venta.id == false){
          this.nota_venta = {} as NotaVenta;
          this.emitirAddProductoNewNota();
        }
      }
    });
  }

  loadDataCultivo(){
    this.CultivoService.getIndex().subscribe(response => {
      this.cultivos = response.data ;
    });
  }

  loadDataGestion(){
    this.GestionService.getIndex().subscribe(response => {
      this.gestiones = response.data ;
    });
  }

  loadDemoDataCliente(page = 1, rows = this.perPage, filters = this.filters, sortField = '', sortOrder = '') {
    this.loading = true;
    filters['estado']=1;
    this.ClienteService.getClientes(page,rows,filters,sortField,sortOrder).subscribe(response => {
      this.clientes.set(response.data);
      this.loading = false;
    });
  }

  onGlobalFilter(event: any) {
    const value = event.query.trim();
    this.filters = {
      nombre: value
    };
    const page =1;
    this.loadDemoDataCliente(page,this.perPage,this.filters,'','');
  }

}