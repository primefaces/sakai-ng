import { Component, Renderer2, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AppTopBar } from '@/src/layout/apptopbar';
import { AppSidebar } from '@/src/layout/appsidebar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppConfigurator } from '@/src/layout/appconfigurator';
import { AppFooter } from '@/src/layout/appfooter';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '@/src/service/applayoutservice';

@Component({
    selector: 'app-layout',
    standalone:true,
    imports: [
        CommonModule,
        ToastModule,
        AppTopBar,
        AppSidebar,
        RouterModule,
        AppFooter,
        AppConfigurator
    ],
    template: `<div class="layout-wrapper" [ngClass]="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
        </div>
        <app-configurator></app-configurator>
        <div class="layout-mask"></div>
    </div>
    `,
})
export class AppLayout {
    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    @ViewChild(AppTopBar) appTopBar!: AppTopBar;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopBar.menuButton.nativeElement.isSameNode(event.target) || this.appTopBar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopBar.menu.nativeElement.isSameNode(event.target) || this.appTopBar.menu.nativeElement.contains(event.target)
                        || this.appTopBar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopBar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
            });
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({...prev, overlayMenuActive:false, staticMenuMobileActive: false, menuHoverActive: false}))
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}