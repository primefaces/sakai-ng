import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Cultivo } from '../../models/cultivo';
import { UtilsService } from '../../../../../../shared/utils.service';
import { CultivoService } from '../../services/cultivo.service';

@Component({
  standalone: false,
  selector: 'app-cultivo-form',
  templateUrl: './cultivo-form.component.html',
  styleUrl: './cultivo-form.component.scss',
  providers: [UtilsService]
})

export class CultivoFormComponent implements OnInit {

  saving: boolean = false; // para saber si se esta guardando 

  constructor(
    public utils: UtilsService,
    private CultivoService: CultivoService
  ) {}

  @Input() visible: boolean = false;
  @Input() cultivo!: Cultivo;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void { }
  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveCultivo() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.cultivo
      }

      const req = this.cultivo.id
        ? this.CultivoService.updateCultivo(Data.id, Data)
        : this.CultivoService.createCultivo(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.cultivo.id;
          const msg = isUpdate ? 'El cultivo ha sido modificada.' :
            `El cultivo ${this.cultivo.nombre} ha sido creado.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.cultivo = {} as Cultivo;
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
