import { Routes } from '@angular/router';
import { ButtonDoc } from './buttondoc';
import { ChartDoc } from './chartdoc';
import { FileDoc } from './filedoc';
import { FormLayoutDoc } from './formlayoutdoc';
import { InputDoc } from './inputdoc';
import { ListDoc } from './listdoc';
import { MediaDoc } from './mediadoc';
import { MessagesDoc } from './messagesdoc';
import { MiscDoc } from './miscdoc';
import { PanelsDoc } from './panelsdoc';
import { TimelineDoc } from './timelinedoc';
import { TableDoc } from './tabledoc';
import { OverlayDoc } from './overlaydoc';
import { TreeDoc } from './treedoc';
import { MenuDoc } from './menudoc';

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
