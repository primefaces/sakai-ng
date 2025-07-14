import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Categoria } from '../../models/categoria';
import { UtilsService } from '../../../../../../shared/utils.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  standalone: false,
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  providers: [UtilsService]
})

export class CategoriaFormComponent implements OnInit {

  saving: boolean = false; // para saber si se esta guardando 
  constructor(
    public utils: UtilsService,
    private CategoriaService: CategoriaService
  ) {}

  @Input() visible: boolean = false;
  @Input() categoria!: Categoria;
  @Output() visibleChange = new EventEmitter<boolean>();

  ngOnInit(): void {}
  
  closeDialog() {
    this.visibleChange.emit(false);
  }

  saveCategoria() { 
    if (this.saving) return; // prevención por doble click
      this.saving = true;
  
      const Data = {
        ...this.categoria
      }

      const req = this.categoria.id
        ? this.CategoriaService.updateCategoria(Data.id, Data)
        : this.CategoriaService.createCategoria(Data);
  
      req.subscribe({
        next: () => {
          const isUpdate = !!this.categoria.id;
          const msg = isUpdate ? 'La categoria ha sido modificada.' :
            `La categoria ${this.categoria.nombre} ha sido creada.`;
          this.utils.showSuccess(msg, isUpdate ? 'Actualizado' : 'Creado');
          this.categoria = {} as Categoria;
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