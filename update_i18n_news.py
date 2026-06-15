import json

en_add = {
  "News_Corner": "News Corner",
  "Daily_News": "Daily News Updates",
  "News_Desc": "Stay updated with the latest headlines from top newspapers!",
  "Read_More": "Read full article"
}

bn_add = {
  "News_Corner": "সংবাদ কর্নার",
  "Daily_News": "দৈনিক সংবাদ আপডেট",
  "News_Desc": "শীর্ষ সংবাদপত্রগুলি থেকে সর্বশেষ খবরের সাথে আপডেট থাকুন!",
  "Read_More": "সম্পূর্ণ নিবন্ধ পড়ুন"
}

hi_add = {
  "News_Corner": "समाचार कॉर्नर",
  "Daily_News": "दैनिक समाचार अपडेट",
  "News_Desc": "शीर्ष समाचार पत्रों से नवीनतम सुर्खियों के साथ अपडेट रहें!",
  "Read_More": "पूरा लेख पढ़ें"
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
