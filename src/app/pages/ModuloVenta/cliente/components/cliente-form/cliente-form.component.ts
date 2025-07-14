import { Component, OnInit ,Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { UtilsService } from '../../../../../../shared/utils.service';
import { Cliente } from '../../models/cliente';

@Component({
  standalone: false,
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})

export class ClienteFormComponent implements OnInit,OnChanges {

  uploadedFiles: any[] = [];
  selectedFile: string | null = null;
  saving: boolean = false; // para saber si se esta guardando el cliente

  constructor(
    public  utils: UtilsService,
    private ClienteService: ClienteService,
  ) {}

  @Input() visible: boolean = false;
  @Input() cliente!: Cliente;
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

  saveCliente() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const ClienteData = {
        ...this.cliente,
        ci: this.cliente.ci != null ? String(this.cliente.ci) : '',
        telefono: this.cliente.telefono != null ? String(this.cliente.telefono) : '',
        image: this.selectedFile,
      }

      const req = this.cliente.id
        ? this.ClienteService.updateCliente(ClienteData.id, ClienteData)
        : this.ClienteService.createCliente(ClienteData);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.cliente.id;
          const msg = isUpdate ? 'El cliente ha sido modificado.' :
            `El cliente ${this.cliente.nombre} ${this.cliente.paterno} ${this.cliente.materno} ha sido creado.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.cliente = {} as Cliente;
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

