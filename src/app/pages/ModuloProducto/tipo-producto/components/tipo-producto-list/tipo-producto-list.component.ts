import { Component, OnInit ,signal, ViewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TipoProductoService } from '../../services/tipo-producto.service';
import { TipoProducto, ApiResponse } from '../../models/TipoProducto';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  standalone: false,
  selector: 'app-tipo-producto-list',
  templateUrl: './tipo-producto-list.component.html',
  styleUrl: './tipo-producto-list.component.scss',
  providers: [UtilsService]
})

export class TipoProductoListComponent implements OnInit {
  tiposProductos = signal<TipoProducto[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  tipoProducto!: TipoProducto;
  tipoProductoDialog: boolean = false; 

  constructor(
    public utils: UtilsService,
    private TipoProductoService: TipoProductoService,
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
    const req = this.TipoProductoService.getTipoProductos(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.tiposProductos.set(response.data);
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
        nombre: value
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
    this.tipoProducto = {} as TipoProducto; // Limpia el formulario
    this.tipoProductoDialog = true; // Abre el modal
  }

  editTipoProducto(tipoProducto: TipoProducto) {
    this.tipoProducto = { ...tipoProducto }; // Carga los datos de la tipoProducto seleccionada
    this.tipoProductoDialog = true;
  }

  deleteTipoProducto(tipoProducto: TipoProducto) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo el tipo Producto <strong>${tipoProducto.nombre}</strong>?`,
      () => {
        const req = this.TipoProductoService.deleteTipoProducto(tipoProducto.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El tipo producto ${tipoProducto.nombre} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreTipoProducto(tipoProducto: TipoProducto) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar el tipo Producto <strong>${tipoProducto.nombre}</strong>?`,
      () => {
        const req = this.TipoProductoService.restoreTipoProducto(tipoProducto.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El tipo producto ${tipoProducto.nombre} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  TipoProductocloseDialog(event: boolean) {
    this.tipoProductoDialog = event; // Cierra el modal
    this.tipoProducto = {} as TipoProducto; // Limpia el formulario
    this.loadDemoData();
  }
}
