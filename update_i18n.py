import json
import re

en_add = {
  "AI_Language_Instruction": "Respond completely in English.",
  "AI_Greeting": "Hi! I'm your Club Wellness AI. What kind of routine do you want to build today? (Try typing: 'I want a beginner muscle building routine' or 'Yoga flow for 10 mins')",
  "AI_Placeholder_Idle": "Ask for a routine...",
  "AI_Placeholder_Listening": "Listening...",
  "AI_Typing": "AI is typing...",
  "AI_Ask_Me": "Ask me! 👋",
  "AI_Send": "Send",
  "AI_Simulated_Muscle": "Here is a custom Muscle routine for you:\n• Push-ups (3 sets of 15)\n• Dumbbell Squats (3 sets of 12)\n• Plank (60s)\nKeep your core tight and form strict! Let me know if you want to add weights.",
  "AI_Simulated_Yoga": "Here is a relaxing Yoga flow:\n• Child's Pose (2 mins)\n• Cat-Cow (2 mins)\n• Downward Dog (2 mins)\nFocus on deep, steady breathing. Namaste!",
  "AI_Simulated_HIIT": "Ready to sweat? Here is a HIIT routine:\n• Jumping Jacks (45s)\n• Burpees (45s)\n• Mountain Climbers (45s)\nRest for 15s between each! Repeat 3 times.",
  "AI_Simulated_Unknown": "I can create custom routines for Muscle Building, Yoga, or HIIT. Tell me which one you prefer, and your current fitness level (beginner/advanced)!",
  "AI_Error": "Error connecting to AI API. Please try again or check your API key.",
  "AI_Fallback_Routine": "Sorry, I couldn't generate a routine right now.",
  "Bodyweight": "Bodyweight",
  "Moderate": "Moderate",
  "Light": "Light",
  "Light Stretching": "Light Stretching", "Yoga Flow": "Yoga Flow", "Gentle Stretching": "Gentle Stretching", "Savasana (Meditation)": "Savasana (Meditation)", "Light Jogging in Place": "Light Jogging in Place", "Active Recovery": "Active Recovery",
  "Push-ups": "Push-ups", "Dumbbell Bench Press": "Dumbbell Bench Press", "Tricep Dips": "Tricep Dips", "Overhead Tricep Extension": "Overhead Tricep Extension", "Sun Salutation": "Sun Salutation", "Downward Dog": "Downward Dog", "Warrior I & II": "Warrior I & II", "Tree Pose": "Tree Pose", "Jumping Jacks": "Jumping Jacks", "Burpees": "Burpees", "Mountain Climbers": "Mountain Climbers", "High Knees": "High Knees",
  "Dumbbell Rows": "Dumbbell Rows", "Pull-ups": "Pull-ups", "Dumbbell Bicep Curls": "Dumbbell Bicep Curls", "Hammer Curls": "Hammer Curls", "Cat-Cow Stretch": "Cat-Cow Stretch", "Child's Pose": "Child's Pose", "Cobra Pose": "Cobra Pose", "Seated Forward Bend": "Seated Forward Bend", "Jump Squats": "Jump Squats", "Skaters": "Skaters", "Plank Jacks": "Plank Jacks", "Butt Kicks": "Butt Kicks",
  "Goblet Squats": "Goblet Squats", "Lunges": "Lunges", "Glute Bridges": "Glute Bridges", "Plank": "Plank", "Triangle Pose": "Triangle Pose", "Bridge Pose": "Bridge Pose", "Pigeon Pose": "Pigeon Pose", "Corpse Pose (Savasana)": "Corpse Pose (Savasana)", "Tuck Jumps": "Tuck Jumps", "Lunge Jumps": "Lunge Jumps", "Bicycle Crunches": "Bicycle Crunches", "Russian Twists": "Russian Twists",
  "Overhead Press": "Overhead Press", "Lateral Raises": "Lateral Raises", "Front Raises": "Front Raises", "Mountain Pose": "Mountain Pose", "Chair Pose": "Chair Pose", "Eagle Pose": "Eagle Pose", "Boat Pose": "Boat Pose", "Core Plank": "Core Plank",
  "Dumbbell Deadlifts": "Dumbbell Deadlifts", "Thrusters": "Thrusters", "Renegade Rows": "Renegade Rows", "Camel Pose": "Camel Pose", "Bow Pose": "Bow Pose", "Locust Pose": "Locust Pose", "Fish Pose": "Fish Pose",
  "Bird-Dog": "Bird-Dog", "Dead Bug": "Dead Bug", "Half Moon Pose": "Half Moon Pose", "Extended Side Angle": "Extended Side Angle", "Upward Facing Dog": "Upward Facing Dog", "Broad Jumps": "Broad Jumps", "Bear Crawls": "Bear Crawls", "Inchworms": "Inchworms", "Fast Feet": "Fast Feet",
  "15 mins": "15 mins", "10 mins": "10 mins", "5 mins": "5 mins", "25 mins": "25 mins", "5 mins per side": "5 mins per side", "3 mins": "3 mins", "2 mins per side": "2 mins per side", "4 mins": "4 mins", "3 mins per side": "3 mins per side", "4 mins per side": "4 mins per side", "2 mins": "2 mins",
  "3 sets of 15": "3 sets of 15", "3 sets of 12": "3 sets of 12", "3 sets of 10": "3 sets of 10", "4 sets of 12": "4 sets of 12", "3 sets of 12 per leg": "3 sets of 12 per leg", "3 sets of 60 seconds": "3 sets of 60 seconds", "3 sets of 20": "3 sets of 20", "3 sets of 10 per arm": "3 sets of 10 per arm", "3 sets of 10 per side": "3 sets of 10 per side", "45 seconds": "45 seconds"
}

bn_add = {
  "AI_Language_Instruction": "সম্পূর্ণরূপে বাংলায় উত্তর দিন।",
  "AI_Greeting": "নমস্কার! আমি আপনার ক্লাবের সুস্থতা এআই। আপনি আজ কোন ধরণের রুটিন তৈরি করতে চান?",
  "AI_Placeholder_Idle": "একটি রুটিনের জন্য জিজ্ঞাসা করুন...",
  "AI_Placeholder_Listening": "শুনছি...",
  "AI_Typing": "এআই টাইপ করছে...",
  "AI_Ask_Me": "আমাকে জিজ্ঞাসা করুন! 👋",
  "AI_Send": "পাঠান",
  "AI_Simulated_Muscle": "এখানে আপনার জন্য একটি কাস্টম পেশী রুটিন:\n• পুশ-আপস (৩ সেট ১৫ বার)\n• ডাম্বেল স্কোয়াটস (৩ সেট ১২ বার)\n• প্ল্যাঙ্ক (৬০ সেকেন্ড)\nআপনার কোর টাইট রাখুন! আপনি ওজন যোগ করতে চাইলে আমাকে জানান।",
  "AI_Simulated_Yoga": "এখানে একটি শিথিল যোগ প্রবাহ:\n• চাইল্ডস পোজ (২ মিনিট)\n• বিড়াল-গরু (২ মিনিট)\n• ডাউনওয়ার্ড ডগ (২ মিনিট)\nগভীর, অবিচলিত শ্বাস-প্রশ্বাসে ফোকাস করুন। নমস্তে!",
  "AI_Simulated_HIIT": "ঘাম ঝরাতে প্রস্তুত? এখানে একটি HIIT রুটিন:\n• জাম্পিং জ্যাকস (৪৫ সেকেন্ড)\n• বারপিস (৪৫ সেকেন্ড)\n• মাউন্টেন ক্লাইম্বার্স (৪৫ সেকেন্ড)\nপ্রতিটির মধ্যে ১৫ সেকেন্ডের জন্য বিশ্রাম নিন! ৩ বার পুনরাবৃত্তি করুন।",
  "AI_Simulated_Unknown": "আমি পেশী, যোগ বা HIIT এর জন্য কাস্টম রুটিন তৈরি করতে পারি। আপনি কোনটি পছন্দ করেন এবং আপনার বর্তমান ফিটনেস স্তর কী তা আমাকে বলুন!",
  "AI_Error": "এআই এপিআই এর সাথে সংযোগ করতে ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন বা আপনার এপিআই কী চেক করুন।",
  "AI_Fallback_Routine": "দুঃখিত, আমি এই মুহূর্তে একটি রুটিন তৈরি করতে পারিনি।",
  "Bodyweight": "বডিওয়েট", "Moderate": "মাঝারি", "Light": "হালকা",
  "Light Stretching": "হালকা স্ট্রেচিং", "Yoga Flow": "যোগ প্রবাহ", "Gentle Stretching": "হালকা স্ট্রেচিং", "Savasana (Meditation)": "শবাসন (ধ্যান)", "Light Jogging in Place": "জায়গাতেই হালকা জগিং", "Active Recovery": "সক্রিয় পুনরুদ্ধার",
  "Push-ups": "পুশ-আপ", "Dumbbell Bench Press": "ডাম্বেল বেঞ্চ প্রেস", "Tricep Dips": "ট্রাইসেপ ডিপস", "Overhead Tricep Extension": "ওভারহেড ট্রাইসেপ এক্সটেনশন", "Sun Salutation": "সূর্য নমস্কার", "Downward Dog": "ডাউনওয়ার্ড ডগ", "Warrior I & II": "যোদ্ধা ১ ও ২", "Tree Pose": "বৃক্ষাসন", "Jumping Jacks": "জাম্পিং জ্যাকস", "Burpees": "বারপিস", "Mountain Climbers": "মাউন্টেন ক্লাইম্বার্স", "High Knees": "হাই নিস",
  "Dumbbell Rows": "ডাম্বেল রোজ", "Pull-ups": "পুল-আপ", "Dumbbell Bicep Curls": "ডাম্বেল বাইসেপ কার্লস", "Hammer Curls": "হ্যামার কার্লস", "Cat-Cow Stretch": "বিড়াল-গরু স্ট্রেচ", "Child's Pose": "চাইল্ডস পোজ", "Cobra Pose": "ভুজঙ্গাসন", "Seated Forward Bend": "পশ্চিমোত্তানাসন", "Jump Squats": "জাম্প স্কোয়াটস", "Skaters": "স্কেটার্স", "Plank Jacks": "প্ল্যাঙ্ক জ্যাকস", "Butt Kicks": "বাট কিকস",
  "Goblet Squats": "গবলেট স্কোয়াটস", "Lunges": "লঞ্জেস", "Glute Bridges": "গ্লুট ব্রিজ", "Plank": "প্ল্যাঙ্ক", "Triangle Pose": "ত্রিকোণাসন", "Bridge Pose": "সেতুবন্ধনাসন", "Pigeon Pose": "কপোতাসন", "Corpse Pose (Savasana)": "শবাসন", "Tuck Jumps": "টাক জাম্পস", "Lunge Jumps": "লঞ্জ জাম্পস", "Bicycle Crunches": "বাইসাইকেল ক্রাঞ্চেস", "Russian Twists": "রাশিয়ান টুইস্টস",
  "Overhead Press": "ওভারহেড প্রেস", "Lateral Raises": "ল্যাটারাল রেইজেস", "Front Raises": "ফ্রন্ট রেইজেস", "Mountain Pose": "তাদাসন", "Chair Pose": "উৎকটাসন", "Eagle Pose": "গরুড়াসন", "Boat Pose": "নৌকাসন", "Core Plank": "কোর প্ল্যাঙ্ক",
  "Dumbbell Deadlifts": "ডাম্বেল ডেডলিফ্টস", "Thrusters": "থ্রাস্টার্স", "Renegade Rows": "রেনেগেড রোজ", "Camel Pose": "উষ্ট্রাসন", "Bow Pose": "ধনুরাসন", "Locust Pose": "শলভাসন", "Fish Pose": "মৎসাসন",
  "Bird-Dog": "বার্ড-ডগ", "Dead Bug": "ডেড বাগ", "Half Moon Pose": "অর্ধচন্দ্রাসন", "Extended Side Angle": "উৎথিত পার্শ্বকোণাসন", "Upward Facing Dog": "উর্ধ্বমুখ শ্বানাসন", "Broad Jumps": "ব্রড জাম্পস", "Bear Crawls": "বিয়ার ক্রল", "Inchworms": "ইঞ্চওয়ার্মস", "Fast Feet": "ফাস্ট ফিট",
  "15 mins": "১৫ মিনিট", "10 mins": "১০ মিনিট", "5 mins": "৫ মিনিট", "25 mins": "২৫ মিনিট", "5 mins per side": "প্রতি পাশে ৫ মিনিট", "3 mins": "৩ মিনিট", "2 mins per side": "প্রতি পাশে ২ মিনিট", "4 mins": "৪ মিনিট", "3 mins per side": "প্রতি পাশে ৩ মিনিট", "4 mins per side": "প্রতি পাশে ৪ মিনিট", "2 mins": "২ মিনিট",
  "3 sets of 15": "৩ সেট ১৫ বার", "3 sets of 12": "৩ সেট ১২ বার", "3 sets of 10": "৩ সেট ১০ বার", "4 sets of 12": "৪ সেট ১২ বার", "3 sets of 12 per leg": "প্রতি পায়ে ৩ সেট ১২ বার", "3 sets of 60 seconds": "৩ সেট ৬০ সেকেন্ড", "3 sets of 20": "৩ সেট ২০ বার", "3 sets of 10 per arm": "প্রতি বাহুতে ৩ সেট ১০ বার", "3 sets of 10 per side": "প্রতি পাশে ৩ সেট ১০ বার", "45 seconds": "৪৫ সেকেন্ড"
}

hi_add = {
  "AI_Language_Instruction": "पूरी तरह से हिंदी में उत्तर दें।",
  "AI_Greeting": "नमस्ते! मैं आपका क्लब वेलनेस एआई हूं। आज आप किस तरह का रूटीन बनाना चाहते हैं?",
  "AI_Placeholder_Idle": "एक रूटीन के लिए पूछें...",
  "AI_Placeholder_Listening": "सुन रहा हूँ...",
  "AI_Typing": "एआई टाइप कर रहा है...",
  "AI_Ask_Me": "मुझसे पूछें! 👋",
  "AI_Send": "भेजें",
  "AI_Simulated_Muscle": "आपके लिए यहाँ एक स्नायु रूटीन है:\n• पुश-अप्स (3 सेट 15 बार)\n• डंबेल स्क्वाट्स (3 सेट 12 बार)\n• प्लैंक (60 सेकंड)\nअपने कोर को टाइट रखें!",
  "AI_Simulated_Yoga": "यहाँ एक योग प्रवाह है:\n• चाइल्ड पोज़ (2 मिनट)\n• कैट-काउ (2 मिनट)\n• डाउनवर्ड डॉग (2 मिनट)\nगहरी सांसों पर ध्यान दें। नमस्ते!",
  "AI_Simulated_HIIT": "पसीना बहाने के लिए तैयार? यहाँ एक HIIT रूटीन है:\n• जंपिंग जैक (45 सेकंड)\n• बर्पीज़ (45 सेकंड)\n• माउंटेन क्लाइम्बर्स (45 सेकंड)\nप्रत्येक के बीच 15 सेकंड का आराम करें! 3 बार दोहराएं।",
  "AI_Simulated_Unknown": "मैं स्नायु, योग या HIIT के लिए रूटीन बना सकता हूं। आप कौन सा पसंद करते हैं, मुझे बताएं!",
  "AI_Error": "एआई एपीआई से कनेक्ट करने में त्रुटि। कृपया पुनः प्रयास करें या अपनी एपीआई कुंजी जांचें।",
  "AI_Fallback_Routine": "क्षमा करें, मैं अभी कोई रूटीन नहीं बना सका।",
  "Bodyweight": "बॉडीवेट", "Moderate": "मध्यम", "Light": "हल्का",
  "Light Stretching": "हल्का स्ट्रेचिंग", "Yoga Flow": "योग प्रवाह", "Gentle Stretching": "हल्का स्ट्रेचिंग", "Savasana (Meditation)": "शवासन (ध्यान)", "Light Jogging in Place": "हल्की जॉगिंग", "Active Recovery": "सक्रिय रिकवरी",
  "Push-ups": "पुश-अप्स", "Dumbbell Bench Press": "डंबेल बेंच प्रेस", "Tricep Dips": "ट्राइसेप डिप्स", "Overhead Tricep Extension": "ओवरहेड ट्राइसेप एक्सटेंशन", "Sun Salutation": "सूर्य नमस्कार", "Downward Dog": "डाउनवर्ड डॉग", "Warrior I & II": "योद्धा 1 और 2", "Tree Pose": "वृक्षासन", "Jumping Jacks": "जंपिंग जैक", "Burpees": "बर्पीज़", "Mountain Climbers": "माउंटेन क्लाइम्बर्स", "High Knees": "हाई नीज़",
  "Dumbbell Rows": "डंबेल रोज़", "Pull-ups": "पुल-अप्स", "Dumbbell Bicep Curls": "डंबेल बाइसेप कर्ल्स", "Hammer Curls": "हैमर कर्ल्स", "Cat-Cow Stretch": "कैट-काउ स्ट्रेच", "Child's Pose": "चाइल्ड्स पोज़", "Cobra Pose": "भुजंगासन", "Seated Forward Bend": "पश्चिमोत्तानासन", "Jump Squats": "जंप स्क्वाट्स", "Skaters": "स्केटर्स", "Plank Jacks": "प्लैंक जैक", "Butt Kicks": "बट किक्स",
  "Goblet Squats": "गॉब्लेट स्क्वाट्स", "Lunges": "लंज", "Glute Bridges": "ग्लूट ब्रिज", "Plank": "प्लैंक", "Triangle Pose": "त्रिकोणासन", "Bridge Pose": "सेतुबंधासन", "Pigeon Pose": "कपोतासन", "Corpse Pose (Savasana)": "शवासन", "Tuck Jumps": "टक जंप्स", "Lunge Jumps": "लंज जंप्स", "Bicycle Crunches": "बाइसिकल क्रंचेस", "Russian Twists": "रशियन ट्विस्ट",
  "Overhead Press": "ओवरहेड प्रेस", "Lateral Raises": "लेटरल रेज़ेज़", "Front Raises": "फ्रंट रेज़ेज़", "Mountain Pose": "ताड़ासन", "Chair Pose": "उत्कटासन", "Eagle Pose": "गरुड़ासन", "Boat Pose": "नौकासन", "Core Plank": "कोर प्लैंक",
  "Dumbbell Deadlifts": "डंबेल डेडलिफ्ट्स", "Thrusters": "थ्रस्टर्स", "Renegade Rows": "रेनेगेड रोज़", "Camel Pose": "उष्ट्रासन", "Bow Pose": "धनुरासन", "Locust Pose": "शलभासन", "Fish Pose": "मत्स्यासन",
  "Bird-Dog": "बर्ड-डॉग", "Dead Bug": "डेड बग", "Half Moon Pose": "अर्धचंद्रासन", "Extended Side Angle": "उत्थित पार्श्वकोणासन", "Upward Facing Dog": "ऊर्ध्वमुख श्वानासन", "Broad Jumps": "ब्रॉड जंप्स", "Bear Crawls": "बियर क्रॉल", "Inchworms": "इंचवर्म्स", "Fast Feet": "फास्ट फीट",
  "15 mins": "15 मिनट", "10 mins": "10 मिनट", "5 mins": "5 मिनट", "25 mins": "25 मिनट", "5 mins per side": "प्रति पक्ष 5 मिनट", "3 mins": "3 मिनट", "2 mins per side": "प्रति पक्ष 2 मिनट", "4 mins": "4 मिनट", "3 mins per side": "प्रति पक्ष 3 मिनट", "4 mins per side": "प्रति पक्ष 4 मिनट", "2 mins": "2 मिनट",
  "3 sets of 15": "3 सेट 15 बार", "3 sets of 12": "3 सेट 12 बार", "3 sets of 10": "3 सेट 10 बार", "4 sets of 12": "4 सेट 12 बार", "3 sets of 12 per leg": "प्रति पैर 3 सेट 12 बार", "3 sets of 60 seconds": "3 सेट 60 सेकंड", "3 sets of 20": "3 सेट 20 बार", "3 sets of 10 per arm": "प्रति बांह 3 सेट 10 बार", "3 sets of 10 per side": "प्रति पक्ष 3 सेट 10 बार", "45 seconds": "45 सेकंड"
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
