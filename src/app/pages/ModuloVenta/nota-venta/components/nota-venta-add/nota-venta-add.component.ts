import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, signal
} from '@angular/core';
import { NotaVenta } from '../../models/notaventa';
import { DetalleNotaVenta } from '../../models/detalleventa';
import { ProductoEnvase } from '../../../../ModuloProducto/producto-envase/models/ProductoEnvase';
import { NotaVentaService } from '../../services/nota-venta.service';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { ProductoEnvaseService } from '../../../../ModuloProducto/producto-envase/services/producto-envase.service';
import { CategoriaService } from '../../../../ModuloProducto/categoria/services/categoria.service';
import { UtilsService } from '../../../../../../shared/utils.service';


@Component({
  standalone: false,
  selector: 'app-nota-venta-add',
  templateUrl: './nota-venta-add.component.html',
  styleUrl: './nota-venta-add.component.scss',
  providers: [UtilsService]
})
export class NotaVentaAddComponent implements OnInit, OnChanges {
  ProductoEnvasesAdd = signal<ProductoEnvase[]>([]);
  firstRecord = 0;
  currentPage = 1;
  perPage = 10;
  totalRecords = 0;
  loading = false;
  filters: any = {};
  sortField!: string;
  sortOrder!: string;

  categorias: any[] = [];
  selectedCategoria: any = null;

  ProductoEnvaseSelected: ProductoEnvase = {} as ProductoEnvase;
  detalleDialogVisible = false;
  saving = false; // para saber si se esta guardando el detalle
  eliminandoId: number | null = null; // para saber si es esta anulando el detalle
  margenSugerido = 0;
  margenMinimo = 0;
  margenMaximo = 0;
  margenStandar = 0;
  DetalleNotaVentaSelected: DetalleNotaVenta = {} as DetalleNotaVenta;
  detalles: DetalleNotaVenta[] = [];

  layout: 'list' | 'grid' = 'grid';

  @Input() visible = false;
  @Input() nota_venta!: NotaVenta;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(
    public Utils: UtilsService,
    private CategoriaService: CategoriaService,
    private ProductoEnvaseService: ProductoEnvaseService,
    private NotaVentaService: NotaVentaService,
    private DetalleVentaService: DetalleVentaService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.selectedCategoria = { id: null, nombre: "Todos" };
      this.filters = {
        NotaVenta_id: this.nota_venta.id,
        categoria: null
      };
      this.loadTablaDetallesData();
      this.loadDemoData();
      this.loadCategorias();
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  AddProductoEnvaseToNotaVenta(pe: ProductoEnvase, detalle: DetalleNotaVenta = {} as DetalleNotaVenta) {
    this.ProductoEnvaseSelected = { ...pe };
    const precio = Number(pe.precio_estimado);
    this.margenStandar = this.calcularMargen(precio, pe.margen_standar);
    this.margenMinimo = this.calcularMargen(precio, pe.margen_minimo);
    this.margenMaximo = this.calcularMargen(precio, pe.margen_maximo);
    this.margenSugerido = this.margenStandar;

    if (!detalle.id) {
      Object.assign(detalle, {
        nota_venta_id: this.nota_venta.id,
        producto_envase_id: pe.id,
        precio_asignado: this.margenSugerido,
        cantidad: 1
      });
    }

    this.DetalleNotaVentaSelected = { ...detalle };
    this.detalleDialogVisible = true;
  }

  saveDetalleNotaVenta() {
    if (this.saving) return; // prevención por doble click
    this.saving = true;

    const req = this.DetalleNotaVentaSelected.id
      ? this.DetalleVentaService.UpdateDetalleNotaVenta(this.DetalleNotaVentaSelected)
      : this.DetalleVentaService.AddDetalleNotaVenta(this.DetalleNotaVentaSelected);

    req.subscribe({
      next: () => {
        this.loadTablaDetallesData();
        this.loadDemoData();
        this.detalleDialogVisible = false;
        const isUpdate = !!this.DetalleNotaVentaSelected.id;
        const msg = isUpdate ? 'Se ha modificado el detalle.' :
          `Se añadió el producto ${this.ProductoEnvaseSelected.producto.nombre} ${this.ProductoEnvaseSelected.cantidad} ${this.ProductoEnvaseSelected.unidad.nombre_corto}.`;
        this.Utils.showSuccess(msg);
        this.DetalleNotaVentaSelected = {} as DetalleNotaVenta;
      },
      error: () => {
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
      }
    });
  }

  AnularProductoEnvaseToNotaVenta(detalle: DetalleNotaVenta) {
    if (this.eliminandoId !== null) return; // Evita doble click
    this.eliminandoId = detalle.id;

    this.DetalleVentaService.DeleteDetalleNotaVenta(detalle).subscribe({
      next: () => {
        this.loadTablaDetallesData();
        this.loadDemoData();
        this.Utils.showSuccess('Se ha eliminado el producto del detalle.');
      },
      error: () => {
        this.eliminandoId = null;
      },  
      complete: () => {
        this.eliminandoId = null;
      }
    });
  }

  cancelProductoEnvase() {
    this.detalleDialogVisible = false;
    this.ProductoEnvaseSelected = {} as ProductoEnvase;
  }

  calcularMargen(precio: number, margen: number): number {
    return Number((precio + (margen / 100) * precio).toFixed(2));
  }

  loadCategorias() {
    this.CategoriaService.getIndex().subscribe(response => {
      this.categorias = [{ id: null, nombre: "Todos" }, ...response.data];
    });
  }

  onGlobalFilterCategoria(event: any) {
    this.filters['categoria'] = event.value?.id != null ? event.value.nombre : null;
    this.loadDemoData(1);
  }

  onPageChange(event: any) {
    this.firstRecord = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.loadDemoData();
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.filters = {
      producto: value,
      categoria: this.selectedCategoria?.id != null ? this.selectedCategoria.nombre : null,
      NotaVenta_id: this.nota_venta.id
    };
    const page = 1;
    this.loadDemoData(page);
  }

  onSortChange(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order === 1 ? 'asc' : 'desc';
    this.loadDemoData();
  }

  loadDemoData(page = this.currentPage, rows = this.perPage, filters = this.filters, sortField = this.sortField, sortOrder = this.sortOrder) {
    this.loading = true;
    filters['estado'] = 1;
    const req = this.ProductoEnvaseService.getProductoEnvases(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.ProductoEnvasesAdd.set(response.data);
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

  loadTablaDetallesData() {
    this.NotaVentaService.getDetallesNota(this.nota_venta).subscribe(response => {
      this.detalles = response;
    });
  }

}
