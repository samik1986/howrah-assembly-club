import os
import re
import difflib
import shutil

src_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\src\components'
wellness_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\public\assets\wellness'
gymvisual_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\public\assets\gymvisual_gifs'

os.makedirs(wellness_dir, exist_ok=True)

with open(os.path.join(src_dir, 'WellnessCorner.jsx'), 'r', encoding='utf-8') as f:
    content = f.read()

def extract_items(text):
    items = []
    matches = re.finditer(r'\{[^\}]*name:\s*\"([^\"]+)\"[^\}]*image:\s*\"(?:/assets/(?:wellness|gymvisual_gifs)/([^\"]+\.gif))\"', text)
    for m in matches:
        items.append((m.group(1), m.group(2)))
    return items

muscle = extract_items(" ".join(re.findall(r'muscle: \[(.*?)\]', content, re.DOTALL)))
yoga = extract_items(" ".join(re.findall(r'yoga: \[(.*?)\]', content, re.DOTALL)))
hiit = extract_items(" ".join(re.findall(r'hiit: \[(.*?)\]', content, re.DOTALL)))

all_items = list(set(muscle + yoga + hiit))

gymvisual_files = [f for f in os.listdir(gymvisual_dir) if f.endswith('.gif')]
gymvisual_names = [os.path.splitext(f)[0].replace('_', ' ') for f in gymvisual_files]

def find_best_match(target_name):
    target = target_name.lower().replace('&', '').replace('-', ' ').strip()
    target_words = set(target.split())
    
    best_match = None
    best_score = 0
    
    for i, g_name in enumerate(gymvisual_names):
        g_name_lower = g_name.lower()
        g_words = set(g_name_lower.split())
        
        # Word overlap score
        overlap = len(target_words.intersection(g_words))
        
        # Exact substring score
        substring_score = 0
        if target in g_name_lower:
            substring_score = 10
            
        # Difflib sequence matching
        seq_ratio = difflib.SequenceMatcher(None, target, g_name_lower).ratio()
        
        score = overlap * 2 + substring_score + seq_ratio * 5
        
        if score > best_score:
            best_score = score
            best_match = gymvisual_files[i]
            
    return best_match, best_score

print("Mapping Results:")
for name, expected_filename in all_items:
    match, score = find_best_match(name)
    print(f"Target: {name: <30} | Match: {match: <45} | Score: {score:.2f}")
    
    if match:
        shutil.copy(os.path.join(gymvisual_dir, match), os.path.join(wellness_dir, expected_filename))

print("Copied files to wellness folder!")
