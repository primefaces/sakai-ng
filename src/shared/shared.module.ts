import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';

import { RouterModule } from '@angular/router';
//import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
//import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
//import { RippleModule } from 'primeng/ripple';

import { DropdownModule } from 'primeng/dropdown';

import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';

import { IftaLabelModule } from 'primeng/iftalabel';

import { FileUploadModule } from 'primeng/fileupload';

import { ImageModule } from 'primeng/image';

import { KeyFilterModule } from 'primeng/keyfilter';

import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  declarations: [],
  imports: [
   // CommonModule,
    TableModule,
    //FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    MessageModule,

    CheckboxModule, 
    PasswordModule, 
    RouterModule, 
    SelectButtonModule,

    InputGroupModule,
    FluidModule,
    FloatLabelModule,
    AutoCompleteModule,
    SliderModule,
    ColorPickerModule,
    KnobModule,
    DatePickerModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    TreeSelectModule,
    MultiSelectModule,
    ListboxModule,
    InputGroupAddonModule,

    DropdownModule,

    DataViewModule,
    OrderListModule,
    PickListModule,

    IftaLabelModule,

    FileUploadModule,

    ImageModule,

    KeyFilterModule,

    ContextMenuModule
    
  ],
  exports: [
   // CommonModule,
    TableModule,
   // FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    MessageModule,

    CheckboxModule, 
    PasswordModule, 
    RouterModule, 
    SelectButtonModule,

    InputGroupModule,
    FluidModule,
    FloatLabelModule,
    AutoCompleteModule,
    SliderModule,
    ColorPickerModule,
    KnobModule,
    DatePickerModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    TreeSelectModule,
    MultiSelectModule,
    ListboxModule,
    InputGroupAddonModule,

    DropdownModule,

    DataViewModule,
    OrderListModule,
    PickListModule,

    IftaLabelModule,

    FileUploadModule,

    ImageModule,

    KeyFilterModule,

    ContextMenuModule

            
  ]
})
export class SharedModule { }
