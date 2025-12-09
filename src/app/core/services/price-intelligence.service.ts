import { Injectable, inject, computed } from '@angular/core';
import { QuoteService } from './quote.service';

export interface PriceInsight {
    suggestedPrice: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    avgPrice: number | null;
    similarQuotesCount: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class PriceIntelligenceService {
    private quoteService = inject(QuoteService);

    // Computed signal for current price insights based on loaded quotes
    priceInsights = computed(() => {
        const quotes = this.quoteService.quotes();
        const quotedQuotes = quotes.filter(q =>
            (q.status === 'QUOTED' || q.status === 'BOUND') && q.pricing?.quotedPremium
        );

        if (quotedQuotes.length === 0) {
            return {
                suggestedPrice: null,
                minPrice: null,
                maxPrice: null,
                avgPrice: null,
                similarQuotesCount: 0,
                message: 'No historical data available'
            };
        }

        const prices = quotedQuotes.map(q => q.pricing.quotedPremium || 0);
        const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        return {
            suggestedPrice: Math.round(avg),
            minPrice: min,
            maxPrice: max,
            avgPrice: Math.round(avg),
            similarQuotesCount: quotedQuotes.length,
            message: `Based on ${quotedQuotes.length} historical quote${quotedQuotes.length > 1 ? 's' : ''}`
        };
    });

    /**
     * Get suggested price for a specific set of criteria
     * @param criteria - Object with driverAge, cargoType, and carrier
     * @returns PriceInsight object with suggested pricing
     */
    getSuggestedPrice(criteria: {
        driverAge: number;
        cargoType: string;
        carrier: string
    }): PriceInsight {
        const quotes = this.quoteService.quotes();

        // Filter for similar quotes:
        // - Same carrier (in submissions)
        // - Similar driver age (±2 years)
        // - Same cargo type (in commodities)
        // - Status is QUOTED or BOUND
        // - Has a quoted premium
        const similarQuotes = quotes.filter(q => {
            if (q.status !== 'QUOTED' && q.status !== 'BOUND') return false;
            if (!q.pricing?.quotedPremium) return false;

            // Carrier Check
            const hasCarrier = q.submissions?.some(s => s.mgaName === criteria.carrier);
            if (!hasCarrier) return false;

            // Cargo Check
            const hasCargo = q.risk?.cargoCommodities?.includes(criteria.cargoType);
            if (!hasCargo) return false;

            // Driver Age Check (Avg of drivers)
            if (q.risk?.drivers?.length) {
                const totalAge = q.risk.drivers.reduce((sum, d) => sum + (d.age || 0), 0);
                const avgAge = totalAge / q.risk.drivers.length;
                const ageDiff = Math.abs(avgAge - criteria.driverAge);
                if (ageDiff > 2) return false;
            }

            return true;
        });

        if (similarQuotes.length === 0) {
            return {
                suggestedPrice: null,
                minPrice: null,
                maxPrice: null,
                avgPrice: null,
                similarQuotesCount: 0,
                message: 'No similar quotes found. This appears to be a new risk profile.'
            };
        }

        const prices = similarQuotes.map(q => q.pricing.quotedPremium || 0);
        const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        return {
            suggestedPrice: Math.round(avg),
            minPrice: min,
            maxPrice: max,
            avgPrice: Math.round(avg),
            similarQuotesCount: similarQuotes.length,
            message: `Based on ${similarQuotes.length} similar quote${similarQuotes.length > 1 ? 's' : ''} (${criteria.carrier}, ${criteria.cargoType}, driver age ${criteria.driverAge}±2)`
        };
    }

    /**
     * Get price trend for a carrier over time
     */
    getCarrierPriceTrend(carrier: string): number[] {
        const quotes = this.quoteService.quotes()
            .filter(q =>
                q.submissions?.some(s => s.mgaName === carrier) &&
                (q.status === 'QUOTED' || q.status === 'BOUND') &&
                q.pricing?.quotedPremium
            )
            .sort((a, b) => {
                // Sort by creation date
                const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return timeA - timeB;
            });

        return quotes.map(q => q.pricing.quotedPremium || 0);
    }
}
