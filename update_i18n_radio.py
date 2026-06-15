import json

en_add = {
  "Live_Radio": "Live Akashvani Radio"
}

bn_add = {
  "Live_Radio": "লাইভ আকাশবাণী রেডিও"
}

hi_add = {
  "Live_Radio": "लाइव आकाशवाणी रेडियो"
}

with open("c:/Users/banerjee/Desktop/howrah-assembly-club/src/i18n.js", "r", encoding="utf-8") as f:
    content = f.read()

# For English
en_str = ',\n      '.join(f'"{k}": "{v}"' for k, v in en_add.items())
content = content.replace('"Reset": "Reset"', f'"Reset": "Reset",\n      {en_str}')

# For Bengali
bn_str = ',\n      '.join(f'"{k}": "{v}"' for k, v in bn_add.items())
content = content.replace('"Reset": "রিসেট"', f'"Reset": "রিসেট",\n      {bn_str}')

# For Hindi
hi_str = ',\n      '.join(f'"{k}": "{v}"' for k, v in hi_add.items())
content = content.replace('"Reset": "रीसेट"', f'"Reset": "रीसेट",\n      {hi_str}')

with open("c:/Users/banerjee/Desktop/howrah-assembly-club/src/i18n.js", "w", encoding="utf-8") as f:
    f.write(content)

print("i18n.js updated with radio successfully")
