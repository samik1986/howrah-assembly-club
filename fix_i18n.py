import json

broken_en_muscle = '"AI_Simulated_Muscle": "Here is a custom Muscle routine for you:\n• Push-ups (3 sets of 15)\n• Dumbbell Squats (3 sets of 12)\n• Plank (60s)\nKeep your core tight and form strict! Let me know if you want to add weights."'
fixed_en_muscle = broken_en_muscle.replace('\n', '\\n')

broken_en_yoga = '"AI_Simulated_Yoga": "Here is a relaxing Yoga flow:\n• Child\'s Pose (2 mins)\n• Cat-Cow (2 mins)\n• Downward Dog (2 mins)\nFocus on deep, steady breathing. Namaste!"'
fixed_en_yoga = broken_en_yoga.replace('\n', '\\n')

broken_en_hiit = '"AI_Simulated_HIIT": "Ready to sweat? Here is a HIIT routine:\n• Jumping Jacks (45s)\n• Burpees (45s)\n• Mountain Climbers (45s)\nRest for 15s between each! Repeat 3 times."'
fixed_en_hiit = broken_en_hiit.replace('\n', '\\n')

broken_bn_muscle = '"AI_Simulated_Muscle": "এখানে আপনার জন্য একটি কাস্টম পেশী রুটিন:\n• পুশ-আপস (৩ সেট ১৫ বার)\n• ডাম্বেল স্কোয়াটস (৩ সেট ১২ বার)\n• প্ল্যাঙ্ক (৬০ সেকেন্ড)\nআপনার কোর টাইট রাখুন! আপনি ওজন যোগ করতে চাইলে আমাকে জানান।"'
fixed_bn_muscle = broken_bn_muscle.replace('\n', '\\n')

broken_bn_yoga = '"AI_Simulated_Yoga": "এখানে একটি শিথিল যোগ প্রবাহ:\n• চাইল্ডস পোজ (২ মিনিট)\n• বিড়াল-গরু (২ মিনিট)\n• ডাউনওয়ার্ড ডগ (২ মিনিট)\nগভীর, অবিচলিত শ্বাস-প্রশ্বাসে ফোকাস করুন। নমস্তে!"'
fixed_bn_yoga = broken_bn_yoga.replace('\n', '\\n')

broken_bn_hiit = '"AI_Simulated_HIIT": "ঘাম ঝরাতে প্রস্তুত? এখানে একটি HIIT রুটিন:\n• জাম্পিং জ্যাকস (৪৫ সেকেন্ড)\n• বারপিস (৪৫ সেকেন্ড)\n• মাউন্টেন ক্লাইম্বার্স (৪৫ সেকেন্ড)\nপ্রতিটির মধ্যে ১৫ সেকেন্ডের জন্য বিশ্রাম নিন! ৩ বার পুনরাবৃত্তি করুন।"'
fixed_bn_hiit = broken_bn_hiit.replace('\n', '\\n')

broken_hi_muscle = '"AI_Simulated_Muscle": "आपके लिए यहाँ एक स्नायु रूटीन है:\n• पुश-अप्स (3 सेट 15 बार)\n• डंबेल स्क्वाट्स (3 सेट 12 बार)\n• प्लैंक (60 सेकंड)\nअपने कोर को टाइट रखें!"'
fixed_hi_muscle = broken_hi_muscle.replace('\n', '\\n')

broken_hi_yoga = '"AI_Simulated_Yoga": "यहाँ एक योग प्रवाह है:\n• चाइल्ड पोज़ (2 मिनट)\n• कैट-काउ (2 मिनट)\n• डाउनवर्ड डॉग (2 मिनट)\nगहरी सांसों पर ध्यान दें। नमस्ते!"'
fixed_hi_yoga = broken_hi_yoga.replace('\n', '\\n')

broken_hi_hiit = '"AI_Simulated_HIIT": "पसीना बहाने के लिए तैयार? यहाँ एक HIIT रूटीन है:\n• जंपिंग जैक (45 सेकंड)\n• बर्पीज़ (45 सेकंड)\n• माउंटेन क्लाइम्बर्स (45 सेकंड)\nप्रत्येक के बीच 15 सेकंड का आराम करें! 3 बार दोहराएं।"'
fixed_hi_hiit = broken_hi_hiit.replace('\n', '\\n')

with open("c:/Users/banerjee/Desktop/howrah-assembly-club/src/i18n.js", "r", encoding="utf-8") as f:
    text = f.read()

replacements = [
    (broken_en_muscle, fixed_en_muscle), (broken_en_yoga, fixed_en_yoga), (broken_en_hiit, fixed_en_hiit),
    (broken_bn_muscle, fixed_bn_muscle), (broken_bn_yoga, fixed_bn_yoga), (broken_bn_hiit, fixed_bn_hiit),
    (broken_hi_muscle, fixed_hi_muscle), (broken_hi_yoga, fixed_hi_yoga), (broken_hi_hiit, fixed_hi_hiit)
]

for b, f_val in replacements:
    text = text.replace(b, f_val)

with open("c:/Users/banerjee/Desktop/howrah-assembly-club/src/i18n.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed newlines in strings")
