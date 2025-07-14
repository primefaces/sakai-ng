import { Component, OnInit ,signal} from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor';
import { UtilsService } from '../../../../../../shared/utils.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.scss',
  providers: [UtilsService]
})

export class ProveedorListComponent implements OnInit {
  proveedores = signal<Proveedor[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  proveedor!: Proveedor;

  proveedorDialog: boolean = false; 
  
  constructor(
    public  utils: UtilsService,
    private ProveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDemoData();
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = this.sortField, sortOrder = this.sortOrder) {
    this.loading = true;
    const req = this.ProveedorService.getProveedores(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.proveedores.set(response.data);
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

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.filters = {
      razon_social: value,
      correo: value,
      direccion: value,
      telefono: value,
      codigo: value
    };
    const page =1;
    this.loadDemoData(page);
  }

  onSortChange(event: any) {
    this.sortField = event.field;  // Campo que el usuario ordenó
    this.sortOrder = event.order === 1 ? 'asc' : 'desc';  // 1 es ascendente, -1 es descendente  
    this.loadDemoData();
  }

  openNew() {
    this.proveedor = {} as Proveedor; // Limpia el formulario
    this.proveedorDialog = true; // Abre el modal
  }

  editProveedor(proveedor: Proveedor) {
    this.proveedor = { ...proveedor }; // Carga los datos de la proveedor seleccionada
    this.proveedorDialog = true;
  }

  deleteProveedor(proveedor: Proveedor) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo al proveedor <strong>${proveedor.razon_social} </strong>?`,
      () => {
        const req = this.ProveedorService.deleteProveedor(proveedor.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El proveedor ${proveedor.razon_social} ha sido inactivado.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreProveedor(proveedor: Proveedor) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar al proveedor <strong>${proveedor.razon_social} </strong>?`,
      () => {
        const req = this.ProveedorService.restoreProveedor(proveedor.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El proveedor ${proveedor.razon_social}  ha sido activado..`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  ProveedorcloseDialog(event: boolean) {
    this.proveedorDialog = event; // Cierra el modal
    this.proveedor = {} as Proveedor; // Limpia el formulario
    this.loadDemoData();
  }

  navigateToProveedorVenta(proveedor: Proveedor) {
    this.router.navigate(['/NotaCompra/grupo', proveedor.codigo]);
  }
  navigateToProveedorDevolucion(proveedor: Proveedor) {
    this.router.navigate(['/NotaDevolucion/grupo', proveedor.codigo,2]);
  }

}
