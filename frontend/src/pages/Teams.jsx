import React, { useState, useMemo, useRef } from 'react';
// Using lucide-react for modern, clean icons.
// Make sure to install it: npm install lucide-react
import { Linkedin, Twitter, Instagram } from 'lucide-react';

// --- TEAM DATA ---
// A single, clean data source for all team members (duplicates removed).
const teamData = [
  // Core Team
  { id: 1, name: 'Shaivi Jain', position: 'President', team: 'Core', imageUrl: '/2.jpeg', socials: { linkedin: 'https://www.linkedin.com/in/shaivi-jain/', twitter: 'https://x.com/shaivijain_' , instagram: 'shaivizz_archive'}},
  { id: 2, name: 'Anupriya', position: 'The General Secretary', team: 'Core', imageUrl: '/IMG_20260531_101657.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anupriya-7a8584322?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: 'anu.hereehttps://twitter.com/Sonasha99', instagram: 'anu.heree' }},
  { id: 3, name: 'Kritika Singh', position: 'Vice President', team: 'Core', imageUrl: '/Kritika_delta (1).jpg', socials: { linkedin: 'https://www.linkedin.com/in/kritika1220?utm_source=share_via&utm_content=profile&utm_medium=member_androidhttps://www.linkedin.com/in/palak-bansal-3b6666283', twitter: '@Kritika32717391', instagram: 'ks_.1220' }},
  { id: 4, name: 'Shreya Rathore', position: 'Vice President', team: 'Core', imageUrl: '/FullSizeRender.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shreya-rathore-135785265/', twitter: 'shreyarathore_', instagram: 'shhreyyaarr' }},
  
  // Technical Team
  // { id: 5, name: 'Manya', position: 'Lead', team: 'Technical', imageUrl: 'https://res.cloudinary.com/duptmanu9/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717849294/Profile-Manya_xf4ehi.jpg', socials: { linkedin: 'https://www.linkedin.com/in/manya35', twitter: 'https://twitter.com/hi_manya_', instagram: 'https://www.instagram.com/simpformanya/' }},
  // { id: 6, name: 'Priya Verma', position: 'Lead', team: 'Technical', imageUrl: 'https://res.cloudinary.com/dzwfmydmx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670585/Asset_Mantle/priya_eu7avc.jpg', socials: { linkedin: 'https://www.linkedin.com/in/priya-verma-9668b4291/', twitter: 'https://x.com/PriyaVe93285977', instagram: 'https://www.instagram.com/_.priyavermaa' }},
  { id: 8, name: 'Anamika Garg', position: 'Lead', team: 'Technical', imageUrl: '/my.jpeg', socials: { linkedin: 'https://www.linkedin.com/in/anamika-garg-aa14a5300/', twitter: 'https://x.com/AnamikaGarg29', instagram: 'nulllpointerr' }},
  // { id: 9, name: 'Bhumi Gupta', position: 'Core', team: 'Technical', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717850875/IMG_20240316_182633_011_bi9lm9.jpg', socials: { linkedin: 'http://www.linkedin.com/in/guptabhumi2005', twitter: 'https://x.com/BhumiGupta81010', instagram: 'https://instagram.com/spk2bhumi' }},
  
  // { id: 11, name: 'Aayushi Singh', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849590/Screenshot_2025-11-11_135603_igm8nk.png', socials: { linkedin: 'https://www.linkedin.com/in/aayushi-singhhh/', twitter: 'https://x.com/AayushiSin39314', instagram: 'https://www.instagram.com/wakeupsinghhh' }},
  { id: 12, name: 'Aashna Sharma', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849297/Screenshot_2025-11-11_135054_udmjrh.png', socials: { linkedin: 'https://www.linkedin.com/in/aashna-sharma-20261a35b/', twitter: 'https://x.com/aashnash777', instagram: 'https://www.instagram.com/sh.a7i' }},
  { id: 13, name: 'Purva Mehta', position: 'Core', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762848495/IMG20250704123946_2_emg7xs.jpg', socials: { linkedin: 'https://www.linkedin.com/in/purva-mehta-670b53375', twitter: 'https://x.com/PurvaMehta2007', instagram: 'https://www.instagram.com/purvamehta_01' }},
  { id: 14, name: 'Ishanvi Srivastava', position: 'Lead', team: 'Technical', imageUrl: '/ishh.jpeg', imageStyle: { transform: 'scale(1.3) translateY(-8px)' }, socials: { linkedin: 'https://www.linkedin.com/in/ishanvi-srivastava-16i', twitter: 'https://x.com/ishanvisri16', instagram: 'https://www.instagram.com/silvermistt.16' }},
  { id: 15, name: 'Ishita Sati', position: 'Coordinator', team: 'Technical', imageUrl: '/IMG-20260404-WA0108.jpg', socials: { linkedin: 'https://www.linkedin.com/in/ishita-s-91683a32b', twitter: '', instagram: 'https://www.instagram.com/is_hi274828' }},
  // { id: 16, name: 'Tanisha', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763191229/Screenshot_2025-11-15_124816_tyxh6z.png', socials: { linkedin: 'https://www.linkedin.com/in/tanisha-272076313/', twitter: 'https://x.com/Techi_tan_', instagram: 'https://www.instagram.com/ta_nisha_t' }},
  { id: 17, name: 'Amna Sehgal', position: 'Coordinator', team: 'Technical', imageUrl: '/WhatsApp Image 2026-06-29 at 14.12.37.jpeg', socials: { linkedin: 'https://www.linkedin.com/in/amnasehgal/', twitter: 'https://x.com/amnasehgal211', instagram: 'https://www.instagram.com/amnasehgall' }},

  // Event Management Team
  // { id: 18, name: 'Ridhima Choudhary', position: 'Lead', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/ridhima_rzc5go.jpg', socials: { linkedin: 'https://www.linkedin.com/in/ridhima-choudhary-774a8b287', twitter: '#', instagram: 'https://instagram.com/rridhimaaaa' }},
  //{ id: 19, name: 'Deepika', position: 'Lead', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/deepika_ynjfow.jpg', socials: { linkedin: 'https://www.linkedin.com/in/deepika-3903a5288', twitter: 'https://x.com/@frDeepika', instagram: 'https://instagram.com/deepika._.919' }},
  // { id: 20, name: 'Shaivi Jain', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/shavi_lomval.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shaivi-jain-86937a321', twitter: '#', instagram: 'https://instagram.com/shaivi1706' }},
  { id: 21, name: 'Manupreet Kaur', position: 'Lead', team: 'Events', imageUrl: '/am website.jpg', socials: { linkedin: 'https://www.linkedin.com/in/manupreet-kaur-9a69b0324', twitter: 'https://x.com/@manupreet2307', instagram: 'manu._xo' }},
  // { id: 25, name: 'Shreya Rathore', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/shreya_nmkaqc.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shreya-rathore-135785265', twitter: '#', instagram: '#' }},
  { id: 26, name: 'Ananshi Nayak', position: 'Lead', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/ananshi_sm23e5.jpg', socials: { linkedin: 'https://www.linkedin.com/in/ananshi-nayak-69a19b327', twitter: 'https://x.com/@ananshi_nayak', instagram: 'ananshiiiiiii' }},

  // { id: 27, name: 'Disha Gupta', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/Disha_Photo_nu2qt1.jpg', socials: { linkedin: 'https://www.linkedin.com/in/disha-gupta-343880328', twitter: 'https://x.com/@DishaGupta39677', instagram: '#' }},
  { id: 28, name: 'Harshita Dahiya', position: 'Lead', team: 'Events', imageUrl: '/pp2.JPG', socials: { linkedin: 'https://www.linkedin.com/in/harshita-dahiya-65a865282/', twitter: 'https://x.com/Harshita_47793', instagram: 'harshita_dahiya08' }},
  // { id: 29, name: 'Arushi Pandey', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850877/Screenshot_2025-11-11_141744_q1gf35.png', socials: { linkedin: 'https://www.linkedin.com/in/arushi-pandey-13393937b', twitter: 'https://x.com/Arushi1919', instagram: '#' }},
  // { id: 30, name: 'Bhavya Bhardwaj', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850958/Screenshot_2025-11-11_141900_yzllut.png', socials: { linkedin: 'https://www.linkedin.com/in/bhavya-bhardwaj-64572937b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Bhavya02052007?t=tjeBW21jAU8vZ5X4Xib7sg&s=08', instagram: 'kk02081978' }},
  // { id: 31, name: 'Swanandi Garudkar', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192616/Screenshot_2025-11-15_131319_nnqaa9.png', socials: { linkedin: 'https://www.linkedin.com/in/swanandi-garudkar-163368386?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: 'swanandii.14' }},
  { id: 32, name: 'Harleen Kaur', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/harleen-kaur-1a9723362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', twitter: 'https://x.com/harleen05547067?s=21', instagram: 'harleennnn.21' }},
  // { id: 33, name: 'Charushi', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192694/Screenshot_2025-11-15_131435_aompsv.png', socials: { linkedin: 'https://www.linkedin.com/in/charushi-43162b320', twitter: '#', instagram: 'charushi_06' }},
  { id: 34, name: 'Ashmita Kumari', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192778/Screenshot_2025-11-15_131600_y9wdbp.png', socials: { linkedin: 'https://www.linkedin.com/in/ashmita-kumari-6444b436b?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: '_ashmita_1012' }},
  // { id: 35, name: 'Pranjal Pandey', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/pranjal-pandey-251064374?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: 'pranjal._.1106' }},
  { id: 36, name: 'Drishti Singh', position: 'Core', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/drishti-singh-a99163381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Drishtiii2006?t=fgRImkZG3MR39tXF8asbqQ&s=09', instagram: 'drishti_ish01' }},
  // { id: 37, name: 'Kashish Dhingra ', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763210953/Screenshot_2025-11-15_181811_jonpq3.png', socials: { linkedin: 'https://www.linkedin.com/in/kashish-dhingra-589211335/', twitter: 'https://x.com/KashishDhi49170', instagram: 'https://www.instagram.com/kashish_5459' }},
  { id: 38, name: 'Anshika yadav', position: 'Core', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/anshika-yadav-a31a5037a/', twitter: 'https://x.com/AnshikaYadv11', instagram: 'https://www.instagram.com/yadav_anshikaa_' }},
  // { id: 39, name: 'Shaurya Bhargava', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763211339/Screenshot_2025-11-15_182514_uoidcp.png', socials: { linkedin: 'https://www.linkedin.com/in/shaurya-bhargava-840014377/', twitter: 'https://x.com/Shauryaaa_4', instagram: 'https://www.instagram.com/shauryabh2' }},
  // { id: 40, name: 'Saanvi Sarawat', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763211440/Screenshot_2025-11-15_182704_g5lcs0.png', socials: { linkedin: 'https://www.linkedin.com/in/saanvi-sarawat-279382367/', twitter: 'http://x.com/saanvisarawat46', instagram: 'https://www.instagram.com/saanvisarawat' }},
  


  // Research Team
  // { id: 37, name: 'Mehak Garg', position: 'Lead', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695756709/image_yatzxo.jpg', socials: { linkedin: 'https://www.linkedin.com/in/mehak-garg-084642282', twitter: '#', instagram: 'https://www.instagram.com/mehak.garg05/' }},
  // { id: 38, name: 'Anjali Sharma', position: 'Lead', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695756710/pictureee_nqnhxa.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anjali-sharma-159054288', twitter: 'https://x.com/anjalii64', instagram: 'https://instagram.com/thatpixelmiss' }},
  // { id: 39, name: 'Aditi Gupta', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/aditi_dgskwg.jpg', socials: { linkedin: 'https://www.linkedin.com/in/aditi-gupta-464024324', twitter: 'https://x.com/Aditi21gupta', instagram: 'https://instagram.com/kabhikabhi_adiiti' }},
  // { id: 40, name: 'Kritika Singh', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/kritika_luccmz.jpg', socials: { linkedin: 'https://www.linkedin.com/in/kritika-singh-758b95322', twitter: 'https://x.com/Kritika32717391', instagram: 'https://instagram.com/ks_.1220' }},
  // { id: 41, name: 'Swati Singh', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/swati_ts77zp.jpg', socials: { linkedin: 'https://www.linkedin.com/in/swati-singh-6031a4292', twitter: 'https://x.com/Swati_2104', instagram: 'https://instagram.com/swatiii_64' }},
  { id: 42, name: 'Sargam Sharma', position: 'Lead', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/sargam_rrqgbb.jpg', socials: { linkedin: 'https://www.linkedin.com/in/er-sargam-sharma', twitter: '@sharma_sar62453', instagram: '#' }},
  
  { id: 43, name: 'Anya Kansal', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192907/Screenshot_2025-11-15_131810_os6ew6.png', socials: { linkedin: 'https://www.linkedin.com/in/anya-kansal-a94237373/', twitter: 'https://x.com/kansal86093', instagram: 'https://www.instagram.com/_anyaa._23' }},
  // { id: 44, name: 'Ayesha Dhamija', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192984/Screenshot_2025-11-15_131929_ff7wnx.png', socials: { linkedin: 'https://www.linkedin.com/in/ayeshadhamija', twitter: 'https://x.com/ayesha_dhamija', instagram: 'https://www.instagram.com/ayesha.dhamija' }},
  // { id: 45, name: 'Aradhana Goyal', position: 'Coordinator', team: 'Research', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/aradhana-goyal-511a39377', twitter: 'https://x.com/aradhanago22905?s=21', instagram: 'https://instagram.com/aradhana_goyal21' }},
  // { id: 46, name: 'Divija Tewari', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193144/Screenshot_2025-11-15_132208_orsw1q.png', socials: { linkedin: 'https://www.linkedin.com/in/divija-tewari-6b195b367/', twitter: '#', instagram: 'https://www.instagram.com/divijatewari' }},
  // { id: 47, name: 'Kunjal Gupta', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193268/Screenshot_2025-11-15_132415_wk2xtv.png', socials: { linkedin: 'https://www.linkedin.com/in/kunjal-gupta-a66b55357/', twitter: '#', instagram: 'https://www.instagram.com/kunjal.xoxo' }},
  { id: 48, name: 'Tanishka Singh', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193329/Screenshot_2025-11-15_132514_agqbs9.png', socials: { linkedin: 'https://www.linkedin.com/in/tanishka-singh-69879934b/', twitter: '#', instagram: 'https://www.instagram.com/tanishka._22' }},
  // { id: 49, name: 'Zahra Khan', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193405/Screenshot_2025-11-15_132628_mnurgd.png', socials: { linkedin: 'https://www.linkedin.com/in/zahra2007khan', twitter: 'https://x.com/zahra_khan57', instagram: 'https://www.instagram.com/_.zahraxkhan._' }},
  { id: 50, name: 'Aditi', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193466/Screenshot_2025-11-15_132732_aivizc.png', socials: { linkedin: 'https://www.linkedin.com/in/aditi-sharma-8021b937b/', twitter: '#', instagram: 'https://www.instagram.com/aditi88855' }},

  // Media Team
  // { id: 51, name: 'Mahak', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859527/Mahak_AM_kv4kgj.jpg', socials: { linkedin: 'https://www.linkedin.com/in/mahak-154720287/', twitter: 'https://x.com/Mahak0520', instagram: '#' }},
  // { id: 52, name: 'Priyanshi', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/priyanshi_cuuz7x.jpg', socials: { linkedin: 'www.linkedin.com/in/priyanshi-roy-a67825201', twitter: 'https://x.com/phiandrho', instagram: '#' }},
  { id: 53, name: 'Mehar Kapoor', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/mehar_kvevsp.jpg', socials: { linkedin: 'https://linkedin.com/in/mehar-kapoor-428802214/', twitter: '@bytegirlwrites', instagram: 'https://www.instagram.com/mehar_kapoor7/' }},
  { id: 54, name: 'Diya Kotru', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/diya_a73a8v.jpg', socials: { linkedin: 'https://www.linkedin.com/in/diya-kotru-9059a2322', twitter: '0xdiya', instagram: 'https://www.instagram.com/kotrudiya' }},
  { id: 55, name: 'Tulip', position: 'Core', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/tulip_swx7su.jpg', socials: { linkedin: 'www.linkedin.com/in/tulip-gupta-292661328', twitter: 'https://x.com/tulipp_19', instagram: 'https://www.instagram.com/_tulip.15_' }},
 
  // { id: 56, name: 'Aakriti Shakya', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/akriti_b3h3zd.jpg', socials: { linkedin: 'https://www.linkedin.com/in/aakriti-shakya-a826b8275', twitter: 'https://x.com/aakritishakya9', instagram: 'https://www.instagram.com/aakritishakya9' }},
  { id: 57, name: 'Droni Arora', position: 'Core', team: 'Media', imageUrl: '/IMG_20260104_193004.jpg', socials: { linkedin: 'https://www.linkedin.com/in/droni-arora-00b164381', twitter: 'https://x.com/AroraDroni0710', instagram: 'https://www.instagram.com/droniarora07' }},
  // { id: 58, name: 'Hanishka Bhardwaj', position: 'Coordinator', team: 'Media', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/hanishka-bhardwaj-b88841383', twitter: '', instagram: 'https://www.instagram.com/hanishkaa_bhardwaj' }},
  // { id: 59, name: 'Meghna Sharma', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763193838/Screenshot_2025-11-15_133341_sqzlpn.png', socials: { linkedin: 'https://www.linkedin.com/in/meghna-sharma-9b16ba382', twitter: 'https://x.com/meghna_srma?t=eK1aw0oqmeDg07ejqV_h3A&s=08', instagram: 'https://www.instagram.com/_meghna_shm007' }},
  { id: 60, name: 'Rashi Choudhary', position: 'Core', team: 'Media', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/rashi-choudhary-5a2763381/', twitter: '', instagram: 'https://www.instagram.com/ri_pvt18' }},
  { id: 61, name: 'Anika Kulshresh', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763194003/Screenshot_2025-11-15_133623_pfn8uw.png', socials: { linkedin: 'https://www.linkedin.com/in/anika-kulshreshtha-806903262/', twitter: '', instagram: 'https://www.instagram.com/anika.naur' }},
  // { id: 62, name: 'Nancy Daima', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763194058/Screenshot_2025-11-15_133723_ffidkf.png', socials: { linkedin: 'https://www.linkedin.com/in/nancy-daima-177a6736a/', twitter: 'https://x.com/NancyDaima', instagram: 'https://www.instagram.com/nancy.daima' }},
  // { id: 63, name: 'Aadya Kashyap', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763194120/Screenshot_2025-11-15_133819_flbdmf.png', socials: { linkedin: 'https://www.linkedin.com/in/aadya-kashyap-976230366/', twitter: 'https://x.com/aadyayaya', instagram: 'https://www.instagram.com/_aadyakashyap' }},
  // { id: 64, name: 'Ridhima Kulashri', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763209292/Screenshot_2025-11-15_175028_kyxyfg.png', socials: { linkedin: 'https://www.linkedin.com/in/ridhima-kulashri-b32836378/', twitter: 'https://x.com/Ridhima7425', instagram: 'https://www.instagram.com/_.ridhimakulashriz' }},
  // { id: 65, name: 'Navya Gangwar', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763209428/Screenshot_2025-11-15_175323_x4x1wn.png', socials: { linkedin: 'https://www.linkedin.com/in/navyagangwar/', twitter: '', instagram: 'https://www.instagram.com/navyag02' }},
  // { id: 66, name: 'Pakhi Bansal', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763209561/Screenshot_2025-11-15_175543_jcebmq.png', socials: { linkedin: 'https://www.linkedin.com/in/pakhi-bansal-9a5658388/', twitter: '', instagram: 'https://www.instagram.com/pakhibansal81' }},
  { id: 67, name: 'Amaira Kapoor', position: 'Coordinator', team: 'Media', imageUrl: '/img1.jpg', socials: { linkedin: 'https://www.linkedin.com/in/amaira-kapoor-497847313/', twitter: 'amairakapoor', instagram: 'https://www.instagram.com/am4iraa' }},


  // Outreach Team
  //{ id: 61, name: 'Anusha Arora', position: 'Lead', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dlx9sj1pl/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859478/f0d11246-336f-4aa6-91d9-8b6f7d94a23f_shtsrl.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anusha-arora-23a75228a/', twitter: '#', instagram: '#' }},
  // { id: 51, name: 'Shruti Jha', position: 'Lead', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dlx9sj1pl/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859596/picture_for_AM_k08emn.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shruti-jha-28b4b5255', twitter: 'https://x.com/Shruti_Jha6', instagram: 'https://www.instagram.com/shuru_iti/' }},
  { id: 63, name: 'Akshita', position: 'Lead', team: 'Outreach', imageUrl: '/pic3.png', socials: { linkedin: 'https://www.linkedin.com/in/akshita-tanwar-939a04321', twitter: 'https://x.com/Humaniuiuiexe', instagram: 'https://www.instagram.com/akshita.t9' }},
  // { id: 64, name: 'Anupriya', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742916431/20240918_233205_b4d9lm.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anupriya-7a8584322', twitter: 'https://x.com/Anu_heree', instagram: 'https://www.instagram.com/anu.heree' }},
  // { id: 65, name: 'Lavanya Arora', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/ProfilePic_tlkcwj.jpg', socials: { linkedin: 'https://www.linkedin.com/in/lavanya-arora-757412320', twitter: '#', instagram: 'https://www.instagram.com/its_lavanya_749' }},
  { id: 77, name: 'Tanisha', position: 'Lead', team: 'Outreach', imageUrl: "/WhatsApp Image 2026-09-09 at 10.52.42.jpeg", socials: { linkedin: 'https://www.linkedin.com/in/tanisha-bansal-28758b382/', twitter: 'https://x.com/tanishaban71262', instagram: 'https://www.instagram.com/tanishab_3' }},
  // { id: 66, name: 'Bhumika', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/bhumika-lohran-2750b7329', twitter: 'https://x.com/bhumikaalohran?t=OKrckQKgIXwacFbZdZOcqg&s=09', instagram: 'https://www.instagram.com/arre_bhumi?igsh=MXNiZDIzeDZ6Znp1YQ==' }},
  // { id: 67, name: 'Kashvi', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/kashvi-%E2%80%8E-790b06377/', twitter: 'https://x.com/Kashvi219671?t=ppmS244odRRwgSWAHL-hIA&s=09', instagram: 'https://www.instagram.com/kashvi.iee?igsh=MWlnMzY5Nnh5YXl1bg==' }},
  { id: 68, name: 'Bhumika Garg', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763191564/Screenshot_2025-11-15_125547_tvyrgm.png', socials: { linkedin: 'https://www.linkedin.com/in/bhumika-garg-a77577385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/BhumikaGarg2531', instagram: 'https://www.instagram.com/bhumika_garg16?igsh=azVkbm1xNjlzeXg' }},
  // { id: 69, name: 'Devanshi Malhotra', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850144/Screenshot_2025-11-11_140222_jaynjs.png', socials: { linkedin: 'https://www.linkedin.com/in/devanshi5malhotra/', twitter: '#', instagram: 'https://www.instagram.com/devanshi5malhotra/' }},
  // { id: 70, name: 'Anshika Parmar', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/anshika-parmar-300a17326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Anshikahehe?s=09', instagram: 'https://www.instagram.com/anshikaparmar._?igsh=ZWdrYXQydGY4NjR4' }},
  { id: 71, name: 'Dhruvi Relan', position: 'Core', team: 'Outreach', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/khushboo-aggarwal9582', twitter: 'https://x.com/Khushboo777868?t=k95x-EfKOlWLp0zUZahgbw&s=09', instagram: 'https://www.instagram.com/khushboo_aggarwal17?igsh=MWxiOXp2eDJ0YTlseQ==' }},
  // { id: 72, name: 'Niharika Singh', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763191965/Screenshot_2025-11-15_130230_g8sqzt.png', socials: { linkedin: 'https://www.linkedin.com/in/ritisha-sharma-380b77379', twitter: 'https://x.com/ritsharma386?t=lZAJKazNkCZHi1EcqxmA4w&s=09', instagram: 'https://www.instagram.com/about.ritz?igsh=MXYzZHVxaDNlOTR5MA==' }},
  // { id: 73, name: 'Rashmi', position: 'Coordinator', team: 'Outreach', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/rashmi-ragamayi-asavadi-76b369378/', twitter: 'https://x.com/ragamayir', instagram: 'https://www.instagram.com/ras_hmirr' }},
  // { id: 74, name: 'Ritisha Sharma', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192146/Screenshot_2025-11-15_130520_hnkn7m.png', socials: { linkedin: 'https://www.linkedin.com/in/ritisha-sharma-380b77379', twitter: 'https://x.com/ritsharma386?t=lZAJKazNkCZHi1EcqxmA4w&s=09', instagram: 'https://www.instagram.com/about.ritz?igsh=MXYzZHVxaDNlOTR5MA==' }},  
  { id: 75, name: 'Sanya Banswal', position: 'Core', team: 'Outreach', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/sanya-banswal-68b3b2376/', twitter: 'https://x.com/sanyabanswal?s=21', instagram: 'https://www.instagram.com/banswalsanya' }},
  // { id: 76, name: 'Shreya Harle', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1763192264/Screenshot_2025-11-15_130707_wn4ahi.png', socials: { linkedin: 'https://www.linkedin.com/in/shreya-harle-037b05384/', twitter: '#', instagram: 'https://www.instagram.com/shreyablooms' }},
  { id: 78, name: 'Tripti Singla', position: 'Core', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/tripti-188123382/', twitter: 'https://x.com/ritsharma386', instagram: 'https://www.instagram.com/Triptii_singla' }},
 
];

// --- HELPER FUNCTION to group team members by their position ---
const groupTeamByPosition = (team) => {
  return team.reduce((acc, member) => {
    const { position } = member;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(member);
    return acc;
  }, {});
};

// --- Individual Team Member Card Component (New 3D Tilt Version) ---
const TeamMemberCard = ({ member }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = ((y / height) - 0.5) * -40; // Max rotation on X-axis
    const rotateY = ((x / width) - 0.5) * 40;  // Max rotation on Y-axis

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 ease-out [transform-style:preserve-3d] hover:border-amber-500/30 spotlight-card"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative [transform-style:preserve-3d]">
        <div className="mx-auto h-32 w-32 rounded-full border-2 border-white/10 overflow-hidden shadow-md transition-all duration-300 group-hover:border-amber-400 [transform:translateZ(40px)]">
          <img
            src={member.imageUrl}
            alt={`Profile of ${member.name}`}
            className="h-full w-full object-cover transition-all duration-300"
            style={{
              ...member.imageStyle,
              transform: isHovered
                ? `${member.imageStyle?.transform || 'scale(1)'} scale(1.05)`
                : (member.imageStyle?.transform || 'scale(1)'),
              transition: 'transform 0.3s ease-out',
            }}
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/1e293b/FFFFFF?text=Image'; }}
          />
        </div>
      </div>
      <h3 className="font-display mt-5 text-xl font-bold text-white [transform:translateZ(30px)] group-hover:text-amber-300 transition-colors duration-300">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-amber-400/80 [transform:translateZ(20px)]">{member.position}</p>
      <div className="mt-5 flex items-center justify-center gap-4 opacity-75 transition-opacity duration-300 group-hover:opacity-100 [transform:translateZ(20px)]">
        {member.socials.linkedin && member.socials.linkedin !== '#' && (
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-300">
            <Linkedin size={15} />
          </a>
        )}
        {member.socials.twitter && member.socials.twitter !== '#' && (
          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-300">
            <Twitter size={15} />
          </a>
        )}
        {member.socials.instagram && member.socials.instagram !== '#' && (
          <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-300">
            <Instagram size={15} />
          </a>
        )}
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function Teams() {
  const teams = useMemo(() => ['Core', 'Technical', 'Events', 'Media', 'Research', 'Outreach'], []);
  const [activeTab, setActiveTab] = useState(teams[0]);

  const filteredTeam = useMemo(() => teamData.filter(member => member.team === activeTab), [activeTab]);
  const groupedTeam = groupTeamByPosition(filteredTeam);

  const positionHierarchy = ['President', 'The General Secretary', 'Vice President', 'Lead', 'Core', 'Coordinator'];

  const positionOrder = useMemo(() => {
    return Object.keys(groupedTeam).sort((a, b) => {
        const indexA = positionHierarchy.indexOf(a);
        const indexB = positionHierarchy.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [groupedTeam]);

  // Enhanced background with multiple layers
  const BackgroundPattern = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.08)_1px,_transparent_0)]" style={{
        backgroundSize: '1.5rem 1.5rem'
      }}></div>
    </div>
  );

  return (
    <div className="relative bg-transparent text-white min-h-screen font-sans overflow-hidden">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-28 mt-12">
        <div className="text-center mb-16">
          <h1 className="font-sans text-4xl md:text-5xl font-black mt-20 tracking-tight text-white">
            Meet the <span className="font-serif italic font-normal text-amber-400">Team</span>
          </h1>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            The passionate individuals driving our vision forward.
          </p>
        </div>

        {/* --- MODIFIED: Responsive Tab Navigation --- */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-md">
            {teams.map(team => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-display font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === team
                    ? 'text-slate-950 bg-amber-400 shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {team} Team
              </button>
            ))}
          </div>
        </div>

        {/* Team Display */}
        <div className="space-y-20">
          {positionOrder.map(position => (
            <section key={position}>
              <h2 className="text-3xl font-bold text-center mb-12 text-slate-300 capitalize">{position}</h2>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
                {groupedTeam[position].map(member => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}