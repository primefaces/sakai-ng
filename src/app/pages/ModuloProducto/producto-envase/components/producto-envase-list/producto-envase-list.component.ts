import { Component, OnInit ,signal} from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProductoEnvaseService } from '../../services/producto-envase.service';
import { ProductoEnvase } from '../../models/ProductoEnvase';
import { CategoriaService } from '../../../categoria/services/categoria.service';
import { environment } from '../../../../../../environments/environment';
import { Categoria } from '../../../categoria/models/categoria';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-producto-envase-list',
  templateUrl: './producto-envase-list.component.html',
  styleUrl: './producto-envase-list.component.scss',
  providers: [UtilsService]
})

export class ProductoEnvaseListComponent implements OnInit {
  ProductoEnvases = signal<ProductoEnvase[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 10; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  productoenvase!: ProductoEnvase;
  productoenvaseDialog: boolean = false; 

  categorias: Categoria[] = [];
  selectedCategoria: Categoria = this.CategoriaDefecto();

  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];

  items: MenuItem[] = [];

  constructor(
    public utils: UtilsService,
    private ProductoEnvaseService: ProductoEnvaseService,
    private CategoriaService: CategoriaService
  ) {}

  
  ngOnInit(): void {
    this.loadCategorias();
    this.loadDemoData();
  }

  CategoriaDefecto(): Categoria {
    const categoriaGeneral: Categoria = {
      id: -1,
      nombre: 'Todos',
      estado: true,
    };
    return categoriaGeneral;
  } 

  loadMenuItems() {
    this.items = []; 
    if(this.productoenvase.estado==false) {
      this.items.push(
        {
          label: 'Restaurar',
          icon: 'pi pi-refresh',
          command: () => this.restoreProductoEnvase(this.productoenvase)
        }
      );    
    }else{
      this.items.push(
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => this.deleteProductoEnvase(this.productoenvase)
        }
      );
      this.items.push(
        {
          label: 'Editar',
          icon: 'pi pi-eye',
          command: () => this.editProductoEnvase(this.productoenvase)
        },
      );
    }
  }

  loadCategorias() {
    const req = this.CategoriaService.getIndex();
    req.subscribe({
      next: (response) => {
        this.categorias = [this.CategoriaDefecto() , ...response.data]; 
      }
    });
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = this.sortField, sortOrder = this.sortOrder) {
    this.loading = true;
    const req = this.ProductoEnvaseService.getProductoEnvases(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.ProductoEnvases.set(response.data);
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

  onGlobalFilterCategoria(event: any) {
    const categoria = event.value;
    //this.filters = this.filters || {}; 
    this.filters['categoria'] = categoria.id != -1 ? categoria.nombre : null;
    const page =1;
    this.loadDemoData(page);
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.filters = {
      producto: value,
      categoria: this.selectedCategoria.id != -1 ? this.selectedCategoria.nombre : null,
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
    this.productoenvase = {} as ProductoEnvase; // Limpia el formulario
    this.productoenvaseDialog = true; // Abre el modal
  }

  editProductoEnvase(productoenvase: ProductoEnvase) {
    this.productoenvase = { ...productoenvase }; // Carga los datos de la productoenvase seleccionada
    this.productoenvaseDialog = true;
  }

  deleteProductoEnvase(productoenvase: ProductoEnvase) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo el producto envase <strong>${productoenvase.producto.nombre} ${productoenvase.cantidad} ${productoenvase.unidad.nombre_corto}</strong>?`,
      () => {
        const req = this.ProductoEnvaseService.deleteProductoEnvase(productoenvase.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El producto envase ${productoenvase.producto.nombre} ${productoenvase.cantidad} ${productoenvase.unidad.nombre_corto} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreProductoEnvase(productoenvase: ProductoEnvase) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar El producto envase <strong>${productoenvase.producto.nombre} ${productoenvase.cantidad} ${productoenvase.unidad.nombre_corto}</strong>?`,
      () => {
        const req = this.ProductoEnvaseService.restoreProductoEnvase(productoenvase.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El producto envase ${productoenvase.producto.nombre} ${productoenvase.cantidad} ${productoenvase.unidad.nombre_corto} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  ProductoEnvasecloseDialog(event: boolean) {
    this.productoenvaseDialog = event; // Cierra el modal
    this.productoenvase = {} as ProductoEnvase; // Limpia el formulario
    this.loadDemoData();
  }

  onContextMenuHide() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}

