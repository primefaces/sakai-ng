import {CanDeactivateFn} from "@angular/router";
import {EditorComponent} from "../components/editor/editor.component";
import {WizardComponent} from "../components/wizard/wizard.component";

export const AuthGuardEditorClose: CanDeactivateFn<any> = (component: EditorComponent) => {
    return component.canDeactivate();
};

export const AuthGuardWizardClose: CanDeactivateFn<any> = (component: WizardComponent) => {
    return component.canDeactivate();
};
