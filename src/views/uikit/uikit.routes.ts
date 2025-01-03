import { Routes } from '@angular/router';
import { ButtonDoc } from '@/src/views/uikit/buttondoc';
import { ChartDoc } from '@/src/views/uikit/chartdoc';
import { FileDoc } from '@/src/views/uikit/filedoc';
import { FormLayoutDoc } from '@/src/views/uikit/formlayoutdoc';
import { InputDoc } from '@/src/views/uikit/inputdoc';
import { ListDoc } from '@/src/views/uikit/listdoc';
import { MediaDoc } from '@/src/views/uikit/mediadoc';
import { MessagesDoc } from '@/src/views/uikit/messagesdoc';
import { MiscDoc } from '@/src/views/uikit/miscdoc';
import { PanelsDoc } from '@/src/views/uikit/panelsdoc';
import { TableDoc } from '@/src/views/uikit/tabledoc';
import { TreeDoc } from '@/src/views/uikit/treedoc';
import { MenuDoc } from '@/src/views/uikit/menudoc';
import { OverlayDoc } from '@/src/views/uikit/overlaydoc';
import { TimelineDoc } from '@/src/views/uikit/timelinedoc';

export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDoc},
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDoc },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDoc },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDoc },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDoc },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDoc },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDoc },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDoc },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDoc },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDoc },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDoc },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDoc },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, component: OverlayDoc },
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDoc },
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuDoc },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
