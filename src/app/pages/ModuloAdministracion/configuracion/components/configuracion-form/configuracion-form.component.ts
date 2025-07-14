import { Component } from '@angular/core';
import { UtilsService } from '../../../../../../shared/utils.service';
import { GestionService } from '../../../../ModuloVenta/gestion/services/gestion.service';
import { Configuracion } from '../../models/configuracion';
import { Gestion } from '../../../../ModuloVenta/gestion/models/gestion';
import { ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-configuracion-form',
  standalone: false,
  templateUrl: './configuracion-form.component.html',
  styleUrl: './configuracion-form.component.scss',
  providers: [UtilsService]
})
export class ConfiguracionFormComponent {
 constructor(
  public utils: UtilsService,
  private GestionService: GestionService,
  private ConfiguracionService: ConfiguracionService
 )
  {
    this.ConfiguracionActual();
    this.Cargargestiones();
  }
 
  configuracion: Configuracion = { } as Configuracion;
  gestiones: Gestion[] = [];
  selectedGestion: Gestion = {} as Gestion;

  logoPreview: string | ArrayBuffer | null = null;
  saving = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarConfiguracion(){
    if (this.saving) return; // prevención por doble click
      this.saving = true;
      
      this.configuracion.id_gestion = this.selectedGestion.id; 
      const Data = {
        ...this.configuracion,
        logo: this.logoPreview ? this.logoPreview as string: ''
      }
  
      const req = this.ConfiguracionService.updateConfiguracion(Data) ;
  
      req.subscribe({
        next: () => {
          const msg ='Se actualizo la configuracion.';
          this.utils.showSuccess(msg,'Actualizado');
        },
        error: () => {
          this.saving = false;
        },
        complete: () => {
          this.saving = false;
        }
    });
  }

  Cargargestiones(){
    this.GestionService.getIndex().subscribe(
      (response) => {
        this.gestiones = response.data;
      }
    );
  }

  ConfiguracionActual(){
    const req = this.ConfiguracionService.showConfiguracion();
      req.subscribe({
        next: (response) => {
         this.configuracion = response;
         this.selectedGestion = this.configuracion.gestion; 
        }
    });
  }

}
