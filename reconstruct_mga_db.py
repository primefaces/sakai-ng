import json
import re
import os

INPUT_FILE = "mga_extracted_text.json"
OUTPUT_FILE = "src/assets/data/reglas_mga_v2.json"

# Keywords for extraction
COVERAGE_KEYWORDS = {
    "autoLiability": ["AL ", "Liability", "Auto Liability"],
    "physicalDamage": ["PD ", "Physical Damage", "APD"],
    "cargo": ["MTC", "Cargo", "Motor Truck Cargo"],
    "generalLiability": ["GL ", "General Liability"],
    "trailerInterchange": ["TI ", "Trailer Interchange"],
    "reefer": ["Reefer", "Refrigerated"],
    "flatbed": ["Flatbed", "Flat bed"],
    "dryVan": ["Dry Van", "Dryvan"],
    "sandGravel": ["Sand", "Gravel", "Arena"],
    "autoHauler": ["Auto Hauler", "Car Hauler"],
    "intermodal": ["Intermodal", "UIIA"]
}

RISK_KEYWORDS = ["RRG", "Retention Group", "Risk Retention"]

def extract_emails(text):
    return list(set(re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)))

def extract_carriers(text_list):
    carriers = []
    capture = False
    for item in text_list:
        content = item['content']
        # Simple heuristic: Look at slide 2 or text containing "Carrier"
        if "Carrier" in content or "CARRIER" in content:
            # Clean content
            clean = content.replace("Carriers", "").replace("CARRIER", "").replace("Carrier", "").strip()
            # Split by newlines or obvious separators
            # Since content is one block, it's hard. But often names are capitalized.
            # Let's just store the raw string for now or try to split by known carriers if we had a list.
            # For this task, I will just take the cleaned line as "Carriers List" (maybe comma separation if I can detect it)
            # Better: split by 2+ spaces
            parts = re.split(r'\s{2,}', clean)
            for p in parts:
                if len(p) > 3 and not "..." in p:
                    carriers.append(p.strip())
    return list(set(carriers))

def parse_mga_data(mga_name, slides):
    # Combine all text for varied searching
    full_text = " ".join([s['content'] for s in slides])
    
    # Carriers
    carriers = extract_carriers(slides)
    if not carriers:
        # Fallback: try to find common names in full text
        common_carriers = ["Lloyds", "Canal", "National Fire", "Great American", "Sutton", "Accredited", "Trisura", "Clear Blue", "Hallmark"]
        for cc in common_carriers:
            if cc.lower() in full_text.lower():
                carriers.append(cc)
    
    # Emails
    emails = extract_emails(full_text)
    submission_email = emails[0] if emails else "CONTACT AGENT"
    
    # Appetite
    appetite = {}
    for key, keywords in COVERAGE_KEYWORDS.items():
        appetite[key] = any(k.lower() in full_text.lower() for k in keywords)
        
    # Risk / Retention
    is_high_risk = any(k in full_text for k in RISK_KEYWORDS)
    retention_val = "Low"
    if is_high_risk:
        retention_val = "HIGH RISK (RRG)"
    elif "$2,500" in full_text:
        retention_val = "$2,500"
    elif "$5,000" in full_text:
        retention_val = "$5,000"
    elif "$1,000" in full_text:
        retention_val = "$1,000"
        
    # Requirements (Audit Questions inference)
    requirements = {
        "minDriverAge": 21, # Default
        "minCdlExperience": 0,
        "notes": ""
    }
    
    # Age extraction
    age_match = re.search(r'(\d{2})\+?\s*(years|años)', full_text.lower())
    if age_match:
        age = int(age_match.group(1))
        if 18 <= age <= 30:
            requirements["minDriverAge"] = age
            
    # Exp extraction
    exp_match = re.search(r'(\d{1,2})\s*(years|años|year|año|yoe)', full_text.lower())
    if exp_match:
        try:
           val = int(exp_match.group(1))
           if val < 10: # Avoid capturing unrelated numbers
               requirements["minCdlExperience"] = val
        except:
            pass

    # Type inference
    mga_type = "MGA"
    if "wholesaler" in full_text.lower():
        mga_type = "WHOLESALER"
    elif "rrg" in full_text.lower():
        mga_type = "RRG"
    elif "admitted" in full_text.lower():
        mga_type = "ADMITTED"

    return {
        "id": mga_name.replace(" ", "_").lower(),
        "name": mga_name.replace("-", " ").strip(),
        "type": mga_type,
        "rating": "A" if not is_high_risk else "NR", # Placeholder
        "tier": "TIER 2" if not is_high_risk else "TIER 4",
        "retention": retention_val,
        "warningLevel": "HIGH_RISK" if is_high_risk else "NONE",
        "newVentureFit": "Yes" if "new venture" in full_text.lower() and not "no new venture" in full_text.lower() else "Check",
        "submissionEmail": submission_email,
        "carriers": carriers,
        "appetite": appetite,
        "requirements": requirements,
        "auditQuestions": [] # Fill later if needed
    }

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        raw_data = json.load(f)
        
    new_db = []
    
    for mga_name, slides in raw_data.items():
        processed = parse_mga_data(mga_name, slides)
        new_db.append(processed)
        
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(new_db, f, indent=2, ensure_ascii=False)
        
    print(f"Reconstruction complete. Saved {len(new_db)} MGAs to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
