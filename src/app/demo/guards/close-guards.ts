import {CanDeactivateFn} from "@angular/router";
import {EditorComponent} from "../components/editor/editor.component";
import {WizardComponent} from "../components/wizard/wizard.component";
import {inject} from "@angular/core";
import {ConfirmationService} from "primeng/api";

export const AuthGuardEditorClose: CanDeactivateFn<any> = (component: EditorComponent) => {
    if (!component.canDeactivate()) return true;

    const confirmationService = inject(ConfirmationService);
    return new Promise<boolean>((resolve) => {
        confirmationService.confirm({
            message: 'Are you sure that you want to proceed? You have unsaved data!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: "p-button-text",
            accept: () => resolve(true),
            reject: () => resolve(false),
        });
    });
};


export const AuthGuardWizardClose: CanDeactivateFn<any> = (component: WizardComponent) => {
    return component.canDeactivate();
};
