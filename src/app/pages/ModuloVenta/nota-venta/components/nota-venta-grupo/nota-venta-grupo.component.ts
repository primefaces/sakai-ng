import { Component, Input, OnInit ,signal} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotaVentaService } from '../../services/nota-venta.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { NotaVenta } from '../../models/notaventa';
import { GestionService } from '../../../gestion/services/gestion.service';
import { Cliente } from '../../../cliente/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { ConfiguracionService } from '../../../../ModuloAdministracion/configuracion/services/configuracion.service';
import { Gestion } from '../../../gestion/models/gestion';
import { pipe, switchMap, tap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-nota-venta-grupo',
  templateUrl: './nota-venta-grupo.component.html',
  styleUrl: './nota-venta-grupo.component.scss',
  providers: [UtilsService]
})

export class NotaVentaGrupoComponent implements OnInit {
  NotaVentas = signal<NotaVenta[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 10; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  nota_venta!: NotaVenta;
  DetalleNotaVentaDialog: boolean = false; 
  NotaVentaDialog: boolean = false; 

  ProductoEnvaseToNota!: NotaVenta;
  AddProductoEnvaseToNotaDialog: boolean = false; 

  gestiones: Gestion[] = [];
  selectedGestion: Gestion = {} as Gestion;

  layout: 'list' | 'grid' = 'grid';
  items: MenuItem[] = [];

  EstadoCuentaDialog: boolean = false;

  constructor(
    public  utils: UtilsService,
    private nota_ventaService: NotaVentaService,
    private GestionService : GestionService,
    private ClienteService: ClienteService,
    private route: ActivatedRoute,  // Inyección correcta de ActivatedRoute
    private router: Router,
    private ConfiguracionService: ConfiguracionService
  ) {
    
  }

  CodigoCliente!: number;
  clienteNotaVenta!: Cliente;

  
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
    if (this.nota_venta.firma == false && this.nota_venta.nota_alterna == false){
      this.items.push(
        {
          label: 'Añadir Productos',
          icon: 'pi pi-plus',
          command: () => this.AddProductoEnvasNota(this.nota_venta)
        }
      );
    }
    this.items.push(
      {
        label: 'Ver Detalle',
        icon: 'pi pi-eye',
        command: () => this.OnNotaVentaDetalle(this.nota_venta)
      },
    );
    if (this.nota_venta.firma == false && this.nota_venta.nota_alterna == false) {
      this.items.push(
        {
          label: 'Editar Nota',
          icon: 'pi pi-pencil',
          command: () => this.editNotaVenta(this.nota_venta)
        }
      );
    }
    if((this.nota_venta.estado == true && this.nota_venta.nota_alterna == false && this.nota_venta.firma == false)){
      this.items.push(
        {
          label: 'Completar Firma',
          icon: 'pi pi-check-circle',
          command: () => this.CompletarNotaVenta(this.nota_venta)
        }
      );
    }
    if (this.nota_venta.nota_alterna == false){
      this.items.push(
        {
          label: 'Anular Nota',
          icon: 'pi pi-trash',
          command: () => this.AnularNotaVenta(this.nota_venta)
        }
      );
    }
  }
  
  ClienteSelectedNota(){
    this.route.params.subscribe(params => {
      const codigo = params['CodigoCliente'];
      this.CodigoCliente=codigo;
    });
    this.filters['cliente'] = this.CodigoCliente;
    if(this.filters['cliente']){
      const req = this.ClienteService.ShowByCodigo(this.CodigoCliente);
      req.subscribe({
        next: (response) => {
          this.clienteNotaVenta=response;
        }
      });
    }
  }
  
  AddProductoEnvasNota(nota_venta: NotaVenta) {
    this.ProductoEnvaseToNota = { ...nota_venta }; 
    this.AddProductoEnvaseToNotaDialog = true;
  }

  AnularNotaVenta(nota_venta: NotaVenta) {
    if (nota_venta.nota_alterna) return ; // prevención por doble
    this.utils.confirmarAccion(
      `Desea anular la Nota De Venta F: <strong>${nota_venta.codigo_factura}</strong>?`,
      () => {
        const req = this.nota_ventaService.AnularNotaVenta(nota_venta);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `Se ANULÓ la Nota De Venta F: ${this.nota_venta.codigo_factura}.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  CompletarNotaVenta(nota_venta: NotaVenta) {
    if (nota_venta.firma) return ; // prevención por doble

    this.utils.confirmarAccion(
      `Completar firma de la Nota De Venta F: <strong>${nota_venta.codigo_factura} </strong>?`,
      () => {
        const req = this.nota_ventaService.CompletarFirmaNotaVenta(nota_venta);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La Nota De Venta F: ${nota_venta.codigo_factura} ha sido FIRMADO.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  OnNotaVentaDetalle(nota_venta: NotaVenta) {
    this.nota_venta = { ...nota_venta }; // Carga los datos de la nota_venta seleccionada
    this.DetalleNotaVentaDialog = true;
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = 'created_at', sortOrder = 'desc') {
    this.loading = true;
    const req = this.nota_ventaService.getNotaVentas(page, rows, filters, sortField, sortOrder);
    req.subscribe({
      next: (response) => {
        this.NotaVentas.set(response.data);
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

  getEstadoNota(item: NotaVenta): string {
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
    this.nota_venta = {} as NotaVenta; // Limpia el formulario
    this.nota_venta.cliente = this.clienteNotaVenta != null ? this.clienteNotaVenta : {} as Cliente;
    this.nota_venta.cliente_id = this.clienteNotaVenta != null ? this.clienteNotaVenta.id : NaN;
    this.nota_venta.gestion = this.selectedGestion != null ? this.selectedGestion : {} as Gestion;
    this.NotaVentaDialog = true; // Abre el modal
  }

  editNotaVenta(nota_venta: NotaVenta) {
    if (nota_venta.nota_alterna || nota_venta.firma) return ; // no se podra editar porque se encuentra ANULADO o firmado

    this.nota_venta = { ...nota_venta }; // Carga los datos de la nota_venta seleccionada
    this.NotaVentaDialog = true;
  }

  CreateNotaVentaDialogEvent( event: boolean) {
    this.NotaVentaDialog = event; // Cierra el modal
    this.nota_venta = {} as NotaVenta; // Limpia el formulario
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

  goToDevolucion(): void {
    this.router.navigate(['/NotaDevolucion/grupo', this.clienteNotaVenta.codigo, 1]);
  }
  
}
