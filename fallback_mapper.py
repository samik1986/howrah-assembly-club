import os
import re
import difflib
import shutil

src_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\src\components'
wellness_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\public\assets\wellness'
gymvisual_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\public\assets\gymvisual_gifs'
artifacts_dir = r'C:\Users\banerjee\.gemini\antigravity-ide\brain\ce5a0917-39df-41c8-8cf8-7cedd8bed39a'

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

artifact_files = [f for f in os.listdir(artifacts_dir) if f.endswith('.png')]
artifact_names = [re.sub(r'_\d+$', '', os.path.splitext(f)[0]).replace('_', ' ') for f in artifact_files]

def find_best_match(target_name, candidates_files, candidates_names, weight_substring=10):
    target = target_name.lower().replace('&', '').replace('-', ' ').strip()
    target_words = set(target.split())
    
    best_match = None
    best_score = 0
    
    for i, c_name in enumerate(candidates_names):
        c_name_lower = c_name.lower()
        c_words = set(c_name_lower.split())
        
        overlap = len(target_words.intersection(c_words))
        
        substring_score = 0
        if target in c_name_lower:
            substring_score = weight_substring
            
        seq_ratio = difflib.SequenceMatcher(None, target, c_name_lower).ratio()
        
        score = overlap * 2 + substring_score + seq_ratio * 5
        
        if score > best_score:
            best_score = score
            best_match = candidates_files[i]
            
    return best_match, best_score

print("Mapping Results with Fallbacks:")
fallback_count = 0
gymvisual_count = 0

for name, expected_filename in all_items:
    match_gv, score_gv = find_best_match(name, gymvisual_files, gymvisual_names, weight_substring=10)
    
    # Threshold for a "good" gymvisual match
    if score_gv > 8.0:
        print(f"[GV] Target: {name: <30} | Match: {match_gv: <45} | Score: {score_gv:.2f}")
        shutil.copy(os.path.join(gymvisual_dir, match_gv), os.path.join(wellness_dir, expected_filename))
        gymvisual_count += 1
    else:
        # Try artifact fallback
        match_art, score_art = find_best_match(name, artifact_files, artifact_names, weight_substring=15)
        if match_art and score_art > 4.0:
            print(f"[ART] Target: {name: <30} | Fallback: {match_art: <45} | Score: {score_art:.2f}")
            # Browsers handle PNG data perfectly even if file extension is .gif
            shutil.copy(os.path.join(artifacts_dir, match_art), os.path.join(wellness_dir, expected_filename))
            fallback_count += 1
        else:
            # If no fallback found, stick to the weak GV match so it's not totally empty
            print(f"[WEAK] Target: {name: <30} | Match: {match_gv: <45} | Score: {score_gv:.2f}")
            if match_gv:
                shutil.copy(os.path.join(gymvisual_dir, match_gv), os.path.join(wellness_dir, expected_filename))

print(f"Mapped {gymvisual_count} from GymVisual and {fallback_count} from previously generated artifacts.")
