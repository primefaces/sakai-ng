import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesDemoComponent } from './messagesdemo.component';
import { MessagesDemoRoutingModule } from './messagesdemo-routing.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		MessagesDemoRoutingModule,
		MessagesModule,
		MessageModule,
		ButtonModule,
		ToastModule,
		InputTextModule
	],
	declarations: [MessagesDemoComponent]
})
export class MessagesDemoModule { }
