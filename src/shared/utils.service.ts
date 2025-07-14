import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
  
})
export class UtilsService {

  private imageUrl = `${environment.backend.imageHost}`;
  constructor(
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    
  ) {}

  getSeverity(status: boolean, opcion: number = 0) {
    if (opcion === 1) { // para nota venta
      return status ? 'info' : 'warn';
    }
    // para otros casos general
    return status ? 'success' : 'warn';
  }

  getStatus(status: boolean,opcion: number = 0) {
    if (opcion === 1) { // para nota venta
      return status ? 'FIRMADO' : 'SIN FIRMA';
    }
    if (opcion === 2) { 
      return status ? 'EN PROCESO' : 'PENDIENTE';
    }
    // para otros casos general
    return status ? 'ACTIVO' : 'INACTIVO';
  }

  showSuccess(detail: string,summary: string = 'Éxito') {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail,
      icon: 'pi pi-check-circle'
    });
  }

  showInfo(detail: string,summary: string = 'Cancelado') {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail,
      icon: 'pi pi-info-circle'
    });
  }

  showError(detail: string,summary: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail,
      icon: 'pi pi-times-circle'
    });
  }

  getImageUrl(imagePath: string | null,ref: string): string {
    return imagePath ?  `${this.imageUrl}/${imagePath}` : `${this.imageUrl}/${ref}`;
  }

  confirmarAccion(mensaje: string,accion: () => void,header: string = 'Confirmar Acción') {
    this.confirmationService.confirm({
      message: mensaje,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        accion();
      },
      reject: () => {
        const msg = `No se realizó ningún cambio..`;
        this.showInfo(msg);
      }
    });
  }

}
