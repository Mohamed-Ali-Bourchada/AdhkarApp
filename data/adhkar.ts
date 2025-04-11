export interface Dhikr {
  id: string;
  arabic: string;
  transliteration?: string;
  translation?: string;
  source?: string;
  repeat?: number;
  virtue?: string;
}

export interface AdhkarCategory {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  adhkar: Dhikr[];
}

export const adhkarData: AdhkarCategory[] = [
  {
    id: 'morning',
    title: 'Morning Adhkar',
    arabicTitle: 'أذكار الصباح',
    description: 'Recite these supplications after Fajr prayer until sunrise',
    arabicDescription: 'تقرأ هذه الأذكار بعد صلاة الفجر حتى شروق الشمس',
    adhkar: [
      {
        id: 'morning-1',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nاللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ',
        translation: 'Allah! There is no god but He, the Living, the Self-subsisting, the Eternal.',
        source: 'سورة البقرة، آية ٢٥٥',
        virtue: 'من قرأ هذه الآية في الصباح فهو في حفظ الله حتى المساء',
        repeat: 1
      },
      {
        id: 'morning-2',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Bismillahir Rahmanir Raheem. Qul huwal laahu ahad.',
        translation: 'Say: He is Allah, the One.',
        source: 'سورة الإخلاص',
        repeat: 3
      },
      {
        id: 'morning-3',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Bismillahir Rahmanir Raheem. Qul a\'oodhu bi rabbil-falaq.',
        translation: 'Say: I seek refuge with the Lord of the Dawn.',
        source: 'سورة الفلق',
        repeat: 3
      }
    ]
  },
  {
    id: 'evening',
    title: 'Evening Adhkar',
    arabicTitle: 'أذكار المساء',
    description: 'Recite these supplications after Asr prayer until Maghrib',
    arabicDescription: 'تقرأ هذه الأذكار بعد صلاة العصر حتى المغرب',
    adhkar: [
      {
        id: 'evening-1',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
        transliteration: 'Amsayna wa amsal mulku lillah, wal hamdu lillah.',
        translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah.',
        repeat: 1
      },
      {
        id: 'evening-2',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ',
        transliteration: 'Allahumma anta rabbi la ilaha illa ant.',
        translation: 'O Allah, You are my Lord, there is none worthy of worship but You.',
        virtue: 'من قالها موقناً بها حين يمسي ومات من ليلته دخل الجنة',
        repeat: 1
      },
      {
        id: 'evening-3',
        arabic: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ',
        transliteration: 'Allahumma inni amsaytu ush-hiduka.',
        translation: 'O Allah, I have reached the evening and call upon You.',
        repeat: 4
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Before Sleep Adhkar',
    arabicTitle: 'أذكار النوم',
    description: 'Recite these supplications before going to bed',
    arabicDescription: 'تقرأ هذه الأذكار قبل النوم',
    adhkar: [
      {
        id: 'sleep-1',
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        transliteration: 'Bismika Allahumma amootu wa ahya.',
        translation: 'In Your name, O Allah, I die and I live.',
        repeat: 1
      },
      {
        id: 'sleep-2',
        arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
        transliteration: 'Allahumma qini adhabaka yawma tab\'athu ibadak.',
        translation: 'O Allah, protect me from Your punishment on the day Your servants are resurrected.',
        repeat: 3
      },
      {
        id: 'sleep-3',
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'Subhan Allah',
        translation: 'Glory be to Allah',
        repeat: 33
      },
      {
        id: 'sleep-4',
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdulillah',
        translation: 'All praise is due to Allah',
        repeat: 33
      },
      {
        id: 'sleep-5',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        repeat: 34
      }
    ]
  }
]; 