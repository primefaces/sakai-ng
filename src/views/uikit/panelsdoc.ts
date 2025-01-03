import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';

@Component({
    standalone:true,
    imports: [
        CommonModule,
        FormsModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        AccordionModule,
        TabViewModule,
        FieldsetModule,
        MenuModule,
        InputTextModule,
        DividerModule,
        SplitterModule,
        PanelModule,
        TabsModule,
    ],
    template: `
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Toolbar</h5>
                    <p-toolbar>
                        <div class="p-toolbar-group-left flex flex-wrap">
                            <button pButton type="button" label="New" icon="pi pi-plus" class="mr-2"></button>
                            <button pButton type="button" label="Open" icon="pi pi-folder-open" class="p-button-secondary mr-2"></button>

                            <i class="pi pi-bars p-toolbar-separator"></i>

                            <button pButton type="button" icon="pi pi-check" class="p-button-success mr-2"></button>
                            <button pButton type="button" icon="pi pi-trash" class="p-button-warning mr-2"></button>
                            <button pButton type="button" icon="pi pi-print" class="p-button-danger"></button>
                        </div>

                        <div class="p-toolbar-group-right">
                            <p-splitButton label="Options" icon="pi pi-check" [model]="items"></p-splitButton>
                        </div>
                    </p-toolbar>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="card">
                    <h5>AccordionPanel</h5>
                    <p-accordion value="0">
                        <p-accordion-panel value="0">
                            <p-accordion-header>Header I</p-accordion-header>
                            <p-accordion-content>
                                <p class="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </p>
                            </p-accordion-content>
                        </p-accordion-panel>

                        <p-accordion-panel value="1">
                            <p-accordion-header>Header II</p-accordion-header>
                            <p-accordion-content>
                                <p class="m-0">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                </p>
                            </p-accordion-content>
                        </p-accordion-panel>

                        <p-accordion-panel value="2">
                            <p-accordion-header>Header III</p-accordion-header>
                            <p-accordion-content>
                                <p class="m-0">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                </p>
                            </p-accordion-content>
                        </p-accordion-panel>
                    </p-accordion>
                </div>

                <div class="card">
                    <h5>Tabs</h5>
                    <p-tabs value="0">
                        <p-tablist>
                            <p-tab value="0">Header I</p-tab>
                            <p-tab value="1">Header II</p-tab>
                            <p-tab value="2">Header III</p-tab>
                        </p-tablist>
                        <p-tabpanels>
                            <p-tab-panel value="0">
                                <p class="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </p>
                            </p-tab-panel>
                            <p-tab-panel value="1">
                                <p class="m-0">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                </p>
                            </p-tab-panel>
                            <p-tab-panel value="2">
                                <p class="m-0">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                                </p>
                            </p-tab-panel>
                        </p-tabpanels>
                    </p-tabs>
                </div>
            </div>

            <div class="col-12 md:col-6">
                <div class="card">
                    <h5>Panel</h5>
                    <p-panel header="Header" [toggleable]="true" class="line-height-3 m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p-panel>
                </div>

                <div class="card">
                    <h5>Fieldset</h5>
                    <p-fieldset legend="Legend" [toggleable]="true" class="line-height-3 m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p-fieldset>
                </div>

                <div class="card">
                    <div class="flex align-items-center justify-content-between mb-0">
                        <h5>Card</h5>
                        <p-menu #menu [popup]="true" [model]="cardMenu"></p-menu>
                        <button pButton type="button" icon="pi pi-plus" [text]="true"
                                (click)="menu.toggle($event)"></button>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.</p>
                </div>
            </div>

            <div class="col-12">
                <div class="card">
                    <h5>Divider</h5>
                    <div class="grid">
                        <div class="col-5 flex align-items-center justify-content-center">
                            <div class="p-fluid">
                                <div class="field">
                                    <label for="username">Username</label>
                                    <input pInputText id="username" type="text"/>
                                </div>
                                <div class="field">
                                    <label for="password">Password</label>
                                    <input pInputText id="password" type="password"/>
                                </div>
                                <p-button label="Login" class="mt-2"></p-button>
                            </div>
                        </div>
                        <div class="col-2">
                            <p-divider layout="vertical">
                                <b>OR</b>
                            </p-divider>
                        </div>
                        <div class="col-5 align-items-center justify-content-center">
                            <p class="line-height-3 m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>

                            <p-divider layout="horizontal" align="center">
                                <span class="p-tag">Badge</span>
                            </p-divider>

                            <p class="line-height-3 m-0">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                                laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>

                            <p-divider align="right">
                                <p-button label="Button" icon="pi pi-search" styleClass="p-button-outlined"></p-button>
                            </p-divider>

                            <p class="line-height-3 m-0">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                                voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur
                                a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
                                doloribus asperiores repellat.
                                Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien.
                                Morbi dapibus luctus odio.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="card">
                    <h5>Splitter</h5>
                    <p-splitter [style]="{'height': '300px'}" [panelSizes]="[30,70]">
                        <ng-template pTemplate>
                            <div class="col flex align-items-center justify-content-center">
                                Panel 1
                            </div>
                        </ng-template>
                        <ng-template pTemplate>
                            <p-splitter layout="vertical" [panelSizes]="[50,50]" [minSizes]="[10,10]">
                                <ng-template pTemplate>
                                    <div class="col flex align-items-center justify-content-center">
                                        Panel 2
                                    </div>
                                </ng-template>
                                <ng-template pTemplate>
                                    <div class="col flex align-items-center justify-content-center">
                                        Panel 3
                                    </div>
                                </ng-template>
                            </p-splitter>
                        </ng-template>
                    </p-splitter>
                </div>
            </div>
        </div>
    `,
})
export class PanelsDoc {
    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] }
        ];

        this.cardMenu = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
        ];
    }

}