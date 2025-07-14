
import { Component, Input, OnInit ,signal} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotaCompraService } from '../../services/nota-compra.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { NotaCompra } from '../../models/notacompra';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { Proveedor } from '../../../proveedor/models/proveedor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../../ModuloCompra/proveedor/services/proveedor.service';
import { ConfiguracionService } from '../../../../ModuloAdministracion/configuracion/services/configuracion.service';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';

@Component({
  standalone: false,
  selector: 'app-nota-compra-grupo',
  templateUrl: './nota-compra-grupo.component.html',
  styleUrl: './nota-compra-grupo.component.scss',
  providers: [UtilsService]
})

export class NotaCompraGrupoComponent implements OnInit {
  NotaCompras = signal<NotaCompra[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 10; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  nota_compra!: NotaCompra;
  DetalleNotaCompraDialog: boolean = false; 
  NotaCompraDialog: boolean = false; 

  ProductoEnvaseToNota!: NotaCompra;
  AddProductoEnvaseToNotaDialog: boolean = false; 

  gestiones: Gestion[] = [];
  selectedGestion: Gestion = {} as Gestion;

  layout: 'list' | 'grid' = 'grid';
  items: MenuItem[] = [];

  EstadoCuentaDialog: boolean = false;

  constructor(
    public  utils: UtilsService,
    private nota_compraService: NotaCompraService,
    private GestionService : GestionService,
    private ProveedorService: ProveedorService,
    private route: ActivatedRoute,  // Inyección correcta de ActivatedRoute
    private router: Router,
    private ConfiguracionService: ConfiguracionService
  ) {
    
  }

  CodigoProveedor!: number;
  ProveedorNotaCompra!: Proveedor;

  
  ngOnInit(): void {
    this.ProveedorSelectedNota();
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
    if (this.nota_compra.firma == false && this.nota_compra.nota_alterna == false){
      this.items.push(
        {
          label: 'Añadir Productos',
          icon: 'pi pi-plus',
          command: () => this.AddProductoEnvasNota(this.nota_compra)
        }
      );
    }
    this.items.push(
      {
        label: 'Ver Detalle',
        icon: 'pi pi-eye',
        command: () => this.OnNotaCompraDetalle(this.nota_compra)
      },
    );
    if (this.nota_compra.firma == false && this.nota_compra.nota_alterna == false) {
      this.items.push(
        {
          label: 'Editar Nota',
          icon: 'pi pi-pencil',
          command: () => this.editNotaCompra(this.nota_compra)
        }
      );
    }
    if((this.nota_compra.estado == true && this.nota_compra.nota_alterna == false && this.nota_compra.firma == false)){
      this.items.push(
        {
          label: 'Completar Firma',
          icon: 'pi pi-check-circle',
          command: () => this.CompletarNotaCompra(this.nota_compra)
        }
      );
    }
    if (this.nota_compra.nota_alterna == false){
      this.items.push(
        {
          label: 'Anular Nota',
          icon: 'pi pi-trash',
          command: () => this.AnularNotaCompra(this.nota_compra)
        }
      );
    }
  }
  
  ProveedorSelectedNota(){
    this.route.params.subscribe(params => {
      const codigo = params['CodigoProveedor'];
      this.CodigoProveedor=codigo;
    });
    this.filters['Proveedor'] = this.CodigoProveedor;
    if(this.filters['Proveedor']){
      const req = this.ProveedorService.ShowByCodigo(this.CodigoProveedor);
      req.subscribe({
        next: (response) => {
          this.ProveedorNotaCompra=response;
        }
      });
    }
  }
  
  AddProductoEnvasNota(nota_compra: NotaCompra) {
    this.ProductoEnvaseToNota = { ...nota_compra }; 
    this.AddProductoEnvaseToNotaDialog = true;
  }

  AnularNotaCompra(nota_compra: NotaCompra) {
    if (nota_compra.nota_alterna) return ; // prevención por doble
    this.utils.confirmarAccion(
      `Desea anular la Nota De Compra F: <strong>${nota_compra.codigo_factura}</strong>?`,
      () => {
        const req = this.nota_compraService.AnularNotaCompra(nota_compra);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `Se ANULÓ la Nota De Compra F: ${this.nota_compra.codigo_factura}.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  CompletarNotaCompra(nota_compra: NotaCompra) {
    if (nota_compra.firma) return ; // prevención por doble

    this.utils.confirmarAccion(
      `Completar firma de la Nota De Compra F: <strong>${nota_compra.codigo_factura} </strong>?`,
      () => {
        const req = this.nota_compraService.CompletarFirmaNotaCompra(nota_compra);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La Nota De Compra F: ${nota_compra.codigo_factura} ha sido FIRMADO.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  OnNotaCompraDetalle(nota_compra: NotaCompra) {
    this.nota_compra = { ...nota_compra }; // Carga los datos de la nota_compra seleccionada
    this.DetalleNotaCompraDialog = true;
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = 'created_at', sortOrder = 'desc') {
    this.loading = true;
    const req = this.nota_compraService.getNotaCompras(page, rows, filters, sortField, sortOrder);
    req.subscribe({
      next: (response) => {
        this.NotaCompras.set(response.data);
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
      Proveedor: this.CodigoProveedor != null ? this.CodigoProveedor : null
    };
    const page = 1;
    this.loadDemoData(page);
  }

  getEstadoNota(item: NotaCompra): string {
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
    this.nota_compra = {} as NotaCompra; // Limpia el formulario
    this.nota_compra.proveedor = this.ProveedorNotaCompra != null ? this.ProveedorNotaCompra : {} as Proveedor;
    this.nota_compra.proveedor_id = this.ProveedorNotaCompra != null ? this.ProveedorNotaCompra.id : NaN;
    this.nota_compra.gestion = this.selectedGestion != null ? this.selectedGestion : {} as Gestion;
    this.NotaCompraDialog = true; // Abre el modal
  }

  editNotaCompra(nota_compra: NotaCompra) {
    if (nota_compra.nota_alterna || nota_compra.firma) return ; // no se podra editar porque se encuentra ANULADO o firmado

    this.nota_compra = { ...nota_compra }; // Carga los datos de la nota_compra seleccionada
    this.NotaCompraDialog = true;
  }

  CreateNotaCompraDialogEvent( event: boolean) {
    this.NotaCompraDialog = event; // Cierra el modal
    this.nota_compra = {} as NotaCompra; // Limpia el formulario
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
    this.router.navigate(['/NotaDevolucion/grupo', this.ProveedorNotaCompra.codigo, 2]);
  }
  
}
