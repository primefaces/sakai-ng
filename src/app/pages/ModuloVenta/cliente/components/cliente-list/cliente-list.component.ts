import { Component, OnInit ,signal} from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { UtilsService } from '../../../../../../shared/utils.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss',
  providers: [UtilsService]
})

export class ClienteListComponent implements OnInit {
  clientes = signal<Cliente[]>([]);
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 5; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc

  cliente!: Cliente;

  clienteDialog: boolean = false; 
  
  constructor(
    public  utils: UtilsService,
    private clienteService: ClienteService,
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
    const req = this.clienteService.getClientes(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.clientes.set(response.data);
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
      paterno: value,
      materno: value,
      direccion: value,
      telefono: value,
      ci: value,
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
    this.cliente = {} as Cliente; // Limpia el formulario
    this.clienteDialog = true; // Abre el modal
  }

  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente }; // Carga los datos de la cliente seleccionada
    this.clienteDialog = true;
  }

  deleteCliente(cliente: Cliente) {
    this.utils.confirmarAccion(
      `¿Estás seguro de poner en inactivo al cliente <strong>${cliente.nombre} ${cliente.paterno} ${cliente.materno} </strong>?`,
      () => {
        const req = this.clienteService.deleteCliente(cliente.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El cliente ${cliente.nombre} ${cliente.paterno} ${cliente.materno} ha sido inactivado.`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  restoreCliente(cliente: Cliente) {
    this.utils.confirmarAccion(
      `¿Estás seguro de restaurar al cliente <strong>${cliente.nombre} ${cliente.paterno} ${cliente.materno} </strong>?`,
      () => {
        const req = this.clienteService.restoreCliente(cliente.id);
        req.subscribe({
          next: () => {
            this.loadDemoData();
          },
          complete: () => {
            const msg = `El cliente ${cliente.nombre} ${cliente.paterno} ${cliente.materno} ha sido activado..`;
            this.utils.showSuccess(msg);
          }
        });  
      }
    );
  }

  ClientecloseDialog(event: boolean) {
    this.clienteDialog = event; // Cierra el modal
    this.cliente = {} as Cliente; // Limpia el formulario
    this.loadDemoData();
  }

  navigateToClienteVenta(cliente: Cliente) {
    this.router.navigate(['/NotaVenta/grupo', cliente.codigo]);
  }
  navigateToClienteDevolucion(cliente: Cliente) {
    this.router.navigate(['/NotaDevolucion/grupo', cliente.codigo ,1]);
  }
}
