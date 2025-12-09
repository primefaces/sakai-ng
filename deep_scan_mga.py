import os
import re
import json
import zipfile

base_dir = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\src\assets\data\escanear"
carriers_file = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\src\assets\data\carriers.json"
output_file = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\deep_scan_results.json"

def get_carriers_list():
    with open(carriers_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def extract_text_from_xml(file_path):
    text_content = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = re.findall(r'<a:t>(.*?)</a:t>', content)
            text_content.extend(matches)
    except Exception:
        pass
    return " ".join(text_content) # Keep case for some checks, lower later

def analyze_text(text, carriers_catalog):
    text_lower = text.lower()
    
    # 1. Detect Carriers
    found_carriers = set()
    for c in carriers_catalog:
        cid = c['id']
        name = c['name'].lower()
        # Basic check
        if name in text_lower:
            found_carriers.add(cid)
        
        # Specific Aliases
        aliases = []
        if cid == 'american_interfidelity': aliases = ['ai', 'rrg', 'american interfidelity']
        if cid == 'lloyds': aliases = ['lloyd']
        if cid == 'great_american': aliases = ['great am', 'great american']
        if cid == 'clear_blue': aliases = ['clear blue', 'clearblue']
        if cid == 'falls_lake': aliases = ['falls lake']
        if cid == 'canopius': aliases = ['canopius']
        if cid == 'hallmark': aliases = ['hallmark']
        if cid == 'sutton': aliases = ['sutton']
        if cid == 'trisura': aliases = ['trisura']
        if cid == 'axis': aliases = ['axis']
        if cid == 'national_fire': aliases = ['national fire']
        
        for alias in aliases:
             if re.search(r'\b' + re.escape(alias) + r'\b', text_lower):
                 found_carriers.add(cid)

    # 2. Detect Exclusions (Cargo)
    exclusions = []
    # Look for lists following 'excluded', 'prohibited'
    # Examples: "Excluded: Cotton, Livestock"
    exclusion_keywords = ['excluded', 'prohibited', 'no haul', 'unacceptable', 'restrictions']
    
    for kw in exclusion_keywords:
        match = re.search(r'\b' + kw + r'\b.{0,20}[:\-\n](.*)', text_lower)
        if match:
            # Grab next 100 chars
            snippet = match.group(1)[:150]
            exclusions.append(f"{kw.upper()}: {snippet.strip()}")

    # Specific commodity keywords
    commodities = ['cotton', 'livestock', 'garbage', 'hazmat', 'autos', 'coils', 'lumber', 'pipes', 'reefer', 'towing']
    found_commodities = [com for com in commodities if com in text_lower and ('no ' + com in text_lower or 'excluded' in text_lower)]

    # 3. Detect Rules (Age, Exp)
    rules = []
    # Driver Age
    age_match = re.search(r'(\d{2})[-\s]*years[-\s]*(old|age)', text_lower)
    if age_match: rules.append(f"Age: {age_match.group(1)}+")
    
    # Experience
    exp_match = re.search(r'(\d{1,2})[-\s]*year[s]*[-\s]*(cdl|exp|experience)', text_lower)
    if exp_match: rules.append(f"Exp: {exp_match.group(1)} Years")
    
    # Radius
    radius_match = re.search(r'(\d{3,4})[-\s]*mile[s]*[-\s]*radius', text_lower)
    if radius_match: rules.append(f"Radius: {radius_match.group(1)} miles")

    return {
        "carriers": list(found_carriers),
        "exclusions_raw": exclusions,
        "excluded_commodities": found_commodities,
        "rules": rules,
        "raw_snippet": text[:200]
    }

def main():
    carriers = get_carriers_list()
    results = {}

    if not os.path.exists(base_dir):
        print("Base directory not found")
        return

    subdirs = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]

    for subdir in subdirs:
        mga_name = subdir # Keep full name for identifying
        print(f"Scanning {mga_name}...")
        
        mga_data = {
            "carriers": set(),
            "exclusions": [],
            "commodities": set(),
            "rules": set()
        }
        
        mga_path = os.path.join(base_dir, subdir)
        
        # Traverse
        for root, dirs, files in os.walk(mga_path):
            for file in files:
                if file.endswith(".xml") and "slide" in file:
                    path = os.path.join(root, file)
                    text = extract_text_from_xml(path)
                    analysis = analyze_text(text, carriers)
                    
                    mga_data["carriers"].update(analysis["carriers"])
                    mga_data["exclusions"].extend(analysis["exclusions_raw"])
                    mga_data["commodities"].update(analysis["excluded_commodities"])
                    mga_data["rules"].update(analysis["rules"])
        
        results[mga_name] = {
            "carriers": list(mga_data["carriers"]),
            "excluded_commodities": list(mga_data["commodities"]),
            "rules": list(mga_data["rules"]),
            "raw_exclusions": list(set(mga_data["exclusions"]))[:5] # Limit raw text
        }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    print(f"Deep scan complete. Results saved to {output_file}")

if __name__ == "__main__":
    main()
