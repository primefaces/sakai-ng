import os
import re
import json

base_dir = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\src\assets\data\escanear"
carriers_file = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\src\assets\data\carriers.json"
output_file = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\mga_carrier_mapping.json"

def get_carriers_list():
    with open(carriers_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def clean_text(text):
    return text.lower().strip()

def extract_text_from_xml(file_path):
    text_content = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find texts in <a:t>
            matches = re.findall(r'<a:t>(.*?)</a:t>', content)
            text_content.extend(matches)
    except Exception:
        pass
    return " ".join(text_content).lower()

def map_mga_to_carriers():
    carriers_catalog = get_carriers_list()
    mapping = {}

    # Define synonyms or keywords for carriers
    carrier_keywords = {}
    for c in carriers_catalog:
        cid = c['id']
        name = c['name'].lower()
        keywords = [name]
        
        # Add specific aliases
        if cid == 'american_interfidelity': keywords.append('ai'); keywords.append('rrg')
        if cid == 'lloyds': keywords.append('lloyd')
        if cid == 'great_american': keywords.append('great am')
        if cid == 'clear_blue': keywords.extend(['clear blue', 'clearblue'])
        if cid == 'falls_lake': keywords.append('falls lake')
        
        carrier_keywords[cid] = keywords

    # Iterate MGA folders
    if not os.path.exists(base_dir):
        print("Base directory not found")
        return

    subdirs = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]

    for subdir in subdirs:
        mga_name_clean = re.sub(r'^[\d\.\-\s]+', '', subdir).strip()
        print(f"Scanning {mga_name_clean}...")
        
        found_carriers = set()
        
        # Walk through MGA folder
        mga_path = os.path.join(base_dir, subdir)
        for root, dirs, files in os.walk(mga_path):
            for file in files:
                if file.endswith(".xml") and "slide" in file:
                    path = os.path.join(root, file)
                    text = extract_text_from_xml(path)
                    
                    # Check for carriers in this text
                    for cid, kws in carrier_keywords.items():
                        for kw in kws:
                            if f" {kw} " in f" {text} " or f"({kw})" in text or f"/{kw}" in text:
                                found_carriers.add(cid)
        
        if found_carriers:
            mapping[mga_name_clean] = list(found_carriers)
        else:
            mapping[mga_name_clean] = []

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2)
    
    print(f"Mapping complete. Found {len(mapping)} MGAs.")

if __name__ == "__main__":
    map_mga_to_carriers()
