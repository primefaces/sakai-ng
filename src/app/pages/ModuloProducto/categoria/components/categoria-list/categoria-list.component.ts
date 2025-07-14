import { Component, OnInit ,signal} from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  standalone: false,
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss',
  providers: [UtilsService]
})

export class CategoriaListComponent implements OnInit {
  categorias = signal<Categoria[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any= {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  categoria!: Categoria;
  categoriaDialog: boolean = false; 

  constructor(
    public utils: UtilsService,
    private CategoriaService: CategoriaService,
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
    const req = this.CategoriaService.getCategorias(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.categorias.set(response.data);
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
    this.categoria = {} as Categoria; // Limpia el formulario
    this.categoriaDialog = true; // Abre el modal
  }

  editCategoria(categoria: Categoria) {
    this.categoria = { ...categoria }; // Carga los datos de la categoria seleccionada
    this.categoriaDialog = true;
  }

  deleteCategoria(categoria: Categoria) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo la categoria <strong>${categoria.nombre}</strong>?`,
      () => {
        const req = this.CategoriaService.deleteCategoria(categoria.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La categoria ${categoria.nombre} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreCategoria(categoria: Categoria) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar la categoria <strong>${categoria.nombre}</strong>?`,
      () => {
        const req = this.CategoriaService.restoreCategoria(categoria.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La categoria ${categoria.nombre} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  CategoriacloseDialog(event: boolean) {
    this.categoriaDialog = event; // Cierra el modal
    this.categoria = {} as Categoria; // Limpia el formulario
    this.loadDemoData();
  }

}
