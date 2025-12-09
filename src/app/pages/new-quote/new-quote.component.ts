import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message'; // For error messages
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MarketService } from '../../core/services/market.service';
import { MGA, CarrierAuditQuestion } from '../../core/models/carrier.model';

@Component({
    selector: 'app-new-quote',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        StepsModule,
        PanelModule,
        CardModule,
        TagModule,
        SelectModule,
        SelectButtonModule,
        BadgeModule,
        DividerModule,
        DialogModule,
        ButtonModule,
        InputNumberModule,
        CheckboxModule,
        RadioButtonModule,
        MessageModule,
        TooltipModule,
        FloatLabelModule
    ],
    templateUrl: './new-quote.component.html',
    styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent {
    private marketService = inject(MarketService);

    // Signals from Service
    filterCriteria = this.marketService.filterCriteria;
    recommendations = this.marketService.recommendations;

    // Options
    cargoTypes = this.marketService.getCargoTypes();

    tenureOptions = [
        { label: 'New Venture (0 Yrs)', value: 0 },
        { label: '1 Year', value: 1 },
        { label: '2 Years', value: 2 },
        { label: '3+ Years', value: 3 }
    ];

    items = [
        { label: 'PROFILING' },
        { label: 'STRATEGY SEARCH' },
        { label: 'AUDIT & BIND' }
    ];

    // State
    activeStep = 0;
    selectedMGA: MGA | null = null;

    // Audit State
    showAuditDialog = false;
    auditAnswers: { [questionId: string]: any } = {};
    auditFailed = false;
    currentFailReason = '';

    // Explicitly expose check for recommendations to template validity
    hasRecommendations = computed(() => {
        const recs = this.recommendations();
        return recs.recommended.length > 0 || recs.others.length > 0;
    });

    updateFilter(key: any, value: any) {
        this.marketService.updateFilter(key, value);
    }

    analyzeMarkets() {
        if (!this.filterCriteria().cargoType) {
            return;
        }
        this.activeStep = 1;
    }

    // When user selects a market
    initiateSelection(mga: MGA) {
        this.selectedMGA = mga;
        this.auditAnswers = {}; // Reset answers
        this.auditFailed = false;
        this.currentFailReason = '';

        // If MGA has audit questions, open logic
        if (mga.auditQuestions && mga.auditQuestions.length > 0) {
            this.showAuditDialog = true;
        } else {
            // If no audit, maybe go straight to bind or show "Clean Pass" dialog?
            // For consistency let's show the dialog saying "Pre-Qualified"
            this.showAuditDialog = true;
        }

        // this.activeStep = 2; // REMOVED: We use dialog now
    }

    checkAuditAnswer(question: CarrierAuditQuestion, answer: any) {
        this.auditAnswers[question.id || question.question] = answer;

        // Validate immediately
        if (question.triggerAnswer === answer) {
            // FAIL
            // We can optionally block immediately or wait for submit.
            // User requested: "muestra un mensaje de error en línea y **deshabilita** el botón de continuar"
        }
    }

    get hasFailedAudit(): boolean {
        if (!this.selectedMGA?.auditQuestions) return false;

        for (const q of this.selectedMGA.auditQuestions) {
            const userAnswer = this.auditAnswers[q.id || q.question];
            if (userAnswer !== undefined && userAnswer === q.triggerAnswer) {
                return true;
            }
        }
        return false;
    }

    get auditComplete(): boolean {
        if (!this.selectedMGA?.auditQuestions) return true;
        // Check if all questions answered
        const answeredCount = Object.keys(this.auditAnswers).length;
        return answeredCount >= this.selectedMGA.auditQuestions.length;
    }

    finishQuote() {
        // Here we would integrate with an email service or PDF generator
        // For now, just reset
        alert(`Quote process initiated for ${this.selectedMGA?.name}. Submission details sent.`);
        this.reset();
    }

    reset() {
        this.activeStep = 0;
        this.selectedMGA = null;
        this.auditAnswers = {};
    }

    // Details Modal Logic
    displayDetails = false;
    selectedDetailedMGA: MGA | null = null;

    viewDetails(mga: MGA) {
        this.selectedDetailedMGA = mga;
        this.displayDetails = true;
    }

    // Helper to format text
    formatText(value: string): string {
        if (!value) return '';
        return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }

    getObjectKeys(obj: any): string[] {
        return obj ? Object.keys(obj) : [];
    }
}
