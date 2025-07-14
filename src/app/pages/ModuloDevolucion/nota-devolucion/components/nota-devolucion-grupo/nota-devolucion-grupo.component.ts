import { Component, Input, OnInit ,signal} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotaDevolucionService } from '../../services/nota-devolucion.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { NotaDevolucion } from '../../models/notadevolucion';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { Cliente } from '../../../../ModuloVenta/cliente/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../ModuloVenta/cliente/services/cliente.service';
import { ConfiguracionService } from '../../../../ModuloAdministracion/configuracion/services/configuracion.service';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { pipe, switchMap, tap } from 'rxjs';
import { Proveedor } from '../../../../ModuloCompra/proveedor/models/proveedor';
import { ProveedorService } from '../../../../ModuloCompra/proveedor/services/proveedor.service';

@Component({
  standalone: false,
  selector: 'app-nota-devolucion-grupo',
  templateUrl: './nota-devolucion-grupo.component.html',
  styleUrl: './nota-devolucion-grupo.component.scss',
  providers: [UtilsService]
})

export class NotaDevolucionGrupoComponent implements OnInit {
  NotaDevolucions = signal<NotaDevolucion[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 10; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  nota_devolucion!: NotaDevolucion;
  DetalleNotaDevolucionDialog: boolean = false; 
  NotaDevolucionDialog: boolean = false; 

  ProductoEnvaseToNota!: NotaDevolucion;
  AddProductoEnvaseToNotaDialog: boolean = false; 

  gestiones: Gestion[] = [];
  selectedGestion: Gestion = {} as Gestion;

  layout: 'list' | 'grid' = 'grid';
  items: MenuItem[] = [];

  EstadoCuentaDialog: boolean = false;

  constructor(
    public  utils: UtilsService,
    private NotaDevolucionService: NotaDevolucionService,
    private GestionService : GestionService,
    private ClienteService: ClienteService,
    private ProveedorService: ProveedorService,
    private route: ActivatedRoute,  // Inyección correcta de ActivatedRoute
    private router: Router,
    private ConfiguracionService: ConfiguracionService
  ) {
    
  }

  CodigoCliente!: number;
  clienteNotaDevolucion!: Cliente;
  proveedorNotaDevolucion!: Proveedor;
  optionNota:  number = 1; // 1 para cliente, 2 para proveedor 
  
  ngOnInit(): void {
    this.ClienteSelectedNota();
    this.gestionActual(); // se carga el loadDemoData()
    this.loadGestiones();
    //this.loadDemoData();
  }


  gestionActual() {
    const req = this.ConfiguracionService.showConfiguracion();
    req.subscribe({
      next: (response) => {
        this.selectedGestion = response.gestion;
        this.filters['gestion'] = this.selectedGestion?.id ?? null;
      },
      complete: () => {
        this.loadDemoData();
      }
    });
  }

  loadMenuItems() {
    this.items = []; 
    if (this.nota_devolucion.firma == false && this.nota_devolucion.nota_alterna == false){
      this.items.push(
        {
          label: 'Añadir Productos',
          icon: 'pi pi-plus',
          command: () => this.AddProductoEnvasNota(this.nota_devolucion)
        }
      );
    }
    this.items.push(
      {
        label: 'Ver Detalle',
        icon: 'pi pi-eye',
        command: () => this.OnNotaDevolucionDetalle(this.nota_devolucion)
      },
    );
    if (this.nota_devolucion.firma == false && this.nota_devolucion.nota_alterna == false) {
      this.items.push(
        {
          label: 'Editar Nota',
          icon: 'pi pi-pencil',
          command: () => this.editNotaDevolucion(this.nota_devolucion)
        }
      );
    }
    if((this.nota_devolucion.estado == true && this.nota_devolucion.nota_alterna == false && this.nota_devolucion.firma == false)){
      this.items.push(
        {
          label: 'Completar Firma',
          icon: 'pi pi-check-circle',
          command: () => this.CompletarNotaDevolucion(this.nota_devolucion)
        }
      );
    }
    if (this.nota_devolucion.nota_alterna == false){
      this.items.push(
        {
          label: 'Anular Nota',
          icon: 'pi pi-trash',
          command: () => this.AnularNotaDevolucion(this.nota_devolucion)
        }
      );
    }
  }
  
  ClienteSelectedNota(){
    this.route.params.subscribe(params => {
      const codigo = params['CodigoCliente'];
      
      const option = params['optionNota']? parseInt(params['optionNota']) : 1; // 1 para cliente, 2 para proveedor
      console.log('option cliente nota devolucion', option);
      this.CodigoCliente=codigo;
      this.optionNota = option;
    });
    if(this.optionNota == 1) {
      this.filters['cliente'] = this.CodigoCliente;
      if(this.filters['cliente']){
        const req = this.ClienteService.ShowByCodigo(this.CodigoCliente);
        req.subscribe({
          next: (response) => {
            this.clienteNotaDevolucion=response;
          }
        });
      }
    }
    if(this.optionNota == 2) {
      this.filters['proveedor'] = this.CodigoCliente;
      if(this.filters['proveedor']){
        const req2 = this.ProveedorService.ShowByCodigo(this.CodigoCliente);
        req2.subscribe({
          next: (response) => {
            this.proveedorNotaDevolucion=response;
          }
        });
      }
    }
  }
  
  AddProductoEnvasNota(nota_devolucion: NotaDevolucion) {
    this.ProductoEnvaseToNota = { ...nota_devolucion }; 
    this.AddProductoEnvaseToNotaDialog = true;
  }

  AnularNotaDevolucion(nota_devolucion: NotaDevolucion) {
    if (nota_devolucion.nota_alterna) return ; // prevención por doble
    this.utils.confirmarAccion(
      `Desea anular la Nota De Devolucion F: <strong>${nota_devolucion.codigo_factura}</strong>?`,
      () => {
        const req = this.NotaDevolucionService.AnularNotaDevolucion(nota_devolucion);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `Se ANULÓ la Nota De Devolucion F: ${this.nota_devolucion.codigo_factura}.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  CompletarNotaDevolucion(nota_devolucion: NotaDevolucion) {
    if (nota_devolucion.firma) return ; // prevención por doble

    this.utils.confirmarAccion(
      `Completar firma de la Nota De Devolucion F: <strong>${nota_devolucion.codigo_factura} </strong>?`,
      () => {
        const req = this.NotaDevolucionService.CompletarFirmaNotaDevolucion(nota_devolucion);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La Nota De Devolucion F: ${nota_devolucion.codigo_factura} ha sido FIRMADO.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  OnNotaDevolucionDetalle(nota_devolucion: NotaDevolucion) {
    this.nota_devolucion = { ...nota_devolucion }; // Carga los datos de la nota_devolucion seleccionada
    this.DetalleNotaDevolucionDialog = true;
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = 'created_at', sortOrder = 'desc') {
    this.loading = true;
    filters['optionNota'] = this.optionNota; // 0 para cliente, 1 para proveedor
    console.log('filters modo == ', filters['optionNota']);
    const req = this.NotaDevolucionService.getNotaDevolucions(page, rows, filters, sortField, sortOrder);
    req.subscribe({
      next: (response) => {
        this.NotaDevolucions.set(response.data);
        this.totalRecords = response.total;
        this.firstRecord = (page - 1) * rows;
        this.currentPage = this.firstRecord / rows + 1
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onGlobalFilterGestion(event: any) {
    const gestion = event.value;
    this.filters['gestion'] = gestion.id != -1 ? gestion.id : null;
    const page =1;
    this.loadDemoData(page);
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.filters = {
      fecha: value,
      gestion: this.selectedGestion.id != null ? this.selectedGestion.id : null,
      cliente: this.CodigoCliente != null ? this.CodigoCliente : null
    };
    const page = 1;
    this.loadDemoData(page);
  }

  getEstadoNota(item: NotaDevolucion): string {
    if (item.firma === true && item.estado === true && item.nota_alterna === false) {
      return 'COMPLETADO';
    } else if (item.estado === true && item.nota_alterna === false && item.firma === false) {
      return 'EN PROCESO';
    } else if (item.estado === false && item.nota_alterna === false && item.firma === false) {
      return 'PENDIENTE';
    } else {
      return '';
    }
  }

  openNew() {
    this.nota_devolucion = {} as NotaDevolucion; // Limpia el formulario
    this.nota_devolucion.cliente = this.clienteNotaDevolucion != null ? this.clienteNotaDevolucion : {} as Cliente;
    this.nota_devolucion.cliente_id = this.clienteNotaDevolucion != null ? this.clienteNotaDevolucion.id : NaN;
    this.nota_devolucion.gestion = this.selectedGestion != null ? this.selectedGestion : {} as Gestion;
    this.NotaDevolucionDialog = true; // Abre el modal
  }

  editNotaDevolucion(nota_devolucion: NotaDevolucion) {
    if (nota_devolucion.nota_alterna || nota_devolucion.firma) return ; // no se podra editar porque se encuentra ANULADO o firmado

    this.nota_devolucion = { ...nota_devolucion }; // Carga los datos de la nota_devolucion seleccionada
    this.NotaDevolucionDialog = true;
  }

  CreateNotaDevolucionDialogEvent( event: boolean) {
    this.NotaDevolucionDialog = event; // Cierra el modal
    this.nota_devolucion = {} as NotaDevolucion; // Limpia el formulario
    this.loadDemoData();
  }

  AddProductoEnvaseNotaDialogEvent( event: boolean) {
    this.AddProductoEnvaseToNotaDialog = event;
    this.loadDemoData();
  }

  loadGestiones() {
    const req = this.GestionService.getIndex();
    req.subscribe({
      next: (response) => {
        const gestionGeneral: Gestion = {
          id: -1,
          nombre_campania: 'Todos',
          anio: 0,
          estado: true,
          gestion_actual: false
        };
        this.gestiones = [gestionGeneral , ...response.data]; 
      }
    });
  }

  onContextMenuHide() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  estado_de_cuenta() {
    this.EstadoCuentaDialog = true;
  }

  goToVentas(): void {
    this.router.navigate(['/NotaVenta/grupo', this.clienteNotaDevolucion.codigo]);
  }
  
  goToCompras(): void {
    this.router.navigate(['/NotaCompra/grupo', this.proveedorNotaDevolucion.codigo]);
  }
  
}
