import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "About": "About",
      "Activities": "Activities",
      "Gallery": "Gallery",
      "Contact": "Contact",
      
      "Est_in_Howrah": "Est. in Howrah",
      "Welcome_to": "Welcome to",
      "Club_Name": "Howrah Assembly Club",
      "Hero_Desc": "A premier community club in Kadamtala, West Bengal. Join us for professional table tennis, community engagement, and a welcoming environment for all skill levels.",
      "Our_Activities": "Our Activities",
      "Visit_Us": "Visit Us",

      "Our_History": "Our History",
      "About_The_Club": "About The Club",
      "About_Desc": "Established as a pillar of the Kadamtala community, the Howrah Assembly Club has long been a place for sports enthusiasts and residents to come together.",
      "Sports_Excellence": "Sports Excellence",
      "Sports_Desc": "We pride ourselves on our state-of-the-art table tennis facilities, catering to everyone from beginners to seasoned professionals looking to hone their skills.",
      "Community_First": "Community First",
      "Community_Desc": "Beyond sports, we are a hub for social engagement, bringing together individuals from all walks of life in Howrah to foster long-lasting connections.",
      "Welcoming_Environment": "Welcoming Environment",
      "Welcoming_Desc": "Our doors are open to everyone. Experience a supportive and friendly atmosphere where you can learn, play, and grow.",

      "What_We_Do": "What We Do",
      "Our_Primary_Activities": "Our Primary Activities",
      "Table_Tennis_Sessions": "Table Tennis Sessions",
      "TTS_Desc": "Join our regular table tennis sessions. We have multiple high-quality tables available for practice, casual matches, and local tournaments.",
      "Prof_Coaching": "Professional Coaching available",
      "Local_Tournaments": "Regular local tournaments",
      "Equipment_Provided": "Equipment provided for beginners",
      "Typical_Timings": "Typical Timings",
      "Timings_Desc": "We are open most evenings. Drop by during our regular hours to see the action or join a game.",
      "Evening_Sessions": "Evening Sessions",
      "Timings_Note": "*Timings may vary on holidays and tournament days.",

      "Multimedia": "Multimedia",
      "Club_Gallery": "Club Gallery",
      "Gallery_Desc": "A glimpse into the action at Howrah Assembly Club. Explore our facilities and vibrant community.",
      "Evening_Match": "Evening Match",
      "Equipment_Ready": "Equipment Ready",
      "Our_Facilities": "Our Facilities",
      "Action_Shot": "Action Shot",

      "Get_In_Touch": "Get In Touch",
      "Contact_Desc": "Whether you are looking to join a table tennis session, participate in community events, or just want to see what we are about, we would love to have you.",
      "Address": "Address",
      "Club_Hours": "Club Hours",
      "Most_Evenings": "(Most Evenings)",

      "Footer_Desc": "A premier community and table tennis club in Kadamtala, West Bengal. Serving the community with passion and excellence.",
      "All_Rights": "All rights reserved.",

      "Transit_Guide": "Transit Guide",
      "Transit_Surface": "🚇 Surface (Rail/Metro/Bus):",
      "Transit_Surface_Desc": "Nearest Metro is Howrah Maidan (~3 km). Nearest railway station is Howrah Junction (~3.5 km). Kadamtala Bus Stand is within walking distance.",
      "Transit_Water": "⛴️ Water (Ferry):",
      "Transit_Water_Desc": "Nearest ferry point is Howrah Ferry Ghat (~3.5 km), accessible via local transport.",
      "Transit_Air": "✈️ Air:",
      "Transit_Air_Desc": "Netaji Subhash Chandra Bose International Airport (CCU) is approx 25 km away.",

      "Kids_Corner": "Kids Corner",
      "Daily_Game_Title": "Daily English Skill Builder",
      "Daily_Game_Desc": "Improve your vocabulary and cognitive skills! This interactive daily crossword updates automatically every day.",

      "Scramble_Title": "Word Scramble",
      "Scramble_Desc": "Unscramble the letters to find the word of the day!",
      "Hint": "Hint",
      "Your_Answer": "Your Answer",
      "Check_Answer": "Check Answer",
      "Correct": "Correct! Great job! 🎉",
      "Incorrect": "Not quite right. Try again!",

      "Explore_Club": "Explore the Club",
      "Read_More": "Read More",

      "Pronunciation_Title": "Daily Pronunciation Challenge",
      "Pronunciation_Desc": "Listen to the correct pronunciation and try repeating it perfectly!",
      "Listen": "Listen 🔊",

      "Wellness_Corner": "Wellness Corner",
      "Wellness_Desc": "Your daily physical fitness routine. Stay strong and healthy!",
      "Muscle_Building": "Muscle Building",
      "Yoga_Posture": "Yoga Posture",
      "HIIT_Exercises": "HIIT Exercises",
      "Reps": "Reps",
      "Duration": "Duration",
      "Play_Music": "Play Music 🎵",
      "Pause_Music": "Pause Music ⏸️",
      "Timer": "Timer",
      "Start": "Start",
      "Pause": "Pause",
      "Reset": "Reset"
    }
  },
  bn: {
    translation: {
      "Home": "হোম",
      "About": "আমাদের সম্পর্কে",
      "Activities": "কার্যাবলী",
      "Gallery": "গ্যালারি",
      "Contact": "যোগাযোগ",
      
      "Est_in_Howrah": "হাওড়ায় প্রতিষ্ঠিত",
      "Welcome_to": "স্বাগতম",
      "Club_Name": "হাওড়া অ্যাসেম্বলি ক্লাব",
      "Hero_Desc": "কদমতলা, পশ্চিমবঙ্গের একটি প্রিমিয়ার কমিউনিটি ক্লাব। পেশাদার টেবিল টেনিস, সামাজিক ক্রিয়াকলাপ এবং সকল স্তরের জন্য একটি স্বাগত পরিবেশের জন্য আমাদের সাথে যোগ দিন।",
      "Our_Activities": "আমাদের কার্যাবলী",
      "Visit_Us": "আমাদের সাথে দেখা করুন",

      "Our_History": "আমাদের ইতিহাস",
      "About_The_Club": "ক্লাব সম্পর্কে",
      "About_Desc": "কদমতলা সম্প্রদায়ের একটি স্তম্ভ হিসাবে প্রতিষ্ঠিত, হাওড়া অ্যাসেম্বলি ক্লাব দীর্ঘকাল ধরে ক্রীড়া উত্সাহী এবং বাসিন্দাদের একত্রিত হওয়ার একটি স্থান।",
      "Sports_Excellence": "ক্রীড়া শ্রেষ্ঠত্ব",
      "Sports_Desc": "আমরা আমাদের অত্যাধুনিক টেবিল টেনিস সুবিধা নিয়ে গর্বিত, যারা দক্ষতা বাড়াতে চান এমন নতুন থেকে শুরু করে অভিজ্ঞ পেশাদার সকলকেই সেবা প্রদান করি।",
      "Community_First": "সম্প্রদায় প্রথম",
      "Community_Desc": "খেলাধুলার বাইরে, আমরা সামাজিক ক্রিয়াকলাপের একটি কেন্দ্র, দীর্ঘস্থায়ী সংযোগ গড়ে তুলতে হাওড়ার সর্বস্তরের ব্যক্তিদের একত্রিত করি।",
      "Welcoming_Environment": "স্বাগত পরিবেশ",
      "Welcoming_Desc": "আমাদের দরজা সবার জন্য খোলা। একটি সহায়ক এবং বন্ধুত্বপূর্ণ পরিবেশের অভিজ্ঞতা নিন যেখানে আপনি শিখতে, খেলতে এবং বাড়তে পারেন।",

      "What_We_Do": "আমরা কি করি",
      "Our_Primary_Activities": "আমাদের প্রধান কার্যাবলী",
      "Table_Tennis_Sessions": "টেবিল টেনিস সেশন",
      "TTS_Desc": "আমাদের নিয়মিত টেবিল টেনিস সেশনে যোগ দিন। আমাদের কাছে অনুশীলনের জন্য, সাধারণ ম্যাচ এবং স্থানীয় টুর্নামেন্টের জন্য একাধিক উচ্চ-মানের টেবিল রয়েছে।",
      "Prof_Coaching": "পেশাদার কোচিং উপলব্ধ",
      "Local_Tournaments": "নিয়মিত স্থানীয় টুর্নামেন্ট",
      "Equipment_Provided": "নতুনদের জন্য সরঞ্জাম প্রদান করা হয়",
      "Typical_Timings": "সাধারণ সময়সূচী",
      "Timings_Desc": "আমরা বেশিরভাগ সন্ধ্যায় খোলা থাকি। খেলা দেখতে বা যোগ দিতে আমাদের নিয়মিত সময়সূচীতে ঘুরে আসুন।",
      "Evening_Sessions": "সন্ধ্যার সেশন",
      "Timings_Note": "*ছুটির দিন এবং টুর্নামেন্টের দিনে সময়সূচী পরিবর্তিত হতে পারে।",

      "Multimedia": "মাল্টিমিডিয়া",
      "Club_Gallery": "ক্লাব গ্যালারি",
      "Gallery_Desc": "হাওড়া অ্যাসেম্বলি ক্লাবের এক ঝলক। আমাদের সুবিধা এবং প্রাণবন্ত সম্প্রদায় অন্বেষণ করুন।",
      "Evening_Match": "সন্ধ্যার ম্যাচ",
      "Equipment_Ready": "সরঞ্জাম প্রস্তুত",
      "Our_Facilities": "আমাদের সুবিধা",
      "Action_Shot": "অ্যাকশন শট",

      "Get_In_Touch": "যোগাযোগ করুন",
      "Contact_Desc": "আপনি টেবিল টেনিস সেশনে যোগ দিতে চান, সম্প্রদায়ের ইভেন্টগুলিতে অংশগ্রহণ করতে চান, বা শুধু আমাদের সম্পর্কে জানতে চান, আমরা আপনাকে স্বাগত জানাতে পছন্দ করব।",
      "Address": "ঠিকানা",
      "Club_Hours": "ক্লাবের সময়",
      "Most_Evenings": "(বেশিরভাগ সন্ধ্যা)",

      "Footer_Desc": "কদমতলা, পশ্চিমবঙ্গের একটি প্রিমিয়ার কমিউনিটি এবং টেবিল টেনিস ক্লাব। আবেগ এবং শ্রেষ্ঠত্বের সাথে সম্প্রদায়ের সেবা করা।",
      "All_Rights": "সমস্ত অধিকার সংরক্ষিত।",

      "Transit_Guide": "ট্রানজিট গাইড",
      "Transit_Surface": "🚇 সড়ক ও রেল (মেট্রো/বাস/ট্রেন):",
      "Transit_Surface_Desc": "নিকটতম মেট্রো হাওড়া ময়দান (~৩ কিমি)। নিকটতম রেলওয়ে স্টেশন হাওড়া জংশন (~৩.৫ কিমি)। কদমতলা বাস স্ট্যান্ড হাঁটার দূরত্বে।",
      "Transit_Water": "⛴️ জলপথ (ফেরি):",
      "Transit_Water_Desc": "নিকটতম ফেরি পয়েন্ট হাওড়া ফেরি ঘাট (~৩.৫ কিমি), স্থানীয় পরিবহনের মাধ্যমে যাওয়া যায়।",
      "Transit_Air": "✈️ আকাশপথ:",
      "Transit_Air_Desc": "নেতাজি সুভাষ চন্দ্র বসু আন্তর্জাতিক বিমানবন্দর (CCU) প্রায় ২৫ কিমি দূরে অবস্থিত।",

      "Kids_Corner": "কিডস কর্নার",
      "Daily_Game_Title": "দৈনিক ইংরেজি দক্ষতা নির্মাতা",
      "Daily_Game_Desc": "আপনার শব্দভাণ্ডার এবং জ্ঞানীয় দক্ষতা উন্নত করুন! এই ইন্টারেক্টিভ দৈনিক ক্রসওয়ার্ড প্রতিদিন স্বয়ংক্রিয়ভাবে আপডেট হয়।",

      "Scramble_Title": "শব্দ সাজানো",
      "Scramble_Desc": "আজকের শব্দ খুঁজে বের করতে অক্ষরগুলো সাজান!",
      "Hint": "ইঙ্গিত",
      "Your_Answer": "আপনার উত্তর",
      "Check_Answer": "উত্তর যাচাই করুন",
      "Correct": "সঠিক! দারুণ কাজ! 🎉",
      "Incorrect": "ঠিক হয়নি। আবার চেষ্টা করুন!",

      "Explore_Club": "ক্লাবটি অন্বেষণ করুন",
      "Read_More": "আরও পড়ুন",

      "Pronunciation_Title": "দৈনিক উচ্চারণ চ্যালেঞ্জ",
      "Pronunciation_Desc": "সঠিক উচ্চারণ শুনুন এবং এটি নিখুঁতভাবে পুনরাবৃত্তি করার চেষ্টা করুন!",
      "Listen": "শুনুন 🔊",

      "Wellness_Corner": "সুস্থতা কর্নার",
      "Wellness_Desc": "আপনার প্রতিদিনের শারীরিক সুস্থতার রুটিন। শক্তিশালী এবং সুস্থ থাকুন!",
      "Muscle_Building": "পেশী গঠন",
      "Yoga_Posture": "যোগ ব্যায়াম",
      "HIIT_Exercises": "HIIT ব্যায়াম",
      "Reps": "বার",
      "Duration": "সময়কাল",
      "Play_Music": "সঙ্গীত চালান 🎵",
      "Pause_Music": "সঙ্গীত থামান ⏸️",
      "Timer": "টাইমার",
      "Start": "শুরু",
      "Pause": "থামান",
      "Reset": "রিসেট"
    }
  },
  hi: {
    translation: {
      "Home": "होम",
      "About": "हमारे बारे में",
      "Activities": "गतिविधियाँ",
      "Gallery": "गैलरी",
      "Contact": "संपर्क",
      
      "Est_in_Howrah": "हावड़ा में स्थापित",
      "Welcome_to": "में आपका स्वागत है",
      "Club_Name": "हावड़ा असेंबली क्लब",
      "Hero_Desc": "कदमतला, पश्चिम बंगाल में एक प्रमुख सामुदायिक क्लब। पेशेवर टेबल टेनिस, सामुदायिक गतिविधियों और सभी कौशल स्तरों के लिए एक स्वागत योग्य वातावरण के लिए हमसे जुड़ें।",
      "Our_Activities": "हमारी गतिविधियाँ",
      "Visit_Us": "हमसे मिलने आएं",

      "Our_History": "हमारा इतिहास",
      "About_The_Club": "क्लब के बारे में",
      "About_Desc": "कदमतला समुदाय के एक स्तंभ के रूप में स्थापित, हावड़ा असेंबली क्लब लंबे समय से खेल प्रेमियों और निवासियों के एक साथ आने का स्थान रहा है।",
      "Sports_Excellence": "खेल उत्कृष्टता",
      "Sports_Desc": "हम अपनी अत्याधुनिक टेबल टेनिस सुविधाओं पर गर्व करते हैं, जो शुरुआती लोगों से लेकर अनुभवी पेशेवरों तक सभी की जरूरतों को पूरा करती हैं जो अपने कौशल को निखारना चाहते हैं।",
      "Community_First": "समुदाय पहले",
      "Community_Desc": "खेलों के अलावा, हम सामाजिक जुड़ाव का एक केंद्र हैं, जो हावड़ा में जीवन के सभी क्षेत्रों के लोगों को एक साथ लाकर लंबे समय तक चलने वाले संबंध बनाते हैं।",
      "Welcoming_Environment": "स्वागत योग्य वातावरण",
      "Welcoming_Desc": "हमारे दरवाजे सभी के लिए खुले हैं। एक सहायक और मैत्रीपूर्ण वातावरण का अनुभव करें जहाँ आप सीख सकते हैं, खेल सकते हैं और आगे बढ़ सकते हैं।",

      "What_We_Do": "हम क्या करते हैं",
      "Our_Primary_Activities": "हमारी प्राथमिक गतिविधियाँ",
      "Table_Tennis_Sessions": "टेबल टेनिस सत्र",
      "TTS_Desc": "हमारे नियमित टेबल टेनिस सत्रों में शामिल हों। हमारे पास अभ्यास, अनौपचारिक मैचों और स्थानीय टूर्नामेंटों के लिए कई उच्च गुणवत्ता वाली टेबल उपलब्ध हैं।",
      "Prof_Coaching": "पेशेवर कोचिंग उपलब्ध",
      "Local_Tournaments": "नियमित स्थानीय टूर्नामेंट",
      "Equipment_Provided": "शुरुआती लोगों के लिए उपकरण उपलब्ध",
      "Typical_Timings": "सामान्य समय",
      "Timings_Desc": "हम ज्यादातर शाम को खुले रहते हैं। खेल देखने या शामिल होने के लिए हमारे नियमित समय पर आएं।",
      "Evening_Sessions": "शाम के सत्र",
      "Timings_Note": "*छुट्टियों और टूर्नामेंट के दिनों में समय बदल सकता है।",

      "Multimedia": "मल्टीमीडिया",
      "Club_Gallery": "क्लब गैलरी",
      "Gallery_Desc": "हावड़ा असेंबली क्लब की एक झलक। हमारी सुविधाओं और जीवंत समुदाय का अन्वेषण करें।",
      "Evening_Match": "शाम का मैच",
      "Equipment_Ready": "उपकरण तैयार",
      "Our_Facilities": "हमारी सुविधाएँ",
      "Action_Shot": "एक्शन शॉट",

      "Get_In_Touch": "संपर्क करें",
      "Contact_Desc": "चाहे आप टेबल टेनिस सत्र में शामिल होना चाहते हों, सामुदायिक कार्यक्रमों में भाग लेना चाहते हों, या बस यह देखना चाहते हों कि हम क्या करते हैं, हमें आपकी मेजबानी करने में खुशी होगी।",
      "Address": "पता",
      "Club_Hours": "क्लब का समय",
      "Most_Evenings": "(ज्यादातर शाम)",

      "Footer_Desc": "कदमतला, पश्चिम बंगाल में एक प्रमुख सामुदायिक और टेबल टेनिस क्लब। जुनून और उत्कृष्टता के साथ समुदाय की सेवा।",
      "All_Rights": "सर्वाधिकार सुरक्षित।",

      "Transit_Guide": "पारगमन गाइड (Transit Guide)",
      "Transit_Surface": "🚇 सड़क और रेल (मेट्रो/बस/ट्रेन):",
      "Transit_Surface_Desc": "निकटतम मेट्रो हावड़ा मैदान (~3 किमी) है। निकटतम रेलवे स्टेशन हावड़ा जंक्शन (~3.5 किमी) है। कदमतला बस स्टैंड पैदल दूरी पर है।",
      "Transit_Water": "⛴️ जलमार्ग (फेरी):",
      "Transit_Water_Desc": "निकटतम फेरी पॉइंट हावड़ा फेरी घाट (~3.5 किमी) है, जहाँ स्थानीय परिवहन द्वारा पहुँचा जा सकता है।",
      "Transit_Air": "✈️ हवाई मार्ग:",
      "Transit_Air_Desc": "नेताजी सुभाष चंद्र बोस अंतर्राष्ट्रीय हवाई अड्डा (CCU) लगभग 25 किमी दूर है।",

      "Kids_Corner": "किड्स कॉर्नर",
      "Daily_Game_Title": "दैनिक अंग्रेजी कौशल निर्माता",
      "Daily_Game_Desc": "अपनी शब्दावली और संज्ञानात्मक कौशल में सुधार करें! यह इंटरैक्टिव दैनिक क्रॉसवर्ड हर दिन स्वचालित रूप से अपडेट होता है।",

      "Scramble_Title": "शब्द पहेली",
      "Scramble_Desc": "आज का शब्द खोजने के लिए अक्षरों को सही क्रम में लगाएं!",
      "Hint": "संकेत",
      "Your_Answer": "आपका उत्तर",
      "Check_Answer": "उत्तर जांचें",
      "Correct": "सही! बहुत बढ़िया! 🎉",
      "Incorrect": "सही नहीं है। पुनः प्रयास करें!",

      "Explore_Club": "क्लब का अन्वेषण करें",
      "Read_More": "और पढ़ें",

      "Pronunciation_Title": "दैनिक उच्चारण चुनौती",
      "Pronunciation_Desc": "सही उच्चारण सुनें और इसे पूरी तरह से दोहराने का प्रयास करें!",
      "Listen": "सुनें 🔊",

      "Wellness_Corner": "कल्याण कोना",
      "Wellness_Desc": "आपकी दैनिक शारीरिक फिटनेस दिनचर्या। मजबूत और स्वस्थ रहें!",
      "Muscle_Building": "मांसपेशियों का निर्माण",
      "Yoga_Posture": "योग मुद्रा",
      "HIIT_Exercises": "HIIT व्यायाम",
      "Reps": "बार",
      "Duration": "अवधि",
      "Play_Music": "संगीत बजाएं 🎵",
      "Pause_Music": "संगीत रोकें ⏸️",
      "Timer": "टाइमर",
      "Start": "शुरू",
      "Pause": "रोकें",
      "Reset": "रीसेट"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
