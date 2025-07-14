import { Component, OnInit ,signal} from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../models/unidad';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.scss'],
  providers: [UtilsService]
})

export class UnidadListComponent implements OnInit {
  unidades = signal<Unidad[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  unidad!: Unidad;
  unidadDialog: boolean = false; 
  
  constructor(
    public utils: UtilsService,
    private UnidadService: UnidadService
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
    const req = this.UnidadService.getUnidades(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.unidades.set(response.data);
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
        nombre_corto: value
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
    this.unidad = {} as Unidad; // Limpia el formulario
    this.unidadDialog = true; // Abre el modal
  }

  editUnidad(unidad: Unidad) {
    this.unidad = { ...unidad }; // Carga los datos de la unidad seleccionada
    this.unidadDialog = true;
  }

  deleteUnidad(unidad: Unidad) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo la unidad <strong>${unidad.nombre}</strong>?`,
      () => {
        const req = this.UnidadService.deleteUnidad(unidad.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La unidad ${unidad.nombre} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreUnidad(unidad: Unidad) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar la unidad <strong>${unidad.nombre}</strong>?`,
      () => {
        const req = this.UnidadService.restoreUnidad(unidad.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La unidad ${unidad.nombre} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  UnidadcloseDialog(event: boolean) {
    this.unidadDialog = event; // Cierra el modal
    this.unidad = {} as Unidad; // Limpia el formulario
    this.loadDemoData();
  }
  
}
