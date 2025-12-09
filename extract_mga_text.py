import os
import glob
import re
import json
import xml.etree.ElementTree as ET

BASE_DIR = r"d:\Dev\AJM MarketFinder\AJM-MarketFinder-V2\src\assets\data\mga"
OUTPUT_FILE = "mga_extracted_text.json"

def extract_text_from_xml(xml_path):
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        # Namespaces are annoying in ElementTree, usually we can just find all 't' tags if we strip namespaces or use wildcards
        # But 'a:t' maps to http://schemas.openxmlformats.org/drawingml/2006/main
        namespaces = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
        texts = [elem.text for elem in root.findall('.//a:t', namespaces) if elem.text]
        return " ".join(texts)
    except Exception as e:
        return ""

def main():
    mga_data = {}
    
    # Get all MGA folders
    mga_folders = [f.path for f in os.scandir(BASE_DIR) if f.is_dir()]
    
    for mga_folder in mga_folders:
        mga_name = os.path.basename(mga_folder)
        slides_dir = os.path.join(mga_folder, "ppt", "slides")
        
        if not os.path.exists(slides_dir):
            continue
            
        mga_data[mga_name] = []
        
        # Get all slides
        slide_files = glob.glob(os.path.join(slides_dir, "*.xml"))
        # Sort slides by number (slide1, slide2, etc)
        slide_files.sort(key=lambda x: int(os.path.basename(x).replace("slide", "").replace(".xml", "")))
        
        for slide_file in slide_files:
            text = extract_text_from_xml(slide_file)
            if text.strip():
                mga_data[mga_name].append({
                    "slide": os.path.basename(slide_file),
                    "content": text
                })
                
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(mga_data, f, indent=2, ensure_ascii=False)
        
    print(f"Extraction complete. Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
