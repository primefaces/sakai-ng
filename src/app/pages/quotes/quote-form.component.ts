import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  template: `<div class="p-4 text-center">Redirecting to new experience...</div>`
})
export class QuoteFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        // Redirect to new Detail View (which supports editing)
        this.router.navigate(['/quotes', params['id']]);
      } else {
        // Redirect to Underwriting Workbench (for creation)
        this.router.navigate(['/underwriting']);
      }
    });
  }
}
