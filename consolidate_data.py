import json
import re

MGA_FILE = 'src/assets/data/reglas_mga.json'
CARRIERS_FILE = 'src/assets/data/carriers.json'
OUTPUT_FILE = 'src/assets/data/mga_db.json'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def normalize_string(s):
    if not s: return ""
    return s.lower().strip().replace(" ", "").replace(".", "").replace(",", "")

def main():
    mgas = load_json(MGA_FILE)
    carriers_catalog = load_json(CARRIERS_FILE)
    
    # Create a lookup for carriers by normalized name and ID
    carrier_lookup = {}
    for c in carriers_catalog:
        carrier_lookup[normalize_string(c['name'])] = c
        carrier_lookup[normalize_string(c['id'])] = c

    new_db = []

    for mga in mgas:
        # 1. Basic Info
        new_mga = {
            "id": mga.get('id'),
            "name": mga.get('name'),
            "type": mga.get('type', 'MGA'),
            "submissionEmail": mga.get('submissionEmail', "CONTACT_AGENT_MANUALLY"),
            "website": mga.get('website', ''),
            "phone": mga.get('phone', ''),
            "tier": mga.get('tier', 'TIER 2'),
            "riskLevel": "NORMAL" # Default
        }

        # 2. Risk Logic
        # "Retention" rule or type "RRG"
        retention = mga.get('retention', 'Low')
        mga_type = mga.get('type', '')
        
        is_high_risk = False
        if "RRG" in str(retention) or "RRG" in str(mga_type) or "HIGH_RISK" in str(mga.get('warningLevel', '')):
            is_high_risk = True
        
        # Check specific retention values
        if isinstance(retention, str) and ("SIR" in retention or "Variable" in retention):
             is_high_risk = True
             
        if is_high_risk:
            new_mga['riskLevel'] = "HIGH_RISK"
            new_mga['retention'] = retention
        else:
            new_mga['retention'] = "None"

        # 3. Sanitization
        if not new_mga['submissionEmail'] or "CONTACT AGENT" in new_mga['submissionEmail']:
             new_mga['submissionEmail'] = "CONTACT_AGENT_MANUALLY"

        # 4. Infer Coverages
        # regalas_mga.json has 'appetite' object. 
        # User wants 'coverages: { al: true, pd: true, cargo: false }'
        appetite = mga.get('appetite', {})
        new_mga['coverages'] = {
            "al": appetite.get('autoLiability', False),
            "pd": appetite.get('physicalDamage', False),
            "mtc": appetite.get('cargo', False),
            "gl": appetite.get('generalLiability', False),
        }
        
        # Pass through full appetite for search filtering
        new_mga['appetite'] = appetite
        new_mga['requirements'] = mga.get('requirements', {})

        # 5. Process Carriers (The Children)
        # mga['carriers'] is currently a list of strings (names)
        raw_carriers = mga.get('carriers', [])
        processed_carriers = []
        
        for carrier_name in raw_carriers:
            if not isinstance(carrier_name, str): continue
            
            normalized_name = normalize_string(carrier_name)
            
            # Try to find in catalog
            found_carrier = carrier_lookup.get(normalized_name)
            
            if found_carrier:
                # Use catalog data
                c_obj = {
                    "id": found_carrier['id'],
                    "name": found_carrier['name'],
                    "rating": found_carrier['rating'],
                    "type": found_carrier['type']
                }
            else:
                # Create basic object
                c_obj = {
                    "id": normalized_name,
                    "name": carrier_name.strip(),
                    "rating": "NR", # Default if unknown
                    "type": "UNKNOWN"
                }
            
            processed_carriers.append(c_obj)
            
        new_mga['carriers'] = processed_carriers
        
        # 6. Audit Questions
        new_mga['auditQuestions'] = mga.get('auditQuestions', [])

        new_db.append(new_mga)

    # Write output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_db, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully generated {OUTPUT_FILE} with {len(new_db)} MGAs.")

if __name__ == "__main__":
    main()
