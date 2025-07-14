import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Proveedor } from '../../../proveedor/models/proveedor';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { UtilsService } from '../../../../../../shared/utils.service';
import { EstadoCuenta } from '../../models/estadoCuenta';
import { ProveedorService } from '../../../proveedor/services/proveedor.service';
import { NotaCompra_Detalles } from '../../models/detallecompra';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfiguracionService } from '../../../../ModuloAdministracion/configuracion/services/configuracion.service';
import { Configuracion } from '../../../../ModuloAdministracion/configuracion/models/configuracion';
import { EstadoCuentaDevolucion } from '../../../proveedor/models/EstadoCuenta';
import { NotaDevolucion_Detalles } from '../../../../ModuloDevolucion/nota-devolucion/models/detalledevolucion';

pdfMake.vfs = pdfFonts.vfs;

@Component({
  standalone: false,
  selector: 'app-nota-compra-estado-proveedor',
  templateUrl: './nota-compra-estado-proveedor.component.html',
  styleUrl: './nota-compra-estado-proveedor.component.scss',
  providers: [UtilsService]
})
export class NotaCompraEstadoProveedorComponent  implements OnChanges{

  Configuracion: Configuracion = {} as Configuracion;
  EstadoCuenta: EstadoCuenta = {} as EstadoCuenta;
  EstadoCuentaDevolucion: EstadoCuentaDevolucion = {} as EstadoCuentaDevolucion;
  NotasDetalles: NotaCompra_Detalles[] = [];
  NotasDetallesDevolucion: NotaDevolucion_Detalles[] = [];

  suma: number = 0;
  imageLogo: string = '';

  constructor (
    public utils: UtilsService,
    private ConfiguracionService: ConfiguracionService,
    private ProveedorService: ProveedorService
  ){ 
  }

  @Input() visible: boolean = false;
  @Input() proveedor!: Proveedor;
  @Input() gestion!: Gestion;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.cargarEstadoCuenta();
      this.cargarEstadoCuentaDevolucion();
      this.ConfiguracionService.showConfiguracion().subscribe((response) => {
        this.Configuracion = response;
      });
      this.ConfiguracionService.logobase64().subscribe((response) => {
        this.imageLogo = response;
      });
    }
  }

  cargarEstadoCuenta() {
    this.ProveedorService.EstadoProveedorNotaCompra(this.proveedor.id, this.gestion.id).subscribe(response => {
      this.EstadoCuenta = response;
    });
  }

  cargarEstadoCuentaDevolucion() {
    this.ProveedorService.EstadoProveedorNotaDevolucion(this.proveedor.id, this.gestion.id).subscribe(response => {
      this.EstadoCuentaDevolucion = response;
    });
  }

  generateEstadoCuentaPDF() {
    const reqdevolucion = this.ProveedorService.EstadoCuentaPDFDevolucion(this.proveedor.id, this.gestion.id);
    reqdevolucion.subscribe({
      next: (response) => {
        this.NotasDetallesDevolucion = response;
      },
      complete: () => {
        const req = this.ProveedorService.EstadoCuentaPDF(this.proveedor.id, this.gestion.id);
        req.subscribe({
          next: (response) => {
            this.NotasDetalles = response;
          },
          complete: () => {
            this.informePDF();
          }
        });
      }
    });
    
  }

  
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
                text: `ESTADO DE CUENTA ${(this.proveedor.razon_social).toUpperCase()}`,
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
                text: `AGROAISA (Fertilizantes-Agroquímicos)   Campaña: ${this.gestion.nombre_campania} (${this.gestion.anio})   Moneda: DÓLARES`,
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
        { text: 'CANTIDAD', bold: true },
        { text: 'UNIDAD', bold: true },
        { text: 'ENVASE', bold: true },
        { text: 'CATEGORIA', bold: true },
        { text: 'PRODUCTO', bold: true },
        { text: 'PRECIO UNITARIO', bold: true },
        { text: 'MONTO TOTAL $', bold: true },
        { text: 'NOTA', bold: true }
      ]
    ];
  
    this.NotasDetalles.forEach(nota => {
      tableBody.push([
        {
          text: nota.fecha + (nota.compra_credito == true ? ' (CREDITO)' : ' (CONTADO)') + (nota.firma ? ' (FIRMADO)' : '' + (nota.lugar ? ' (' + nota.lugar + ')' : '')),
          colSpan: 8,
          bold: true,
          fillColor: '#eeeeee',
          alignment: 'center',
          margin: [5, 2, 0, 2]
        } as any, {}, {}, {}, {}, {}, {}, {}
      ]);
  
      nota.detalles_compra.forEach(d => {
        tableBody.push([
          d.cantidad as any,
          d.producto_envase.unidad.nombre_corto,
          d.producto_envase.cantidad + 'X',
          d.producto_envase.producto.categoria.nombre,
          d.producto_envase.producto.nombre + ' (' + d.producto_envase.producto.descripcion + ')',
          {text: '$ ' + d.precio_asignado, alignment: 'right'},
          {text: '$ ' + d.subtotal, alignment: 'right'},
          nota.codigo_factura.toUpperCase()
        ]);
      });
    });

    // Total general venta
    const total = this.NotasDetalles.reduce((acc, nota) => {
      const subtotalNota = nota.detalles_compra.reduce((sum, d) => sum + Number(d.subtotal), 0);
      return acc + subtotalNota;
    }, 0);
  
    tableBody.push([
      {text: '' ,border: [false, false, false, false] } as any, 
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {
        text: 'TOTAL',
        bold: true,
        alignment: 'right',
        fillColor: '#eeeeee',
        margin: [0, 6, 0, 6] // [left, top, right, bottom]
      },
      {
        text: `$ ${total.toFixed(2)}`,
        bold: true,
        alignment: 'right',
        border: [true, true, true, true], // borde completo solo en esta celda
        margin: [0, 6, 0, 6] // [left, top, right, bottom]
      },
      {text: '' ,border: [false, false, false, false] }
    ]);
  
    content.push({
      table: {
        widths: ['auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
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

    // Devoluciones

    content.push({
      table: {
        widths: ['*'],
        body: [
          [
            { text: 'DEVOLUCIONES', bold: true , alignment: 'center',fillColor: '#eeeeee', margin: [0, 0, 0, 0] }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => '#000000',
        vLineColor: () => '#000000'
      }
    });

    const tableBodyDevolucion = [
      [
        { text: 'CANTIDAD', bold: true },
        { text: 'UNIDAD', bold: true },
        { text: 'ENVASE', bold: true },
        { text: 'CATEGORIA', bold: true },
        { text: 'PRODUCTO', bold: true },
        { text: 'PRECIO UNITARIO', bold: true },
        { text: 'MONTO TOTAL $', bold: true },
        { text: 'NOTA', bold: true }
      ]
    ];
  
    this.NotasDetallesDevolucion.forEach(nota => {
      tableBodyDevolucion.push([
        {
          text: nota.fecha + (nota.firma ? ' (FIRMADO)' : '' + (nota.lugar ? ' (' + nota.lugar + ')' : '')),
          colSpan: 8,
          bold: true,
          fillColor: '#eeeeee',
          alignment: 'center',
          margin: [5, 2, 0, 2]
        } as any, {}, {}, {}, {}, {}, {}, {}
      ]);
  
      nota.detalles_devolucion.forEach(d => {
        tableBodyDevolucion.push([
          d.cantidad as any,
          d.producto_envase.unidad.nombre_corto,
          d.producto_envase.cantidad + 'X',
          d.producto_envase.producto.categoria.nombre,
          d.producto_envase.producto.nombre + ' (' + d.producto_envase.producto.descripcion + ')',
          {text: '$ ' + d.precio_asignado, alignment: 'right'},
          {text: '$ ' + d.subtotal, alignment: 'right'},
          nota.codigo_factura.toUpperCase()
        ]);
      });
    });

    // Total general DEVOLUCION
    const totalDevolucion = this.NotasDetallesDevolucion.reduce((acc, nota) => {
      const subtotalNota = nota.detalles_devolucion.reduce((sum, d) => sum + Number(d.subtotal), 0);
      return acc + subtotalNota;
    }, 0);
  
    tableBodyDevolucion.push([
      {text: '' ,border: [false, false, false, false] } as any, 
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {text: '' ,border: [false, false, false, false] },
      {
        text: 'TOTAL',
        bold: true,
        alignment: 'right',
        fillColor: '#eeeeee',
        margin: [0, 6, 0, 6] // [left, top, right, bottom]
      },
      {
        text: `$ ${totalDevolucion.toFixed(2)}`,
        bold: true,
        alignment: 'right',
        border: [true, true, true, true], // borde completo solo en esta celda
        margin: [0, 6, 0, 6] // [left, top, right, bottom]
      },
      {text: '' ,border: [false, false, false, false] }
    ]);

    content.push({
      table: {
        widths: ['auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
        body: tableBodyDevolucion
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => '#000000',
        vLineColor: () => '#000000'
      },
      margin: [0, 0, 0, 10]
    });
  
    
  
    // Créditos
    content.push(
      { text: '\nESTADO X PAGAR', bold: true },
      {
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'NOTA', bold: true },
              { text: 'CAP.TOTAL COMPRA', bold: true },
              { text: 'CAP.TOTAL DEVOLUCION', bold: true },
              { text: 'INTERES', bold: true },
              { text: 'TOTAL LIQUIDO', bold: true }
            ],
            ['', `$ ${total.toFixed(2)}`, `$ ${totalDevolucion.toFixed(2)}`, '0', `$ ${(total - totalDevolucion).toFixed(2)}`]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#000000',
          vLineColor: () => '#000000'
        },
        margin: [0, 10, 0, 10]
      }
    );
  
    // Total libro con fondo verde
    content.push({
      table: {
        widths: ['*', 'auto'],
        body: [
          [
            { text: 'TOTAL LIBRO', bold: true },
            { text: `$ ${(total - totalDevolucion).toFixed(2)}`, fillColor: '#00FF66', bold: true }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => '#000000',
        vLineColor: () => '#000000'
      }
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
    
    const fileName = `ESTADO_CUENTA_COMPRAS_${this.gestion.nombre_campania}(${this.gestion.anio})_${this.proveedor.razon_social}__${fechaHora}.pdf`;
    
    pdfMake.createPdf(docDefinition).download(fileName);

  }

  
}
