import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

enum BlockView {
  PREVIEW,
  CODE
}

@Component({
  selector: 'block-viewer',
  template: `
    <div class="block-section">
        <div class="block-header">
            <span class="block-title">
                <span>{{header}}</span>
                <span class="badge-free" *ngIf="free">Free</span>
                <span class="badge-new" *ngIf="new">New</span>
            </span>
            <div class="block-actions">
                <a tabindex="0" [ngClass]="{'block-action-active': blockView == BlockView.PREVIEW}" (click)="activateView($event, BlockView.PREVIEW)"><span>Preview</span></a>
                <a [attr.tabindex]="codeDisabled ? null: '0'" [ngClass]="{'block-action-active': blockView == BlockView.CODE, 'block-action-disabled': codeDisabled}" (click)="activateView($event, BlockView.CODE)">
                    <i class="pi pi-lock" *ngIf="codeDisabled"></i>
                    <span>Code</span>
                </a>
                <a [attr.tabindex]="codeDisabled ? null: '0'" class="block-action-copy" [ngClass]="{'block-action-disabled': codeDisabled}" (click)="copyCode($event)" 
                    pTooltip="Copied to clipboard" tooltipEvent="focus" tooltipPosition="bottom" [tooltipDisabled]="codeDisabled"><i class="pi pi-copy"></i></a>
            </div>
        </div>
        <div class="block-content">
            <div [class]="containerClass" [ngStyle]="previewStyle" *ngIf="blockView == BlockView.PREVIEW">
                <ng-content></ng-content>
            </div>
            <div *ngIf="blockView == BlockView.CODE && !codeDisabled">
                <app-code lang="markup" ngPreserveWhitespaces>{{code}}
                </app-code>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./blockviewer.component.scss']
})
export class BlockViewer {
  
  @Input() header: string;

  @Input() code: string;

  @Input() containerClass: string;

  @Input() previewStyle: string;

  @Input() free: boolean = false;

  @Input() new: boolean = false;

  BlockView = BlockView;

  blockView: BlockView = BlockView.PREVIEW;

  activateView(event: Event, blockView: BlockView) {
      if (!this.codeDisabled) {
          this.blockView = blockView;
      }
      
      event.preventDefault();
  }

  async copyCode(event: Event) {
      if (!this.codeDisabled) {
          await navigator.clipboard.writeText(this.code);
      }

      event.preventDefault();
  }

  get codeDisabled() {
      return this.free ? false : (environment ? environment.production: false);
  }

}
