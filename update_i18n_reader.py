import json
import re

with open('src/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the resources object
match = re.search(r'const resources = (\{.*?\});\n\nexport default', content, re.DOTALL)
if not match:
    # Try finding the end just before export default i18n
    match = re.search(r'const resources = (\{.*?\});\s*i18n', content, re.DOTALL)

if match:
    try:
        # It's JS, not pure JSON, but the keys and structure are JSON-like. 
        # But we can just use regex to insert the keys at the end of each translation object!
        
        # English
        content = re.sub(r'("45 seconds": "45 seconds"\s*)\}', r'\1, "Read_AI_News": "Listen to AI News Broadcast 🤖", "Stop_AI_News": "Stop Broadcast ⏹️", "Generating_AI_News": "Preparing Broadcast..."}', content)
        
        # Bengali
        content = re.sub(r'("45 seconds": "৪৫ সেকেন্ড"\s*)\}', r'\1, "Read_AI_News": "এআই নিউজ ব্রডকাস্ট শুনুন 🤖", "Stop_AI_News": "সম্প্রচার থামান ⏹️", "Generating_AI_News": "সম্প্রচার প্রস্তুত করা হচ্ছে..."}', content)
        
        # Hindi
        content = re.sub(r'("45 seconds": "45 सेकंड"\s*)\}', r'\1, "Read_AI_News": "एआई समाचार प्रसारण सुनें 🤖", "Stop_AI_News": "प्रसारण रोकें ⏹️", "Generating_AI_News": "प्रसारण तैयार किया जा रहा है..."}', content)
        
        with open('src/i18n.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated i18n.js")
    except Exception as e:
        print(e)
else:
    print("Could not find resources block")
