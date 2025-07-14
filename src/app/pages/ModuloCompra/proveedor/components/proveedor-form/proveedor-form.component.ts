import { Component, OnInit ,Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  standalone: false,
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrl: './proveedor-form.component.scss'
})

export class ProveedorFormComponent implements OnInit,OnChanges {

  uploadedFiles: any[] = [];
  selectedFile: string | null = null;
  saving: boolean = false; // para saber si se esta guardando el proveedor

  constructor(
    public  utils: UtilsService,
    private ProveedorService: ProveedorService,
  ) {}

  @Input() visible: boolean = false;
  @Input() proveedor!: Proveedor;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void {}

  closeDialog() {
    this.visibleChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true) {
      this.selectedFile = null; 
    }
  }

  onFileSelected(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result as string;; // Base64
      };
      reader.onerror = (error) => {
        this.utils.showError('Error al cargar la imagen');
        console.error('Error al convertir la imagen:', error);
      };
    }
  }

  saveProveedor() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const ProveedorData = {
        ...this.proveedor,
        telefono: this.proveedor.telefono != null ? String(this.proveedor.telefono) : '',
        image: this.selectedFile,
      }

      const req = this.proveedor.id
        ? this.ProveedorService.updateProveedor(ProveedorData.id, ProveedorData)
        : this.ProveedorService.createProveedor(ProveedorData);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.proveedor.id;
          const msg = isUpdate ? 'El proveedor ha sido modificado.' :
            `El proveedor ${this.proveedor.razon_social} ha sido creado.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.proveedor = {} as Proveedor;
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

