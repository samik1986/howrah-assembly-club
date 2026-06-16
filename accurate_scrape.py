import os
import re
import urllib.request
from bs4 import BeautifulSoup

src_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\src\components'
wellness_dir = r'c:\Users\banerjee\Desktop\howrah-assembly-club\public\assets\wellness'

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

def slugify(text):
    text = text.lower()
    text = text.replace(' & ', ' ')
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

def download_gif(url, out_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            with open(out_path, 'wb') as f:
                f.write(response.read())
        return True
    except:
        return False

success_count = 0
for name, filename in all_items:
    out_path = os.path.join(wellness_dir, filename)
    slug = slugify(name)
    
    # Try different variations if the first fails
    slug_variations = [
        slug,
        slug.replace('s-', '-').rstrip('s'), # remove plurals
        slug.replace('-pose', '')
    ]
    
    found = False
    for s in slug_variations:
        if found: break
        url = f'https://fitnessprogramer.com/exercise/{s}/'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                html = response.read().decode('utf-8', errors='ignore')
                soup = BeautifulSoup(html, 'html.parser')
                for img in soup.find_all('img'):
                    src = img.get('src')
                    if src and src.endswith('.gif'):
                        print(f"[{name}] Found precise GIF on fitnessprogramer! Downloading...")
                        if download_gif(src, out_path):
                            success_count += 1
                            found = True
                            break
        except urllib.error.HTTPError as e:
            pass # 404 probably
        except Exception as e:
            pass
            
    if not found:
        print(f"[{name}] Could not find precise GIF on fitnessprogramer.")

print(f"Successfully mapped and downloaded {success_count} precise GIFs!")
