import json

# Load MGA data
with open('src/assets/data/mga_db.json', 'r', encoding='utf-8') as f:
    mgas = json.load(f)

# Define realistic carrier limits for each MGA
carrier_rules = {
    '20jm_wilson': 4,  # 44 -> 4
    '13_amwins': 6,    # 9 -> 6
    '10treaty': 5,     # 7 -> 5
    '17crc': 5,        # 7 -> 5      
    '25_star_mutual': 4,  # 6 -> 4
    '03_-_lp_riks': 4,    # 5 -> 4
}

cleaned_count = 0

for mga in mgas:
    mga_id = mga.get('id')
    if mga_id in carrier_rules and mga.get('carriers'):
        max_carriers = carrier_rules[mga_id]
        original_count = len(mga['carriers'])
        
        if original_count > max_carriers:
            # Keep only the first N carriers (assuming they're the most important)
            mga['carriers'] = mga['carriers'][:max_carriers]
            print(f"Cleaned {mga['name']}: {original_count} -> {max_carriers} carriers")
            cleaned_count += 1

# Save cleaned data
with open('src/assets/data/mga_db.json', 'w', encoding='utf-8') as f:
    json.dump(mgas, f, indent=2, ensure_ascii=False)

print(f"\n✅ Cleaned {cleaned_count} MGAs")
print("✅ Saved to mga_db.json")
