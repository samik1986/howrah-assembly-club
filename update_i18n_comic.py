import json

en_add = {
  "Daily_Comic": "Daily Comic",
  "Comic_Desc": "Enjoy a fun new royalty-free comic strip every day!"
}

bn_add = {
  "Daily_Comic": "দৈনিক কমিক",
  "Comic_Desc": "প্রতিদিন একটি নতুন রয়্যালটি-মুক্ত কমিক উপভোগ করুন!"
}

hi_add = {
  "Daily_Comic": "दैनिक कॉमिक",
  "Comic_Desc": "हर दिन एक नए रॉयल्टी-मुक्त कॉमिक का आनंद लें!"
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

print("i18n.js updated successfully")
