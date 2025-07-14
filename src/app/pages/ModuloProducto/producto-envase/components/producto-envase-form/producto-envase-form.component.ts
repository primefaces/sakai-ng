import { Component ,Input, Output, EventEmitter, signal, SimpleChanges, OnChanges} from '@angular/core';
import { ProductoEnvase } from '../../models/ProductoEnvase';
import { Producto } from '../../../producto/models/producto';
import { Unidad } from '../../../unidad/models/unidad';
import { ProductoService } from '../../../producto/services/producto.service';
import { UnidadService } from '../../../unidad/services/unidad.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { ProductoEnvaseService } from '../../services/producto-envase.service';

@Component({
  standalone: false,
  selector: 'app-producto-envase-form',
  templateUrl: './producto-envase-form.component.html',
  styleUrl: './producto-envase-form.component.scss',
  providers: [UtilsService]
})

export class ProductoEnvaseFormComponent implements OnChanges {
  productos = signal<Producto[]>([]);
  unidades: Unidad[] = [];
  // productos 
  perPage: number = 6; // Elementos por página ejemplo [5,10,25]
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any; // filtro para los datos

  uploadedFiles: any[] = [];
  selectedFile: string | null = null;

  saving: boolean = false; // para saber si se esta guardando
  
  constructor(
    public utils: UtilsService,
    private ProductoService: ProductoService,
    private ProductoEnvaseService: ProductoEnvaseService,
    private UnidadService: UnidadService,
  ) {}

  @Input() visible: boolean = false;
  @Input() producto_envase!: ProductoEnvase;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.loadDemoDataProducto();
      this.UnidadService.getIndex().subscribe(response => {
        this.unidades = response.data ;
      });
      this.selectedFile = null;  
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }
  // Guardar la imagen cuando el usuario la selecciona
  onFileSelected(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result as string;; // Base64
      };
      reader.onerror = (error) => {
        console.error('Error al convertir la imagen:', error);
      };
    }
  }

  saveProductoEnvase() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.producto_envase,
        producto_id: this.producto_envase.producto?.id || null, 
        unidad_id: this.producto_envase.unidad?.id || null,
        image: this.selectedFile,
      }

      const req = this.producto_envase.id
        ? this.ProductoEnvaseService.updateProductoEnvase(Data.id, Data)
        : this.ProductoEnvaseService.createProductoEnvase(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.producto_envase.id;
          const msg = isUpdate ? 'La categoria ha sido modificada.' :
            `El producto envase ${this.producto_envase.producto.nombre} - ${this.producto_envase.cantidad} ${this.producto_envase.unidad.nombre_corto} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.producto_envase = {} as ProductoEnvase;
        },
        error: () => {
          this.saving = false;
        },
        complete: () => {
          this.saving = false;
          this.closeDialog();
        }
    });
  }

  loadDemoDataProducto(page: number = 1, rows: number = this.perPage ,filters: any = {},sortField: string = '', sortOrder: string = '') {
    this.loading = true;
    this.ProductoService.getProductos(page,rows,filters,sortField,sortOrder).subscribe(response => {
      this.productos.set(response.data);
      //console.log('productos = ',this.productos());
      this.loading = false;
    });
  }

  onGlobalFilter(event: any) {
    const value = event.filter?.trim() || '';
    this.filters = {
        nombre: value
    };
    const page =1;
    this.loadDemoDataProducto(page, this.perPage,this.filters,'','');
  }

  get calcularPrecioMinimoConMargen(): number {
    const precio = Number(this.producto_envase?.precio_estimado);
    const margen = Number(this.producto_envase?.margen_minimo);
    if (isNaN(precio) || isNaN(margen)) return 0;
    const precioFinal = precio + (precio * (margen / 100));
    return parseFloat(precioFinal.toFixed(2));
  }

  get calcularPrecioMaximoConMargen(): number {
    const precio = Number(this.producto_envase?.precio_estimado);
    const margen = Number(this.producto_envase?.margen_maximo);
    if (isNaN(precio) || isNaN(margen)) return 0;
    const precioFinal = precio + (precio * (margen / 100));
    return parseFloat(precioFinal.toFixed(2));
  }

  get calcularPrecioStandarConMargen(): number {
    const precio = Number(this.producto_envase?.precio_estimado);
    const margen = Number(this.producto_envase?.margen_standar);
    if (isNaN(precio) || isNaN(margen)) return 0;
    const precioFinal = precio + (precio * (margen / 100));
    return parseFloat(precioFinal.toFixed(2));
  }

}