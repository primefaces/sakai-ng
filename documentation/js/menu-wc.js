'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sakai-ng documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccessModule.html" data-type="entity-link" >AccessModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AccessModule-6af53630a7cf97ffba55384db3c1d993f3ac0b2f4738b949376cbf8ea5fea54d0c746064e17789af6ad13eee69b837a63401632b9560ec69abf8e5c4f453887e"' : 'data-bs-target="#xs-components-links-module-AccessModule-6af53630a7cf97ffba55384db3c1d993f3ac0b2f4738b949376cbf8ea5fea54d0c746064e17789af6ad13eee69b837a63401632b9560ec69abf8e5c4f453887e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccessModule-6af53630a7cf97ffba55384db3c1d993f3ac0b2f4738b949376cbf8ea5fea54d0c746064e17789af6ad13eee69b837a63401632b9560ec69abf8e5c4f453887e"' :
                                            'id="xs-components-links-module-AccessModule-6af53630a7cf97ffba55384db3c1d993f3ac0b2f4738b949376cbf8ea5fea54d0c746064e17789af6ad13eee69b837a63401632b9560ec69abf8e5c4f453887e"' }>
                                            <li class="link">
                                                <a href="components/AccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccessRoutingModule.html" data-type="entity-link" >AccessRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppLayoutModule.html" data-type="entity-link" >AppLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppLayoutModule-b0252ac678d7a194cf2c6920c43bbf9dfbdcfdef40d1ce4860d90b15b322f2714c250530e887f743dddedf8ca861577042be5dcbb00519e8771e252e03419676"' : 'data-bs-target="#xs-components-links-module-AppLayoutModule-b0252ac678d7a194cf2c6920c43bbf9dfbdcfdef40d1ce4860d90b15b322f2714c250530e887f743dddedf8ca861577042be5dcbb00519e8771e252e03419676"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppLayoutModule-b0252ac678d7a194cf2c6920c43bbf9dfbdcfdef40d1ce4860d90b15b322f2714c250530e887f743dddedf8ca861577042be5dcbb00519e8771e252e03419676"' :
                                            'id="xs-components-links-module-AppLayoutModule-b0252ac678d7a194cf2c6920c43bbf9dfbdcfdef40d1ce4860d90b15b322f2714c250530e887f743dddedf8ca861577042be5dcbb00519e8771e252e03419676"' }>
                                            <li class="link">
                                                <a href="components/AppFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppMenuitemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppMenuitemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppTopBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppTopBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-1962c2609b2fa65081f3af4842db3c733eefd59035b152f5e42188ce1ca8c93aefb66c7ba71670ab9884b37588d04ebe18d082afd81b93c8d9e60d07986efa5e"' : 'data-bs-target="#xs-components-links-module-AppModule-1962c2609b2fa65081f3af4842db3c733eefd59035b152f5e42188ce1ca8c93aefb66c7ba71670ab9884b37588d04ebe18d082afd81b93c8d9e60d07986efa5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1962c2609b2fa65081f3af4842db3c733eefd59035b152f5e42188ce1ca8c93aefb66c7ba71670ab9884b37588d04ebe18d082afd81b93c8d9e60d07986efa5e"' :
                                            'id="xs-components-links-module-AppModule-1962c2609b2fa65081f3af4842db3c733eefd59035b152f5e42188ce1ca8c93aefb66c7ba71670ab9884b37588d04ebe18d082afd81b93c8d9e60d07986efa5e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotfoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotfoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' : 'data-bs-target="#xs-components-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' :
                                            'id="xs-components-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' : 'data-bs-target="#xs-pipes-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' :
                                            'id="xs-pipes-links-module-DashboardModule-278f9a31cf9a7d8c91c8fdac64756e2bc6e39599ab87698e50f279d4180fb5e5004415351520ba89980f255bf9e052b103ae665652c26352f9652cd429a9a225"' }>
                                            <li class="link">
                                                <a href="pipes/CalendarEventPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarEventPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardsRoutingModule.html" data-type="entity-link" >DashboardsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentationModule.html" data-type="entity-link" >DocumentationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DocumentationModule-f0de4947f6d0d5d855fd01a99eea0b75c7e35f8109b743abfd1c13b151e0b06c2e41d62901a692c874434b391eddb64b3dd12d95f683ee4c55b0be4ec61d779d"' : 'data-bs-target="#xs-components-links-module-DocumentationModule-f0de4947f6d0d5d855fd01a99eea0b75c7e35f8109b743abfd1c13b151e0b06c2e41d62901a692c874434b391eddb64b3dd12d95f683ee4c55b0be4ec61d779d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocumentationModule-f0de4947f6d0d5d855fd01a99eea0b75c7e35f8109b743abfd1c13b151e0b06c2e41d62901a692c874434b391eddb64b3dd12d95f683ee4c55b0be4ec61d779d"' :
                                            'id="xs-components-links-module-DocumentationModule-f0de4947f6d0d5d855fd01a99eea0b75c7e35f8109b743abfd1c13b151e0b06c2e41d62901a692c874434b391eddb64b3dd12d95f683ee4c55b0be4ec61d779d"' }>
                                            <li class="link">
                                                <a href="components/DocumentationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentationRoutingModule.html" data-type="entity-link" >DocumentationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EditorModule.html" data-type="entity-link" >EditorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EditorModule-ff73ea27e58c8a3c8ce7515b197590f52036aca35d8bfef965f13e998b88aff9266d17aee7a41eaf38a7eae826a456e06cee50b6847edde0aa35fb8834e08f28"' : 'data-bs-target="#xs-components-links-module-EditorModule-ff73ea27e58c8a3c8ce7515b197590f52036aca35d8bfef965f13e998b88aff9266d17aee7a41eaf38a7eae826a456e06cee50b6847edde0aa35fb8834e08f28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditorModule-ff73ea27e58c8a3c8ce7515b197590f52036aca35d8bfef965f13e998b88aff9266d17aee7a41eaf38a7eae826a456e06cee50b6847edde0aa35fb8834e08f28"' :
                                            'id="xs-components-links-module-EditorModule-ff73ea27e58c8a3c8ce7515b197590f52036aca35d8bfef965f13e998b88aff9266d17aee7a41eaf38a7eae826a456e06cee50b6847edde0aa35fb8834e08f28"' }>
                                            <li class="link">
                                                <a href="components/EditorCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditorCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditorHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditorSelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EditorsRoutingModule.html" data-type="entity-link" >EditorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link" >ErrorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ErrorModule-26e443f0ae5ecaaddbeb4580fd080a1e0003a75f583d697df045a1887f82585cf3e4c5f99897db9142b230a094211d8a417f0185de9bcd671fbf1cc13e912e76"' : 'data-bs-target="#xs-components-links-module-ErrorModule-26e443f0ae5ecaaddbeb4580fd080a1e0003a75f583d697df045a1887f82585cf3e4c5f99897db9142b230a094211d8a417f0185de9bcd671fbf1cc13e912e76"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorModule-26e443f0ae5ecaaddbeb4580fd080a1e0003a75f583d697df045a1887f82585cf3e4c5f99897db9142b230a094211d8a417f0185de9bcd671fbf1cc13e912e76"' :
                                            'id="xs-components-links-module-ErrorModule-26e443f0ae5ecaaddbeb4580fd080a1e0003a75f583d697df045a1887f82585cf3e4c5f99897db9142b230a094211d8a417f0185de9bcd671fbf1cc13e912e76"' }>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorRoutingModule.html" data-type="entity-link" >ErrorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FactoryModule.html" data-type="entity-link" >FactoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FactoryModule-1a475ac048b8e54f2c96d1d1891387fec67487fa7fce0e54d3e4aadfd32e070a357faf944ef99952bc780601dfb0efb5b4b8cc6c75c389cb8d739ebedb1b78b0"' : 'data-bs-target="#xs-components-links-module-FactoryModule-1a475ac048b8e54f2c96d1d1891387fec67487fa7fce0e54d3e4aadfd32e070a357faf944ef99952bc780601dfb0efb5b4b8cc6c75c389cb8d739ebedb1b78b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FactoryModule-1a475ac048b8e54f2c96d1d1891387fec67487fa7fce0e54d3e4aadfd32e070a357faf944ef99952bc780601dfb0efb5b4b8cc6c75c389cb8d739ebedb1b78b0"' :
                                            'id="xs-components-links-module-FactoryModule-1a475ac048b8e54f2c96d1d1891387fec67487fa7fce0e54d3e4aadfd32e070a357faf944ef99952bc780601dfb0efb5b4b8cc6c75c389cb8d739ebedb1b78b0"' }>
                                            <li class="link">
                                                <a href="components/GenericViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenericViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LandingRoutingModule.html" data-type="entity-link" >LandingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-c5761999c4d472156dcfbc8cfba6117ab8de92f65814b95505636ec68fc3df204b770ed10f57e5d3da945b1048aee236440ec80d5d51d25c856f81adb974cb1c"' : 'data-bs-target="#xs-components-links-module-LoginModule-c5761999c4d472156dcfbc8cfba6117ab8de92f65814b95505636ec68fc3df204b770ed10f57e5d3da945b1048aee236440ec80d5d51d25c856f81adb974cb1c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-c5761999c4d472156dcfbc8cfba6117ab8de92f65814b95505636ec68fc3df204b770ed10f57e5d3da945b1048aee236440ec80d5d51d25c856f81adb974cb1c"' :
                                            'id="xs-components-links-module-LoginModule-c5761999c4d472156dcfbc8cfba6117ab8de92f65814b95505636ec68fc3df204b770ed10f57e5d3da945b1048aee236440ec80d5d51d25c856f81adb974cb1c"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WizardModule.html" data-type="entity-link" >WizardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WizardModule-74981f2157ec8fbf2a02d3935b45f2b09c3d32e4cf1ca8a8bdc22f3bb2bcb8fb3d97a49b19ad5ca5e56be519046ce6e19208f2b65c1e41b2a036ccad1c1e9078"' : 'data-bs-target="#xs-components-links-module-WizardModule-74981f2157ec8fbf2a02d3935b45f2b09c3d32e4cf1ca8a8bdc22f3bb2bcb8fb3d97a49b19ad5ca5e56be519046ce6e19208f2b65c1e41b2a036ccad1c1e9078"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WizardModule-74981f2157ec8fbf2a02d3935b45f2b09c3d32e4cf1ca8a8bdc22f3bb2bcb8fb3d97a49b19ad5ca5e56be519046ce6e19208f2b65c1e41b2a036ccad1c1e9078"' :
                                            'id="xs-components-links-module-WizardModule-74981f2157ec8fbf2a02d3935b45f2b09c3d32e4cf1ca8a8bdc22f3bb2bcb8fb3d97a49b19ad5ca5e56be519046ce6e19208f2b65c1e41b2a036ccad1c1e9078"' }>
                                            <li class="link">
                                                <a href="components/CourseDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreWizardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreWizardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoomTimesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomTimesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WizardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WizardRoutingModule.html" data-type="entity-link" >WizardRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CourseDialog.html" data-type="entity-link" >CourseDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/CourseInfoDialog.html" data-type="entity-link" >CourseInfoDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/RoomDialog.html" data-type="entity-link" >RoomDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/TableDialogComponent.html" data-type="entity-link" >TableDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserDialog.html" data-type="entity-link" >UserDialog</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CandidateDTO.html" data-type="entity-link" >CandidateDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Course.html" data-type="entity-link" >Course</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseDTO.html" data-type="entity-link" >CourseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseSession.html" data-type="entity-link" >CourseSession</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoBox.html" data-type="entity-link" >InfoBox</a>
                            </li>
                            <li class="link">
                                <a href="classes/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomDTO.html" data-type="entity-link" >RoomDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomTable.html" data-type="entity-link" >RoomTable</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomTable-1.html" data-type="entity-link" >RoomTable</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableLogDto.html" data-type="entity-link" >TableLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimeTableName.html" data-type="entity-link" >TimeTableName</a>
                            </li>
                            <li class="link">
                                <a href="classes/Timing.html" data-type="entity-link" >Timing</a>
                            </li>
                            <li class="link">
                                <a href="classes/Timing-1.html" data-type="entity-link" >Timing</a>
                            </li>
                            <li class="link">
                                <a href="classes/TmpTimeTable.html" data-type="entity-link" >TmpTimeTable</a>
                            </li>
                            <li class="link">
                                <a href="classes/TmpTimeTableDTO.html" data-type="entity-link" >TmpTimeTableDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Userx.html" data-type="entity-link" >Userx</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserxDTO.html" data-type="entity-link" >UserxDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChangeService.html" data-type="entity-link" >ChangeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollisionService.html" data-type="entity-link" >CollisionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseService.html" data-type="entity-link" >CourseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalTableService.html" data-type="entity-link" >GlobalTableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoomService.html" data-type="entity-link" >RoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableShareService.html" data-type="entity-link" >TableShareService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventInterface.html" data-type="entity-link" >EventInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalTableChangeDTO.html" data-type="entity-link" >GlobalTableChangeDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoDialogInterface.html" data-type="entity-link" >InfoDialogInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemService.html" data-type="entity-link" >ItemService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayoutState.html" data-type="entity-link" >LayoutState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuChangeEvent.html" data-type="entity-link" >MenuChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoomInterface.html" data-type="entity-link" >RoomInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableData.html" data-type="entity-link" >TableData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimeTable.html" data-type="entity-link" >TimeTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/CalendarEventPipe.html" data-type="entity-link" >CalendarEventPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});