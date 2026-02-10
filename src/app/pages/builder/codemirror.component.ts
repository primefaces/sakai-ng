import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, highlightActiveLine, rectangularSelection, crosshairCursor } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { lintKeymap } from '@codemirror/lint';
import { yaml } from '@codemirror/lang-yaml';
import { oneDark } from '@codemirror/theme-one-dark';

@Component({
    selector: 'app-codemirror',
    standalone: true,
    template: `<div #editorHost class="codemirror-host"></div>`,
    styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .codemirror-host {
            width: 100%;
            height: 100%;
        }
        :host ::ng-deep .cm-editor {
            height: 100%;
            border: 1px solid var(--p-surface-300);
            border-radius: var(--p-content-border-radius);
        }
        :host ::ng-deep .cm-editor.cm-focused {
            outline: none;
            border-color: var(--p-primary-color);
        }
        :host ::ng-deep .cm-scroller {
            overflow: auto;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 13px;
        }
    `]
})
export class CodemirrorComponent implements AfterViewInit, OnDestroy, OnChanges {
    @ViewChild('editorHost', { static: true }) editorHost!: ElementRef<HTMLDivElement>;
    @Input() value: string = '';
    @Input() darkMode: boolean = false;
    @Output() valueChange = new EventEmitter<string>();

    private view: EditorView | null = null;
    private ignoreNextChange = false;

    ngAfterViewInit(): void {
        this.createEditor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['value'] && this.view && !this.ignoreNextChange) {
            const current = this.view.state.doc.toString();
            if (current !== this.value) {
                this.view.dispatch({
                    changes: { from: 0, to: current.length, insert: this.value }
                });
            }
        }
        this.ignoreNextChange = false;

        if (changes['darkMode'] && this.view) {
            this.recreateEditor();
        }
    }

    ngOnDestroy(): void {
        this.view?.destroy();
    }

    private createEditor(): void {
        const extensions = [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            history(),
            foldGutter(),
            drawSelection(),
            indentOnInput(),
            syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            rectangularSelection(),
            crosshairCursor(),
            highlightActiveLine(),
            highlightSelectionMatches(),
            keymap.of([
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...searchKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap,
                indentWithTab
            ]),
            yaml(),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    this.ignoreNextChange = true;
                    this.valueChange.emit(update.state.doc.toString());
                }
            }),
            EditorView.theme({
                '&': { height: '100%' }
            })
        ];

        if (this.darkMode) {
            extensions.push(oneDark);
        }

        const state = EditorState.create({
            doc: this.value,
            extensions
        });

        this.view = new EditorView({
            state,
            parent: this.editorHost.nativeElement
        });
    }

    private recreateEditor(): void {
        const currentValue = this.view?.state.doc.toString() ?? this.value;
        this.view?.destroy();
        this.value = currentValue;
        this.createEditor();
    }
}
