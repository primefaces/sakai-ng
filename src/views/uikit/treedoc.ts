import {Component, inject, OnInit} from '@angular/core';
import { TreeNode} from 'primeng/api';
import {TreeModule} from "primeng/tree";
import {FormsModule} from "@angular/forms";
import {TreeTableModule} from "primeng/treetable";
import {CommonModule} from "@angular/common";
import { NodeService } from '@/src/service/node.service';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Tree</h5>
                    <p-tree [value]="treeValue" selectionMode="checkbox" [(selection)]="selectedTreeValue"></p-tree>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <h5>TreeTable</h5>
                    <p-treetable [value]="treeTableValue" [columns]="cols" selectionMode="checkbox" [(selection)]="selectedTreeTableValue">
                        <ng-template #header let-columns>
                            <tr>
                                @for(col of columns; track col.header){
                                    <th>
                                        {{ col.header }}
                                    </th>
                                }
                            </tr>
                        </ng-template>
                        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                            <tr>
                                @for(col of columns; track col.field; let i = $index){
                                    <td>
                                        <p-treetabletoggler [rowNode]="rowNode" *ngIf="i === 0"></p-treetabletoggler>
                                        <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"></p-treeTableCheckbox>
                                        {{ rowData[col.field] }}
                                    </td>
                                }
                            </tr>
                        </ng-template>
                    </p-treetable>
                </div>
            </div>
        </div>
    `,
    providers: [NodeService]
})
export class TreeDoc implements OnInit {
    treeValue: TreeNode[] = [];

    treeTableValue: TreeNode[] = [];

    selectedTreeValue: TreeNode[] = [];

    selectedTreeTableValue: TreeNode[] = [];

    cols: any[] = [];

    nodeService = inject(NodeService)

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.treeValue = files);
        this.nodeService.getFilesystem().then(files => this.treeTableValue = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
