import { Component, Input } from '@angular/core';

enum BlockView {
    PREVIEW,
    CODE
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
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
                <a tabindex="0" [ngClass]="{'block-action-active': blockView === BlockView.PREVIEW}" (click)="activateView($event, BlockView.PREVIEW)"><span>Preview</span></a>
                <a [attr.tabindex]="'0'" [ngClass]="{'block-action-active': blockView === BlockView.CODE}" (click)="activateView($event, BlockView.CODE)">
                    <span>Code</span>
                </a>
                <a [attr.tabindex]="'0'" class="block-action-copy" (click)="copyCode($event)" 
                    pTooltip="Copied to clipboard" tooltipEvent="focus" tooltipPosition="bottom"><i class="pi pi-copy m-0"></i></a>
            </div>
        </div>
        <div class="block-content">
            <div [class]="containerClass" [ngStyle]="previewStyle" *ngIf="blockView === BlockView.PREVIEW">
                <ng-content></ng-content>
            </div>
            <div *ngIf="blockView === BlockView.CODE">
                <pre class="app-code"><code>{{code}}</code></pre>
            </div>
        </div>
    </div>
  `,
    styleUrls: ['./blockviewer.component.scss']
})
export class BlockViewerComponent {

    @Input() header!: string;

    @Input() code!: string;

    @Input() containerClass!: string;

    @Input() previewStyle!: object;

    @Input() free: boolean = true;

    @Input() new: boolean = false;

    BlockView = BlockView;

    blockView: BlockView = BlockView.PREVIEW;

    activateView(event: Event, blockView: BlockView) {

        this.blockView = blockView;
        event.preventDefault();
    }


    async copyCode(event: Event) {
        await navigator.clipboard.writeText(this.code);
        event.preventDefault();
    }

}
