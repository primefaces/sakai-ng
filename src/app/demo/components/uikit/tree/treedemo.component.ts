import { Component, OnInit } from '@angular/core';
import { NodeService } from 'src/app/demo/service/node.service';
import { TreeNode, SharedModule } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';

@Component({
    templateUrl: './treedemo.component.html',
    standalone: true,
    imports: [TreeModule, TreeTableModule, SharedModule, NgFor, NgIf]
})
export class TreeDemoComponent implements OnInit {

    files1: TreeNode[] = [];

    files2: TreeNode[] = [];

    files3: TreeNode[] = [];

    selectedFiles1: TreeNode<any> | TreeNode<any>[] | null = [];

    selectedFiles2: TreeNode<any> | TreeNode<any>[] | null = [];

    selectedFiles3: TreeNode<any> | TreeNode<any>[] | null = {};

    cols: any[] = [];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFiles().then(files => {
            this.files3 = [{
                label: 'Root',
                children: files
            }];
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
