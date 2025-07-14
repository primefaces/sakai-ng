import { Component, OnInit ,signal} from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { InventarioProductoEnvase } from '../../models/inventario';
import { UtilsService } from '../../../../../../shared/utils.service';
import { CategoriaService } from '../../../../ModuloProducto/categoria/services/categoria.service';
import { Categoria } from '../../../../ModuloProducto/categoria/models/categoria';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfiguracionService } from '../../../../ModuloAdministracion/configuracion/services/configuracion.service';
pdfMake.vfs = pdfFonts.vfs;

@Component({
  standalone: false,
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.scss',
  providers: [UtilsService]
})

export class InventarioListComponent implements OnInit {
  InventarioProductoEnvases = signal<InventarioProductoEnvase[]>([]);
  InventarioProductoEnvasesInforme: InventarioProductoEnvase[] = [];
  firstRecord: number = 0; // Índice del primer registro visible
  currentPage: number = 1; // Página actual
  perPage: number = 10; // Elementos por página ejemplo [5,10,25]
  totalRecords: number = 0; // Total de registros en la BD
  loading: boolean = false; // Para mostrar el indicador de carga
  filters: any = {}; // filtro para los datos
  sortField!: string; // columna a ordenar
  sortOrder!: string; // modo de ordenar asc y desc


  InventarioProductoEnvase!: InventarioProductoEnvase;
  InventarioProductoEnvaseDialog: boolean = false; 

  Categorias: Categoria[] = [];
  selectedCategoria: Categoria = this.CategoriaDefecto();

  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];

  imageLogo: string = '';

  constructor(
    public utils: UtilsService,
    private InventarioService: InventarioService,
    private CategoriaService: CategoriaService,
    private ConfiguracionService: ConfiguracionService,
  ) {

  }

  
  ngOnInit(): void {
    this.loadCategorias();
    this.loadDemoData();
    this.ConfiguracionService.logobase64().subscribe((response) => {
      this.imageLogo = response;
    });
  }

  CategoriaDefecto(): Categoria {
    const categoriaGeneral: Categoria = {
      id: -1,
      nombre: 'Todos',
      estado: true,
    };
    return categoriaGeneral;
  } 

  loadCategorias() {
    const req = this.CategoriaService.getIndex();
    req.subscribe({
      next: (response) => {
        this.Categorias = [this.CategoriaDefecto() , ...response.data]; 
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
    const req = this.InventarioService.getInventarioProductoEnvases(page,rows,filters,sortField,sortOrder);
    req.subscribe({
      next: (response) => {
        this.InventarioProductoEnvases.set(response.data);
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
    this.InventarioProductoEnvase = {} as InventarioProductoEnvase; // Limpia el formulario
    this.InventarioProductoEnvaseDialog = true; // Abre el modal
  }

  ProductoEnvasecloseDialog(event: boolean) {
    this.InventarioProductoEnvaseDialog = event; // Cierra el modal
    this.InventarioProductoEnvase = {} as InventarioProductoEnvase; // Limpia el formulario
    this.loadDemoData();
  }

  generateEstadoInventarioPDF() {
    const req = this.InventarioService.GetInventarioCategoria(this.filters);
    req.subscribe({
      next: (response) => {
        this.InventarioProductoEnvasesInforme = response.data;
      },
      complete: () => {
        this.informePDF();
      }
    });
  };


  informePDF() {
      const content: any[] = [
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  image: 'logoAgroaisa',
                  rowSpan: 2,
                  fit: [100, 60],
                  alignment: 'left',
                  margin: [0, 5, 0, 5],
                  border: [true, true, true, true]
                },
                {
                  text: `INVENTARIO DE PRODUCTOS`,
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                  margin: [0, 10, 0, 5],
                  border: [true, true, true, true]
                }
              ],
              [
                {},
                {
                  text: `AGROAISA (Fertilizantes-Agroquímicos) Categoria: ${this.selectedCategoria.id != -1 ? this.selectedCategoria.nombre : 'GENERAL'}`,
                  alignment: 'center',
                  fontSize: 10,
                  margin: [0, 0, 0, 10],
                  border: [true, true, true, true]
                }
              ]
            ]
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5
          }
        }
      ];
      
     
      const tableBody = [
        [
          { text: 'UNIDAD', bold: true },
          { text: 'ENVASE', bold: true },
          { text: 'CATEGORIA', bold: true },
          { text: 'PRODUCTO', bold: true },
          { text: 'CANT. PRODUCTO VENDIDO', bold: true },
          { text: 'CANT. PRODUCTO COMPRADO', bold: true },
          { text: 'STOCK', bold: true }
        ]
      ];
    
      this.InventarioProductoEnvasesInforme.forEach(d => {
          tableBody.push([
            d.unidad.nombre_corto as any,
            d.cantidad + 'X',
            d.producto.categoria.nombre,
            d.producto.nombre + ' (' + d.producto.descripcion + ')',
            {text: d.sumTotalProductoVendido + ' '+ d.unidad.nombre_corto, alignment: 'right'},
            {text: d.sumTotalProductoComprado + ' '+ d.unidad.nombre_corto, alignment: 'right'},
            d.stockActual + ' ' + d.unidad.nombre_corto
          ]);
      });
    
      content.push({
        table: {
          widths: ['auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
          body: tableBody
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#000000',
          vLineColor: () => '#000000'
        },
        margin: [0, 0, 0, 10]
      });

    
      const docDefinition = {
        content,
        pageSize: 'LETTER' as 'LETTER',
        pageOrientation: 'landscape' as 'landscape',
        styles: {
          title: { fontSize: 16, bold: true },
          subheader: { fontSize: 10 },
        },
        images: {
          logoAgroaisa: this.imageLogo
        },
        defaultStyle: {
          fontSize: 9
        }
      };
    
      const fecha = new Date();
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const ampm = horas >= 12 ? 'PM' : 'AM';
      const horas12 = (horas % 12 || 12).toString().padStart(2, '0'); // convierte 0 en 12
  
      const fechaHora = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}_${horas12}-${minutos}_${ampm}`;
      
      const fileName = `INVENTARIO_PRODUCTOS_${this.selectedCategoria.id != -1 ? this.selectedCategoria.nombre : 'GENERAL'}_${fechaHora}.pdf`;
      
      pdfMake.createPdf(docDefinition).download(fileName);
  
    }

}

