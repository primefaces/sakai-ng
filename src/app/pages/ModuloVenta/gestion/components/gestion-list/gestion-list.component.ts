
import { Component, OnInit ,signal} from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { Gestion } from '../../models/gestion';
import { UtilsService } from '../../../../../../shared/utils.service';

@Component({
  standalone: false,
  selector: 'app-gestion-list',
  templateUrl: './gestion-list.component.html',
  styleUrls: ['./gestion-list.component.scss'],
  providers: [UtilsService]
})

export class GestionListComponent implements OnInit {
  gestiones = signal<Gestion[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  gestion!: Gestion;

  gestionDialog: boolean = false; 
  
  constructor(
    public utils: UtilsService,
    private gestionService: GestionService,
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
    const req = this.gestionService.getGestiones(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.gestiones.set(response.data);
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
        anio: value,
        nombre_campania: value
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
    this.gestion = {} as Gestion; // Limpia el formulario
    this.gestionDialog = true; // Abre el modal
  }

  editGestion(gestion: Gestion) {
    this.gestion = { ...gestion }; // Carga los datos de la gestion seleccionada
    this.gestionDialog = true;
  }

  deleteGestion(gestion: Gestion) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo la gestion <strong>${gestion.anio} ${gestion.nombre_campania}</strong>?`,
      () => {
        const req = this.gestionService.deleteGestion(gestion.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La gestion ${gestion.anio} ${gestion.nombre_campania} ha sido inactivada..`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreGestion(gestion: Gestion) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar la gestion <strong>${gestion.anio} ${gestion.nombre_campania}</strong>?`,
      () => {
        const req = this.gestionService.restoreGestion(gestion.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `La gestion ${gestion.anio} ${gestion.nombre_campania} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  GestioncloseDialog(event: boolean) {
    this.gestionDialog = event; // Cierra el modal
    this.gestion = {} as Gestion; // Limpia el formulario
    this.loadDemoData();
  }
}
