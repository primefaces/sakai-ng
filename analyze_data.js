const fs = require('fs');
const path = 'src/assets/data/mga_db.json';

try {
    const raw = fs.readFileSync(path, 'utf8');
    const db = JSON.parse(raw);
    
    const types = {};
    const riskLevels = {};
    const retentions = {};
    let emptyAudit = 0;
    let dirtyNotes = 0;

    db.forEach(mga => {
        // Counts
        types[mga.type] = (types[mga.type] || 0) + 1;
        riskLevels[mga.riskLevel] = (riskLevels[mga.riskLevel] || 0) + 1;
        retentions[mga.retention] = (retentions[mga.retention] || 0) + 1;
        
        // Gaps
        if (!mga.auditQuestions || mga.auditQuestions.length === 0) emptyAudit++;
        
        // Notes check (simple check for XML tags or known artifacts)
        const notes = mga.requirements?.notes || '';
        if (notes.includes('<') || notes.includes('&lt;') || notes.length > 500) {
            console.log(`Dirty Note found in ${mga.name}: ${notes.substring(0, 50)}...`);
            dirtyNotes++;
        }
    });

    console.log('--- ANALYSIS REPORT ---');
    console.log('Total MGAs:', db.length);
    console.log('\nTypes:', JSON.stringify(types, null, 2));
    console.log('\nRisk Levels:', JSON.stringify(riskLevels, null, 2));
    console.log('\nRetentions:', JSON.stringify(retentions, null, 2));
    console.log('\nEmpty Audit Questions:', emptyAudit);
    console.log('Dirty Notes Suspects:', dirtyNotes);

} catch (e) {
    console.error('Error:', e.message);
}
