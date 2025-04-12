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
        arabic: 'أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        translation: 'Allah! There is no god but He, the Living, the Self-subsisting, the Eternal. Neither slumber nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on earth. Who is there that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
        source: 'سورة البقرة، آية ٢٥٥',
        virtue: 'من قالها حين يصبح أجير من الجن حتى يمسى ومن قالها حين يمسى أجير من الجن حتى يصبح',
        repeat: 1
      },
      {
        id: 'morning-2',
        arabic: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
        transliteration: 'Bismillahir Rahmanir Raheem. Qul huwal laahu ahad, Allahus-samad, lam yalid wa lam yoolad, wa lam yakul-lahu kufuwan ahad.',
        translation: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
        source: 'سورة الإخلاص',
        virtue: 'من قالها حين يصبح وحين يمسى كفته من كل شىء (الإخلاص والمعوذتين)',
        repeat: 3
      },
      {
        id: 'morning-3',
        arabic: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: 'Bismillahir Rahmanir Raheem. Qul a\'oodhu bi rabbil-falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharrin-naffathati fil \'uqad, wa min sharri hasidin idha hasad.',
        translation: 'Say: I seek refuge with the Lord of the Dawn, from the evil of what He has created, and from the evil of the darkening (night) as it comes with its darkness, and from the evil of those who practice witchcraft when they blow in the knots, and from the evil of the envier when he envies.',
        source: 'سورة الفلق',
        repeat: 3
      },
      {
        id: 'morning-4',
        arabic: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
        transliteration: 'Bismillahir Rahmanir Raheem. Qul a\'oodhu birabbin-nas, malikin-nas, ilahin-nas, min sharril-waswasil-khannas, alladhee yuwaswisu fee sudoorin-nas, minal-jinnati wannas.',
        translation: 'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the breasts of mankind, from among the jinn and mankind.',
        source: 'سورة الناس',
        repeat: 3
      },
      {
        id: 'morning-5',
        arabic: 'أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر',
        transliteration: 'Asbahna wa asbahal mulku lillah walhamdu lillah, la ilaha illal-lah wahdahu la shareeka lah, lahul mulku walahul hamd, wahuwa \'ala kulli shay\'in qadeer. Rabbi as\'aluka khayra ma fee hadhal yawm wa khayra ma ba\'dahu, wa a\'oodhu bika min sharri ma fee hadhal yawm wa sharri ma ba\'dahu. Rabbi a\'oodhu bika minal kasal, wa soo\'il kibar. Rabbi a\'oodhu bika min \'adhabin fin-nar, wa \'adhabin fil-qabr.',
        translation: 'We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it and I take refuge in You from the evil of this day and the evil of what follows it. My Lord, I take refuge in You from laziness and senility. My Lord, I take refuge in You from torment in the Fire and punishment in the grave.',
        repeat: 1
      },
      {
        id: 'morning-6',
        arabic: 'اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ',
        transliteration: 'Allahumma anta rabbee la ilaha illa ant, khalaqtanee wa ana abduk, wa ana \'ala \'ahdika wa wa\'dika mastata\'t, a\'oodhu bika min sharri ma sana\'t, aboo\'u laka bini\'matika \'alayya wa aboo\'u bidhanbee faghfir lee fa\'innahu la yaghfirudh-dhunooba illa ant.',
        translation: 'O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
        virtue: 'من قالها موقنا بها حين يمسى ومات من ليلته دخل الجنة وكذلك حين يصبح',
        repeat: 1
      },
      {
        id: 'morning-7',
        arabic: 'رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً',
        transliteration: 'Radheetu billahi rabban, wabil-islami deenan, wa bi-Muhammadin sallallahu alayhi wa sallama nabiyyan.',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.',
        virtue: 'من قالها حين يصبح وحين يمسى كان حقا على الله أن يرضيه يوم القيامة',
        repeat: 3
      },
      {
        id: 'morning-8',
        arabic: 'اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك',
        transliteration: 'Allahumma innee asbahtu ush-hiduka, wa ush-hidu hamalata \'arshika, wa mala\'ikataka, wa jamee\'a khalqika, annaka antallahu la ilaha illa anta wahdaka la shareeka lak, wa anna Muhammadan \'abduka wa rasooluk.',
        translation: 'O Allah, verily I have reached the morning and call on You, the bearers of Your throne, Your angels, and all of Your creation to witness that You are Allah, none has the right to be worshipped except You, alone, without partner and that Muhammad is Your servant and Your Messenger.',
        virtue: 'من قالها أعتقه الله من النار',
        repeat: 4
      },
      {
        id: 'morning-9',
        arabic: 'اللّهُـمَّ ما أَصْبَـَحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر',
        transliteration: 'Allahumma ma asbaha bee min ni\'matin, aw bi\'ahadin min khalqika, faminka wahdaka la shareeka lak, falakal-hamdu wa lakash-shukr.',
        translation: 'O Allah, what blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all thanks.',
        virtue: 'من قالها حين يصبح أدى شكر يومه',
        repeat: 1
      },
      {
        id: 'morning-10',
        arabic: 'حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم',
        transliteration: 'Hasbiyal-lahu la ilaha illa huwa, \'alayhi tawakkalt, wa huwa rabbul-\'arshil-\'adheem.',
        translation: 'Allah is sufficient for me, none has the right to be worshipped except Him, upon Him I rely and He is Lord of the exalted throne.',
        virtue: 'من قالها كفاه الله ما أهمه من أمر الدنيا والأخرة',
        repeat: 7
      },
      {
        id: 'morning-11',
        arabic: 'بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم',
        transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i, wa huwas-sami\'ul-\'alim.',
        translation: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Hearing, The All-Knowing.',
        virtue: 'لم يضره من الله شيء',
        repeat: 3
      },
      {
        id: 'morning-12',
        arabic: 'اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور',
        transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor.',
        translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
        repeat: 1
      },
      {
        id: 'morning-13',
        arabic: 'أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ',
        transliteration: 'Asbahna \'ala fitratil-islam, wa \'ala kalimatil-ikhlas, wa \'ala dini nabiyyina Muhammadin sallallahu \'alayhi wa sallam, wa \'ala millati abeena Ibrahima haneefan musliman, wa ma kana minal-mushrikeen.',
        translation: 'We have reached the morning upon the natural way of Islam, the word of pure faith, the religion of our Prophet Muhammad (peace and blessings of Allah be upon him) and the religion of our forefather Ibrahim, who was upright and a Muslim and was not from among the polytheists.',
        repeat: 1
      },
      {
        id: 'morning-14',
        arabic: 'سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه',
        transliteration: 'Subhanallahi wa bihamdihi, \'adada khalqihi, wa rida nafsihi, wa zinata \'arshihi, wa midada kalimatihi.',
        translation: 'Glory and praise is to Allah, by the number of His creation, by His pleasure, by the weight of His throne and by the ink of His words.',
        repeat: 3
      },
      {
        id: 'morning-15',
        arabic: 'اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ',
        transliteration: 'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa ant.',
        translation: 'O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You.',
        repeat: 3
      },
      {
        id: 'morning-16',
        arabic: 'اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ',
        transliteration: 'Allahumma inni a\'oodhu bika minal-kufri, wal-faqri, wa a\'oodhu bika min \'adhabil-qabri, la ilaha illa ant.',
        translation: 'O Allah, I take refuge in You from disbelief and poverty, and I take refuge in You from the punishment of the grave. None has the right to be worshipped except You.',
        repeat: 3
      },
      {
        id: 'morning-17',
        arabic: 'اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي',
        transliteration: 'Allahumma inni as\'alukal-\'afwa wal-\'afiyah fid-dunya wal-akhirah. Allahumma inni as\'alukal-\'afwa wal-\'afiyah fi dini wa dunyaya wa ahli wa mali. Allahum-mastur \'awrati, wa amin raw\'ati, Allahumm-ahfadhni min bayni yadayya, wa min khalfi, wa \'an yamini, wa \'an shimali, wa min fawqi, wa a\'oodhu bi\'adhamatika an ughtala min tahti.',
        translation: 'O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, veil my weaknesses and set at ease my dismay. O Allah, preserve me from the front and from behind and on my right and on my left and from above, and I take refuge with You lest I be swallowed up by the earth.',
        repeat: 1
      },
      {
        id: 'morning-18',
        arabic: 'يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ',
        transliteration: 'Ya Hayyu, Ya Qayyum, bi-rahmatika astaghith, aslih li sha\'ni kullahu, wa la takilni ila nafsi tarfata \'ayn.',
        translation: 'O Ever Living, O Self-Sustaining and All-Sustaining, by Your mercy I seek assistance, rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.',
        repeat: 3
      },
      {
        id: 'morning-19',
        arabic: 'أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للهِ رَبِّ العـالَمـين ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ خَـيْرَ هـذا الـيَوْم ، فَـتْحَهُ ، وَنَصْـرَهُ ، وَنـورَهُ وَبَـرَكَتَـهُ ، وَهُـداهُ ، وَأَعـوذُ بِـكَ مِـنْ شَـرِّ ما فـيهِ وَشَـرِّ ما بَعْـدَه',
        transliteration: 'Asbahna wa asbahal-mulku lillahi rabbil-\'alamin. Allahumma inni as\'aluka khayra hadhal-yawm, fat-hahu, wa nasrahu, wa noorahu, wa barakatahu, wa hudahu, wa a\'oodhu bika min sharri ma fihi, wa sharri ma ba\'dahu.',
        translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. O Allah, I ask You for the good of this day, its triumphs and its victories, its light and its blessings and its guidance, and I take refuge in You from the evil of this day and the evil that follows it.',
        repeat: 1
      },
      {
        id: 'morning-20',
        arabic: 'اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم',
        transliteration: 'Allahumma \'alimal-ghaybi wash-shahadah, fatiras-samawati wal-ard, rabba kulli shay\'in wa malikah, ashhadu an la ilaha illa ant, a\'oodhu bika min sharri nafsi, wa min sharrish-shaytani wa shirkih, wa an aqtarifa \'ala nafsi soo\'an, aw ajurrahu ila muslim.',
        translation: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the Earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I take refuge in You from the evil of my soul and from the evil and shirk of the devil, and from committing wrong against my soul or bringing such upon another Muslim.',
        repeat: 1
      },
      {
        id: 'morning-21',
        arabic: 'أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق',
        transliteration: 'A\'oodhu bikalimatil-lahit-tammati min sharri ma khalaq.',
        translation: 'I take refuge in the perfect words of Allah from the evil of what He has created.',
        repeat: 3
      },
      {
        id: 'morning-22',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد',
        transliteration: 'Allahumma salli wa sallim wa barik \'ala nabiyyina Muhammad.',
        translation: 'O Allah, send prayers, peace and blessings upon our Prophet Muhammad.',
        virtue: 'من صلى على حين يصبح وحين يمسى ادركته شفاعتى يوم القيامة',
        repeat: 10
      },
      {
        id: 'morning-23',
        arabic: 'اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ',
        transliteration: 'Allahumma inna na\'oodhu bika min an nushrika bika shay\'an na\'lamuhu, wa nastaghfiruka lima la na\'lamuh.',
        translation: 'O Allah, we seek refuge in You from knowingly associating partners with You, and we seek Your forgiveness for what we do unknowingly.',
        repeat: 3
      },
      {
        id: 'morning-24',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ',
        transliteration: 'Allahumma inni a\'oodhu bika minal-hammi wal-hazan, wa a\'oodhu bika minal-\'ajzi wal-kasal, wa a\'oodhu bika minal-jubni wal-bukhl, wa a\'oodhu bika min ghalabatid-dayni, wa qahrir-rijal.',
        translation: 'O Allah, I seek refuge in You from anxiety and sorrow, and I seek refuge in You from weakness and laziness, and I seek refuge in You from cowardice and miserliness, and I seek refuge in You from being overcome by debt and overpowered by men.',
        repeat: 3
      },
      {
        id: 'morning-25',
        arabic: 'أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ',
        transliteration: 'Astaghfirullaha al-\'Adheema alladhi la ilaha illa huwa, al-Hayyu al-Qayyumu, wa atubu ilayh.',
        translation: 'I seek the forgiveness of Allah the Mighty, Whom there is none worthy of worship except Him, the Living, the Self-Sustaining, and I repent unto Him.',
        repeat: 3
      },
      {
        id: 'morning-26',
        arabic: 'يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ',
        transliteration: 'Ya Rabb, lakal-hamdu kama yanbaghi li-jalali wajhika, wa li-\'atheemi sultanik.',
        translation: 'O Lord, to You belongs all praise as befits the glory of Your face and the greatness of Your might.',
        repeat: 3
      },
      {
        id: 'morning-27',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
        transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbalan.',
        translation: 'O Allah, I ask You for beneficial knowledge, goodly provision and acceptable actions.',
        repeat: 1
      },
      {
        id: 'morning-28',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ ، عَلَيْكَ تَوَكَّلْتُ ، وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ , مَا شَاءَ اللَّهُ كَانَ ، وَمَا لَمْ يَشَأْ لَمْ يَكُنْ ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ , أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، وَأَنَّ اللَّهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا , اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي ، وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا ، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ',
        transliteration: 'Allahumma anta Rabbi la ilaha illa anta, \'alayka tawakkaltu, wa anta Rabbul-\'arshil-\'adheem, ma sha\'Allahu kana, wa ma lam yasha\' lam yakun, wa la hawla wa la quwwata illa billahil-\'aliyyil-\'adheem. A\'lamu annAllaha \'ala kulli shay\'in qadeer, wa annAllaha qad ahata bikulli shay ilma. Allahumma inni a\'oodhu bika min sharri nafsi, wa min sharri kulli dabbatin anta akhidhun bi-nasiyatiha, inna Rabbi \'ala siratin mustaqeem.',
        translation: 'O Allah, You are my Lord, there is none worthy of worship but You. I rely upon You and You are the Lord of the mighty throne. Whatever Allah wills happens and whatever He does not will does not happen. There is no power or might except with Allah, the Most High, the Most Great. I know that Allah is capable of all things and that Allah has encompassed all things with His knowledge. O Allah, I seek refuge in You from the evil of myself and from the evil of every creature that You have taken by its forelock. Surely my Lord is on a straight path.',
        repeat: 1
      },
      {
        id: 'morning-29',
        arabic: 'لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu, wa huwa \'ala kulli shay quadir',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.',
        virtue: 'كانت له عدل عشر رقاب، وكتبت له مئة حسنة، ومحيت عنه مئة سيئة، وكانت له حرزا من الشيطان',
        repeat: 100
      },
      {
        id: 'morning-30',
        arabic: 'سُبْحـانَ اللهِ وَبِحَمْـدِهِ',
        transliteration: 'Subhanallahi wa bihamdihi.',
        translation: 'Glory is to Allah and praise is to Him.',
        virtue: 'حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ. لَمْ يَأْتِ أَحَدٌ يَوْمَ الْقِيَامَةِ بِأَفْضَلَ مِمَّا جَاءَ بِهِ إِلَّا أَحَدٌ قَالَ مِثْلَ مَا قَالَ أَوْ زَادَ عَلَيْهِ',
        repeat: 100
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