import { Component, OnInit ,signal} from '@angular/core';
import { CultivoService } from '../../services/cultivo.service';
import { Cultivo } from '../../models/cultivo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-cultivo-list',
  templateUrl: './cultivo-list.component.html',
  styleUrl: './cultivo-list.component.scss',
  providers: [UtilsService]
})

export class CultivoListComponent implements OnInit {
  cultivos = signal<Cultivo[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  cultivo!: Cultivo;

  cultivoDialog: boolean = false; 
  
  constructor(
    public utils: UtilsService,
    private cultivoService: CultivoService
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
    const req = this.cultivoService.getCultivos(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.cultivos.set(response.data);
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
    this.cultivo = {} as Cultivo; // Limpia el formulario
    this.cultivoDialog = true; // Abre el modal
  }

  editCultivo(cultivo: Cultivo) {
    this.cultivo = { ...cultivo }; // Carga los datos de la cultivo seleccionada
    this.cultivoDialog = true;
  }

  deleteCultivo(cultivo: Cultivo) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo el cultivo <strong>${cultivo.nombre}</strong>?`,
      () => {
        const req = this.cultivoService.deleteCultivo(cultivo.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El cultivo ${cultivo.nombre} ha sido inactivada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreCultivo(cultivo: Cultivo) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar el cultivo <strong>${cultivo.nombre} </strong>?`,
      () => {
        const req = this.cultivoService.restoreCultivo(cultivo.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El cultivo ${cultivo.nombre} ha sido activada.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  CultivocloseDialog(event: boolean) {
    this.cultivoDialog = event; // Cierra el modal
    this.cultivo = {} as Cultivo; // Limpia el formulario
    this.loadDemoData();
  }
}
