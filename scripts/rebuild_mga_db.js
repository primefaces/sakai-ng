const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/assets/data');
const REGLAS_PATH = path.join(DATA_DIR, 'reglas_mga.json');
const CARRIERS_PATH = path.join(DATA_DIR, 'carriers.json');
const OUTPUT_PATH = path.join(DATA_DIR, 'mga_db.json');

// Read files
const rawReglas = fs.readFileSync(REGLAS_PATH, 'utf8');
const rawCarriers = fs.readFileSync(CARRIERS_PATH, 'utf8');

const mgaRules = JSON.parse(rawReglas);
const carrierDb = JSON.parse(rawCarriers);

// Helper to normalize strings for comparison
const normalize = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

// Helper to find carrier details
const findCarrier = (carrierName) => {
    if (!carrierName) return null;
    const search = normalize(carrierName);
    
    // 1. Try exact ID match
    let match = carrierDb.find(c => normalize(c.id) === search);
    if (match) return match;

    // 2. Try Name match
    match = carrierDb.find(c => normalize(c.name) === search);
    if (match) return match;

    // 3. Try includes
    match = carrierDb.find(c => normalize(c.name).includes(search) || search.includes(normalize(c.name)));
    
    // Default fallback if not found, create a placeholder
    return match || {
        id: normalize(carrierName),
        name: carrierName,
        rating: 'NR',
        type: 'UNKNOWN'
    };
};

// Process MGAs
const newDb = mgaRules.map(mga => {
    // 1. Determine Risk Level
    // If Type is RRG or Retention is High -> HIGH_RISK
    // Note: The user said "Retention" rule: if type: "RRG" or "Retention" detected (assuming non-none/low), mark HIGH_RISK.
    // In json, retention is often "Low" or "None". If it says "$1,000" or anything else, maybe check.
    // Let's stick to explicit "RRG" or explicit warnings. 
    // Also user said: "Si detectas `type: 'RRG'` o 'Retention', marca el flag `riskLevel: 'HIGH_RISK'`"
    // I interpret "Retention" as having a value that implies retention, usually "Risk Retention Group" or high $.
    
    let isHighRisk = false;
    if (mga.type === 'RRG') isHighRisk = true;
    if (mga.warningLevel === 'HIGH_RISK') isHighRisk = true;
    // Check retention text
    const ret = (mga.retention || '').toLowerCase();
    if (ret.includes('rrg') || (ret !== 'none' && ret !== 'low' && ret !== '')) {
         // Maybe High Risk? User said "Si detectas ... 'Retention'"
         // Let's be safe: if it's explicitly RRG it is High Risk. 
         // If retention is simply a dollar amount like "$1,000" it might be normal for some, but user said "mark the flag... this is a warning".
         // Let's set high risk if retention is significant or RRG.
         if (ret.includes('rrg') || mga.type === 'RRG') isHighRisk = true;
    }

    // 2. Sanitize Email
    let email = mga.submissionEmail;
    if (!email || email.trim() === '' || email.includes('CONTACT AGENT')) {
        email = "CONTACT_AGENT_MANUALLY";
    }

    // 3. Resolve Carriers
    // mga.carriers is array of strings.
    const resolvedCarriers = (mga.carriers || []).map(cName => {
        const cObj = findCarrier(cName);
        return {
            id: cObj.id,
            name: cObj.name,
            rating: cObj.rating || 'NR',
            type: cObj.type || 'UNKNOWN'
        };
    });

    // 4. Infeer Coverages 
    // The previous json had a 'coverages' object, let's keep it or infer from appetite.
    // User said: "Infiere y explicita qué ofrece cada uno: `coverages: { al: true, pd: true, cargo: false }`"
    // We can infer from 'appetite' boolean flags.
    const app = mga.appetite || {};
    const coverages = {
        al: !!app.autoLiability,
        pd: !!app.physicalDamage,
        mtc: !!app.cargo,
        gl: !!app.generalLiability
    };

    return {
        id: mga.id,
        name: mga.name,
        type: mga.type || 'MGA',
        submissionEmail: email,
        website: mga.website || '',
        phone: mga.phone || '',
        tier: mga.tier || 'TIER 2',
        riskLevel: isHighRisk ? 'HIGH_RISK' : 'NORMAL',
        retention: mga.retention || 'None',
        coverages: coverages,
        appetite: {
            autoLiability: !!app.autoLiability,
            physicalDamage: !!app.physicalDamage,
            cargo: !!app.cargo,
            generalLiability: !!app.generalLiability,
            trailerInterchange: !!app.trailerInterchange,
            reefer: !!app.reefer,
            flatbed: !!app.flatbed,
            dryVan: !!app.dryVan,
            sandGravel: !!app.sandGravel,
            autoHauler: !!app.autoHauler,
            intermodal: !!app.intermodal
        },
        requirements: {
            minDriverAge: mga.requirements?.minDriverAge || 21,
            minCdlExperience: mga.requirements?.minCdlExperience || 0,
            notes: mga.requirements?.notes || ''
        },
        carriers: resolvedCarriers,
        // Preserve audit questions or init empty
        auditQuestions: mga.auditQuestions || [] 
    };
});

// Write Output
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(newDb, null, 2));
console.log(`Generated mga_db.json with ${newDb.length} entries.`);
