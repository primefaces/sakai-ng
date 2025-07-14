import { Component, OnInit ,Input, Output, EventEmitter, signal, SimpleChanges, OnChanges} from '@angular/core';
import { NotaDevolucion } from '../../models/notadevolucion';
import { Cliente } from '../../../../ModuloVenta/cliente/models/cliente';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { NotaDevolucionService  } from '../../../nota-devolucion/services/nota-devolucion.service';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { ClienteService } from '../../../../ModuloVenta/cliente/services/cliente.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { ActivatedRoute, Route } from '@angular/router';
import { ProveedorService } from '../../../../ModuloCompra/proveedor/services/proveedor.service';
import { Proveedor } from '../../../../ModuloCompra/proveedor/models/proveedor';


@Component({
  standalone: false,
  selector: 'app-nota-devolucion-form',
  templateUrl: './nota-devolucion-form.component.html',
  styleUrl: './nota-devolucion-form.component.scss',
  providers: [UtilsService]
})

export class NotaDevolucionFormComponent implements OnChanges {
  clientes = signal<Cliente[]>([]);
  proveedores = signal<Proveedor[]>([]);
  gestiones: Gestion[] = [];
  saving: boolean = false; // para saber si se esta guardando la Nota Venta

  // cliente 
  perPage: number = 6; // Elementos por página ejemplo [5,10,25]
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos

  NewNotaDevolucion: NotaDevolucion = {} as NotaDevolucion;

  constructor(
    public  utils: UtilsService,
    private NotaDevolucionService: NotaDevolucionService,
    private GestionService: GestionService,
    private ClienteService: ClienteService,
    private ProvedorService: ProveedorService, // Asumiendo que ProveedorService es similar a ClienteService
  ) {}

  @Input() visible: boolean = false;
  @Input() nota_devolucion!: NotaDevolucion;
  @Input() OptionNotaDevolucion!: number;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() AddProductoNewNota = new EventEmitter<NotaDevolucion>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.loadDemoDataCliente();
      this.loadDataGestion();
      this.nota_devolucion.fecha = this.nota_devolucion.fecha 
      ? new Date(this.nota_devolucion.fecha + 'T00:00:00') 
      : new Date(); // Si no hay fecha, usar la actual    
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  emitirAddProductoNewNota(){
    console.log('emitirAddProductoNewNota', this.NewNotaDevolucion);
    this.AddProductoNewNota.emit(this.NewNotaDevolucion);
  }
  
  saveNotaDevolucion() {
    if (this.saving) return; // prevención por doble click
    this.saving = true;

    this.nota_devolucion.gestion_id = this.nota_devolucion.gestion?.id ;
    this.nota_devolucion.cliente_id = this.nota_devolucion.cliente?.id ;
    this.nota_devolucion.proveedor_id = this.nota_devolucion.proveedor?.id ;
    this.nota_devolucion.user_id = this.nota_devolucion.user?.id || 1; // Cambia esto según tu lógica

    const req = this.nota_devolucion.id
      ? this.NotaDevolucionService.updateNotaDevolucion(this.nota_devolucion.id, this.nota_devolucion)
      : this.NotaDevolucionService.createNotaDevolucion(this.nota_devolucion);

    req.subscribe({
      next: (response) => {
        const isUpdate = !!this.nota_devolucion.id;
        const msg = isUpdate ? 'Se ha modificado la Nota Devolucion.' :
          `Se añadió la Nota Devolucion ${this.nota_devolucion.codigo_factura}.`;
        this.utils.showSuccess(msg);
        this.NewNotaDevolucion = response;
      },
      error: () => {
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
        this.closeDialog();
        if(!!this.nota_devolucion.id == false){
          this.nota_devolucion = {} as NotaDevolucion;
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

  loadDemoDataCliente(page = 1, rows = this.perPage, filters = this.filters, sortField = '', sortOrder = '') {
    this.loading = true;
    filters['estado']=1;
    if (this.OptionNotaDevolucion==1){
      this.ClienteService.getClientes(page,rows,filters,sortField,sortOrder).subscribe(response => {
        this.clientes.set(response.data);
        this.loading = false;
      });
    }
    if (this.OptionNotaDevolucion==2){
      this.ProvedorService.getProveedores(page,rows,filters,sortField,sortOrder).subscribe(response => {
        this.proveedores.set(response.data);
        this.loading = false;
      });
    }
    
  }

  onGlobalFilter(event: any) {
    const value = event.query.trim();
    this.filters = {
      nombre: value,
      razon_social: value,
    };
    const page =1;
    this.loadDemoDataCliente(page,this.perPage,this.filters,'','');
  }

}