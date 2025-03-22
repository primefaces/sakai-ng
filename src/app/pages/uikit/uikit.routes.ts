import { Routes } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';
import { FileDemoComponent } from './file-demo/file-demo.component';
import { FormLayoutDemoComponent } from './form-layout-demo/form-layout-demo.component';
import { InputDemoComponent } from './input-demo/input-demo.component';
import { ListDemoComponent } from './list-demo/list-demo.component';
import { MediaDemoComponent } from './media-demo/media-demo.component';
import { MessagesDemoComponent } from './messages-demo/messages-demo.component';
import { MiscDemoComponent } from './misc-demo/misc-demo.component';
import { PanelsDemoComponent } from './panels-demo/panels-demo.component';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { OverlayDemoComponent } from './overlay-demo/overlay-demo.component';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { MenuDemoComponent } from './menu-demo/menu-demo.component';
import { TimelineDemoComponent } from './timeline-demo/timeline-demo.component';

export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemoComponent },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemoComponent },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDemoComponent },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemoComponent },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDemoComponent },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemoComponent },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemoComponent },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDemoComponent },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDemoComponent },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemoComponent },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemoComponent },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemoComponent },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayDemoComponent },
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDemoComponent },
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuDemoComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
