const fs = require('fs');
const path = 'src/assets/data/mga_db.json';

try {
    const raw = fs.readFileSync(path, 'utf8');
    let db = JSON.parse(raw);
    let updatedCount = 0;

    db = db.map(mga => {
        const questions = [];
        
        // 1. RRG Logic
        if (mga.riskLevel === 'HIGH_RISK' || mga.type === 'RRG' || (mga.retention && mga.retention.includes('HIGH'))) {
            questions.push({
                id: 'rrg_solvency',
                question: 'Does the insured meet the minimum liquidity/solvency requirements?',
                triggerAnswer: false,
                failureMessage: 'Insured does not meet RRG solvency criteria (High Risk).'
            });
            questions.push({
                id: 'rrg_agreement',
                question: 'Is the insured willing to allow a hard credit pull and sign the subscription agreement?',
                triggerAnswer: false,
                failureMessage: 'Subscription agreement is mandatory.'
            });
        }

        // 2. Requirement-based Logic
        if (mga.requirements) {
            if (mga.requirements.minDriverAge && mga.requirements.minDriverAge > 21) {
                questions.push({
                    id: 'driver_age',
                    question: `Are all divers at least ${mga.requirements.minDriverAge} years old?`,
                    triggerAnswer: false,
                    failureMessage: `Drivers must be ${mga.requirements.minDriverAge}+ for this program.`
                });
            }
            
            if (mga.requirements.minCdlExperience && mga.requirements.minCdlExperience > 0) {
                 questions.push({
                    id: 'cdl_exp',
                    question: `Do all drivers have at least ${mga.requirements.minCdlExperience} years of CDL experience?`,
                    triggerAnswer: false,
                    failureMessage: `Minimum ${mga.requirements.minCdlExperience} years CDL experience required.`
                });
            }
        }
        
        if (questions.length > 0) {
            mga.auditQuestions = questions;
            updatedCount++;
        }
        
        return mga;
    });

    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    console.log(`Enriched ${updatedCount} MGAs with audit questions.`);

} catch (e) {
    console.error('Error:', e.message);
}
