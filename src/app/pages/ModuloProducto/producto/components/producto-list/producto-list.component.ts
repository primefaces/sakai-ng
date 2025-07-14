import { Component, OnInit ,signal} from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  standalone: false,
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss',
  providers: [UtilsService]
})

export class ProductoListComponent implements OnInit {
  productos = signal<Producto[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  producto!: Producto;
  productoDialog: boolean = false; 

  constructor(
    public utils: UtilsService,
    private ProductoService: ProductoService
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
    const req = this.ProductoService.getProductos(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.productos.set(response.data);
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
        nombre: value,
        descripcion: value,
        categoria: value,
        tipoproducto: value
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
    this.producto = {} as Producto; // Limpia el formulario
    this.productoDialog = true; // Abre el modal
  }

  editProducto(producto: Producto) {
    this.producto = { ...producto }; // Carga los datos de la producto seleccionada
    this.productoDialog = true;
  }

  deleteProducto(producto: Producto) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo el producto <strong>${producto.nombre}</strong>?`,
      () => {
        const req = this.ProductoService.deleteProducto(producto.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El producto ${producto.nombre} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreProducto(producto: Producto) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar el producto <strong>${producto.nombre}</strong>?`,
      () => {
        const req = this.ProductoService.restoreProducto(producto.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El producto ${producto.nombre} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  ProductocloseDialog(event: boolean) {
    this.productoDialog = event; // Cierra el modal
    this.producto = {} as Producto; // Limpia el formulario
    this.loadDemoData();
  }
}
