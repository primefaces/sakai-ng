import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Producto } from '../../models/producto';
import { Categoria } from '../../../categoria/models/categoria';
import { TipoProducto } from '../../../tipo-producto/models/TipoProducto';
import { CategoriaService } from '../../../categoria/services/categoria.service';
import { TipoProductoService } from '../../../tipo-producto/services/tipo-producto.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { ProductoService } from '../../services/producto.service';


@Component({
  standalone: false,
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss',
  providers: [UtilsService]
})

export class ProductoFormComponent implements OnInit {
  categorias: Categoria[] = [];
  tiposProductos: TipoProducto[] = [];

  saving: boolean = false; // para saber si se esta guardando 
  constructor(
    public utils: UtilsService,
    private CategoriaService: CategoriaService,
    private TipoProductoService: TipoProductoService,
    private ProductoService: ProductoService
  ) {}

  @Input() visible: boolean = false;
  @Input() producto!: Producto;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.CategoriaService.getIndex().subscribe(response => {
      this.categorias = response.data;
    });
    this.TipoProductoService.getIndex().subscribe(response => {
      this.tiposProductos = response.data ;
    });
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveProducto() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.producto,
        categoria_id: this.producto.categoria?.id || null,
        tipo_producto_id: this.producto.tipo_producto?.id || null
      }

      const req = this.producto.id
        ? this.ProductoService.updateProducto(Data.id, Data)
        : this.ProductoService.createProducto(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.producto.id;
          const msg = isUpdate ? 'El producto ha sido modificada.' :
            `El producto ${this.producto.nombre} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.producto = {} as Producto;
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
}