import { Component,Input, Output, EventEmitter, signal, SimpleChanges, OnChanges} from '@angular/core';
import { NotaCompra } from '../../models/notacompra';
import { Proveedor } from '../../../proveedor/models/proveedor';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { NotaCompraService  } from '../../../nota-compra/services/nota-compra.service';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { ProveedorService } from '../../../proveedor/services/proveedor.service';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-nota-compra-form',
  templateUrl: './nota-compra-form.component.html',
  styleUrl: './nota-compra-form.component.scss',
  providers: [UtilsService]
})

export class NotaCompraFormComponent implements OnChanges {
  proveedores = signal<Proveedor[]>([]);
  gestiones: Gestion[] = [];
  saving: boolean = false; // para saber si se esta guardando la Nota Venta

  // cliente 
  perPage: number = 6; // Elementos por página ejemplo [5,10,25]
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos

  tipoVenta = [
    { label: 'Contado', value: false },
    { label: 'Crédito', value: true }
  ];

  NewNotaCompra: NotaCompra = {} as NotaCompra;

  constructor(
    public  utils: UtilsService,
    private NotaCompraService: NotaCompraService,
    private GestionService: GestionService,
    private ProveedorService: ProveedorService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_compra!: NotaCompra;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() AddProductoNewNota = new EventEmitter<NotaCompra>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.loadDemoDataProveedor();
      this.loadDataGestion();
      this.nota_compra.fecha = this.nota_compra.fecha 
      ? new Date(this.nota_compra.fecha + 'T00:00:00') 
      : new Date(); // Si no hay fecha, usar la actual    
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  emitirAddProductoNewNota(){
    console.log('emitirAddProductoNewNota', this.NewNotaCompra);
    this.AddProductoNewNota.emit(this.NewNotaCompra);
  }
  
  saveNotaCompra() {
    if (this.saving) return; // prevención por doble click
    this.saving = true;

    this.nota_compra.gestion_id = this.nota_compra.gestion?.id ;
    this.nota_compra.proveedor_id = this.nota_compra.proveedor?.id ;
    this.nota_compra.user_id = this.nota_compra.user?.id || 1; // Cambia esto según tu lógica

    const req = this.nota_compra.id
      ? this.NotaCompraService.updateNotaCompra(this.nota_compra.id, this.nota_compra)
      : this.NotaCompraService.createNotaCompra(this.nota_compra);

    req.subscribe({
      next: (response) => {
        const isUpdate = !!this.nota_compra.id;
        const msg = isUpdate ? 'Se ha modificado la Nota Compra.' :
          `Se añadió la Nota Venta ${this.nota_compra.codigo_factura}.`;
        this.utils.showSuccess(msg);
        this.NewNotaCompra = response;
      },
      error: () => {
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
        this.closeDialog();
        if(!!this.nota_compra.id == false){
          this.nota_compra = {} as NotaCompra;
          this.emitirAddProductoNewNota();
        }
      }
    });
  }

  loadDataGestion(){
    this.GestionService.getIndex().subscribe(response => {
      this.gestiones = response.data ;
    });
  }

  loadDemoDataProveedor(page = 1, rows = this.perPage, filters = this.filters, sortField = '', sortOrder = '') {
    this.loading = true;
    filters['estado']=1;
    this.ProveedorService.getProveedores(page,rows,filters,sortField,sortOrder).subscribe(response => {
      this.proveedores.set(response.data);
      this.loading = false;
    });
  }

  onGlobalFilter(event: any) {
    const value = event.query.trim();
    this.filters = {
      razon_social: value
    };
    const page =1;
    this.loadDemoDataProveedor(page,this.perPage,this.filters,'','');
  }

}