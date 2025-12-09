import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly commonConfig: SweetAlertOptions = {
        buttonsStyling: false,
        customClass: {
            popup: 'neobrutalist-popup',
            confirmButton: 'neobrutalist-confirm-btn',
            cancelButton: 'neobrutalist-cancel-btn',
            title: 'neobrutalist-title',
            htmlContainer: 'neobrutalist-content'
        },
        // Neobrutalist defaults
        backdrop: `rgba(0,0,0,0.8)`,
        background: '#FFFFFF',
        color: '#000000',
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        }
    };

    constructor() { }

    success(title: string, text: string = '') {
        this.fire('success', title, text);
    }

    error(title: string, text: string = '') {
        this.fire('error', title, text);
    }

    warning(title: string, text: string = '') {
        this.fire('warning', title, text);
    }

    info(title: string, text: string = '') {
        this.fire('info', title, text);
    }

    async confirm(title: string, text: string, confirmButtonText: string = 'Yes, Proceed'): Promise<boolean> {
        const result = await Swal.fire({
            ...this.commonConfig,
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Cancel'
        });
        return result.isConfirmed;
    }

    private fire(icon: SweetAlertIcon, title: string, text: string) {
        Swal.fire({
            ...this.commonConfig,
            icon: icon,
            title: title,
            text: text
        });
    }
}
