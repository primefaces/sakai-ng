import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesDemoComponent } from './messagesdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MessagesDemoComponent }
    ])],
    exports: [RouterModule]
})
export class MessagesDemoRoutingModule { }
