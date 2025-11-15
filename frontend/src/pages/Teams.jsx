import React, { useState, useMemo, useRef } from 'react';
// Using lucide-react for modern, clean icons.
// Make sure to install it: npm install lucide-react
import { Linkedin, Twitter, Instagram } from 'lucide-react';

// --- TEAM DATA ---
// A single, clean data source for all team members (duplicates removed).
const teamData = [
  // Core Team
  { id: 1, name: 'Prerana Arya', position: 'President', team: 'Core', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670256/WhatsApp_Image_2025-03-25_at_12.10.20_AM_smxbpd.jpg', socials: { linkedin: 'https://www.linkedin.com/in/prerana-arya-84b020283/' }},
  { id: 2, name: 'Sonasha Choudhary', position: 'The General Secretary', team: 'Core', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859643/IMG_20240529_004615_328_gf6l5g.jpg', socials: { linkedin: 'https://www.linkedin.com/in/sonasha-choudhary-5a9274298', twitter: 'https://twitter.com/Sonasha99', instagram: 'https://www.instagram.com/sonashaaa_08/' }},
  { id: 3, name: 'Palak', position: 'Vice President', team: 'Core', imageUrl: 'https://res.cloudinary.com/dzwfmydmx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/Asset_Mantle/IMG_20230921_135918_jfazmg.jpg', socials: { linkedin: 'https://www.linkedin.com/in/palak-bansal-3b6666283', twitter: 'https://twitter.com/palakbansl26', instagram: 'https://instagram.com/palak_16876' }},
  { id: 4, name: 'Anaya', position: 'Vice President', team: 'Core', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859643/picture_vtb8hj.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anaya-jain-4a5715288', twitter: 'https://twitter.com/AnayaJa48981116', instagram: 'https://www.instagram.com/10.anayajain' }},
  
  // Technical Team
  { id: 5, name: 'Manya', position: 'Lead', team: 'Technical', imageUrl: 'https://res.cloudinary.com/duptmanu9/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717849294/Profile-Manya_xf4ehi.jpg', socials: { linkedin: 'https://www.linkedin.com/in/manya35', twitter: 'https://twitter.com/hi_manya_', instagram: 'https://www.instagram.com/simpformanya/' }},
  { id: 6, name: 'Priya Verma', position: 'Lead', team: 'Technical', imageUrl: 'https://res.cloudinary.com/dzwfmydmx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670585/Asset_Mantle/priya_eu7avc.jpg', socials: { linkedin: 'https://www.linkedin.com/in/priya-verma-9668b4291/', twitter: 'https://x.com/PriyaVe93285977', instagram: 'https://www.instagram.com/_.priyavermaa' }},
  { id: 8, name: 'Anamika Garg', position: 'Core', team: 'Technical', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717850875//WhatsApp_Image_2025-03-24_at_9.50.54_PM_u4pjxg.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anamika-garg-aa14a5300/', twitter: 'https://x.com/AnamikaGarg29', instagram: 'https://instagram.com/akimana_fr' }},
  { id: 9, name: 'Bhumi Gupta', position: 'Core', team: 'Technical', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717850875/IMG_20240316_182633_011_bi9lm9.jpg', socials: { linkedin: 'http://www.linkedin.com/in/guptabhumi2005', twitter: 'https://x.com/BhumiGupta81010', instagram: 'https://instagram.com/spk2bhumi' }},
  
  { id: 11, name: 'Aayushi Singh', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849590/Screenshot_2025-11-11_135603_igm8nk.png', socials: { linkedin: 'https://www.linkedin.com/in/aayushi-singhhh/', twitter: 'https://x.com/AayushiSin39314', instagram: 'https://www.instagram.com/wakeupsinghhh' }},
  { id: 12, name: 'Aashna Sharma', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849297/Screenshot_2025-11-11_135054_udmjrh.png', socials: { linkedin: 'https://www.linkedin.com/in/aashna-sharma-20261a35b/', twitter: 'https://x.com/aashnash777', instagram: 'https://www.instagram.com/sh.a7i' }},
  { id: 13, name: 'Purva Mehta', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762848495/IMG20250704123946_2_emg7xs.jpg', socials: { linkedin: 'https://www.linkedin.com/in/purva-mehta-670b53375', twitter: 'https://x.com/PurvaMehta2007?t=w8Rrw8UyZI8EChps-Nu87A&s=09', instagram: 'https://www.instagram.com/purvamehta_01' }},
  { id: 14, name: 'Ishanvi Srivastava', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849464/Screenshot_2025-11-11_135402_a5wl7h.png', socials: { linkedin: 'https://www.linkedin.com/in/ishanvi-srivastava-16i', twitter: 'https://x.com/ishanvisri16', instagram: 'https://www.instagram.com/silvermistt.16' }},
  { id: 15, name: 'Ishita Sati', position: 'Coordinator', team: 'Technical', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762849757/Screenshot_2025-11-11_135900_luswau.png', socials: { linkedin: 'https://www.linkedin.com/in/ishita-s-91683a32b', twitter: '', instagram: 'https://www.instagram.com/is_hi274828' }},
  { id: 16, name: 'Tanisha', position: 'Coordinator', team: 'Technical', imageUrl: '', socials: { linkedin: '', twitter: '', instagram: '' }},
  { id: 17, name: 'Amna', position: 'Coordinator', team: 'Technical', imageUrl: '', socials: { linkedin: '', twitter: '', instagram: '' }},

  // Event Management Team
  { id: 18, name: 'Ridhima Choudhary', position: 'Lead', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/ridhima_rzc5go.jpg', socials: { linkedin: 'https://www.linkedin.com/in/ridhima-choudhary-774a8b287', twitter: '#', instagram: 'https://instagram.com/rridhimaaaa' }},
  { id: 19, name: 'Deepika', position: 'Lead', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/deepika_ynjfow.jpg', socials: { linkedin: 'https://www.linkedin.com/in/deepika-3903a5288', twitter: 'https://x.com/@frDeepika', instagram: 'https://instagram.com/deepika._.919' }},
  { id: 20, name: 'Shaivi Jain', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/shavi_lomval.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shaivi-jain-86937a321', twitter: '#', instagram: 'https://instagram.com/shaivi1706' }},
  { id: 21, name: 'Manupreet Kaur', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/manu_sssyb3.jpg', socials: { linkedin: 'https://www.linkedin.com/in/manupreet-kaur-9a69b0324', twitter: 'https://x.com/@manupreet2307', instagram: '#' }},
  { id: 25, name: 'Shreya Rathore', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/shreya_nmkaqc.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shreya-rathore-135785265', twitter: '#', instagram: '#' }},
  { id: 26, name: 'Ananshi Nayak', position: 'Core', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/ananshi_sm23e5.jpg', socials: { linkedin: 'https://www.linkedin.com/in/ananshi-nayak-69a19b327', twitter: 'https://x.com/@ananshi_nayak', instagram: '#' }},
  { id: 27, name: 'Disha Gupta', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742915747/Disha_Photo_nu2qt1.jpg', socials: { linkedin: 'https://www.linkedin.com/in/disha-gupta-343880328', twitter: 'https://x.com/@DishaGupta39677', instagram: '#' }},

  { id: 28, name: 'Harshita Dahiya', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850790/Screenshot_2025-11-11_141615_n7jxhg.png', socials: { linkedin: 'https://www.linkedin.com/in/harshita-dahiya-65a865282/', twitter: 'https://x.com/Harshita_47793', instagram: 'harshita_dahiya08' }},
  { id: 29, name: 'Arushi Pandey', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850877/Screenshot_2025-11-11_141744_q1gf35.png', socials: { linkedin: 'https://www.linkedin.com/in/arushi-pandey-13393937b', twitter: 'https://x.com/Arushi1919', instagram: '#' }},
  { id: 30, name: 'Bhavya Bhardwaj', position: 'Coordinator', team: 'Events', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850958/Screenshot_2025-11-11_141900_yzllut.png', socials: { linkedin: 'https://www.linkedin.com/in/bhavya-bhardwaj-64572937b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Bhavya02052007?t=tjeBW21jAU8vZ5X4Xib7sg&s=08', instagram: 'kk02081978' }},
  { id: 31, name: 'Swanandi Garudkar', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/swanandi-garudkar-163368386?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: 'swanandii.14' }},
  { id: 32, name: 'Harleen Kaur', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/harleen-kaur-1a9723362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', twitter: 'https://x.com/harleen05547067?s=21', instagram: 'harleennnn.21' }},
  { id: 33, name: 'Charushi', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/charushi-43162b320', twitter: '#', instagram: 'charushi_06' }},
  { id: 34, name: 'Ashmita Kumari', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/ashmita-kumari-6444b436b?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: '_ashmita_1012' }},
  { id: 35, name: 'Pranjal Pandey', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/pranjal-pandey-251064374?utm_source=share_via&utm_content=profile&utm_medium=member_android', twitter: '#', instagram: 'pranjal._.1106' }},
  { id: 36, name: 'Drishti Singh', position: 'Coordinator', team: 'Events', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/drishti-singh-a99163381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Drishtiii2006?t=fgRImkZG3MR39tXF8asbqQ&s=09', instagram: 'drishti_ish01' }},

  // Research Team
  { id: 37, name: 'Mehak Garg', position: 'Lead', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695756709/image_yatzxo.jpg', socials: { linkedin: 'https://www.linkedin.com/in/mehak-garg-084642282', twitter: '#', instagram: 'https://www.instagram.com/mehak.garg05/' }},
  { id: 38, name: 'Anjali Sharma', position: 'Lead', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695756710/pictureee_nqnhxa.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anjali-sharma-159054288', twitter: 'https://x.com/anjalii64', instagram: 'https://instagram.com/thatpixelmiss' }},
  { id: 39, name: 'Aditi Gupta', position: 'Coordinator', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/aditi_dgskwg.jpg', socials: { linkedin: 'https://www.linkedin.com/in/aditi-gupta-464024324', twitter: 'https://x.com/Aditi21gupta', instagram: 'https://instagram.com/kabhikabhi_adiiti' }},
  { id: 40, name: 'Kritika Singh', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/kritika_luccmz.jpg', socials: { linkedin: 'https://www.linkedin.com/in/kritika-singh-758b95322', twitter: 'https://x.com/Kritika32717391', instagram: 'https://instagram.com/ks_.1220' }},
  { id: 41, name: 'Swati Singh', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/swati_ts77zp.jpg', socials: { linkedin: 'https://www.linkedin.com/in/swati-singh-6031a4292', twitter: 'https://x.com/Swati_2104', instagram: 'https://instagram.com/swatiii_64' }},
  { id: 42, name: 'Sargam Sharma', position: 'Core', team: 'Research', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695670259/sargam_rrqgbb.jpg', socials: { linkedin: 'https://www.linkedin.com/in/er-sargam-sharma', twitter: '#', instagram: '#' }},
  
  { id: 43, name: 'Anya Kansal', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/anya-kansal-a94237373/', twitter: 'https://x.com/kansal86093', instagram: 'https://www.instagram.com/_anyaa._23' }},
  { id: 44, name: 'Ayesha Dhamija', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/ayeshadhamija', twitter: 'https://x.com/ayesha_dhamija', instagram: 'https://www.instagram.com/ayesha.dhamija' }},
  { id: 45, name: 'Aradhana Goyal', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},
  { id: 46, name: 'Divija Tewari', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},
  { id: 47, name: 'Kunjal Gupta', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},
  { id: 48, name: 'Tanishka Singh', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},
  { id: 49, name: 'Zahra Khan', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},
  { id: 50, name: 'Aditi', position: 'Coordinator', team: 'Research', imageUrl: '#', socials: { linkedin: '#', twitter: '#', instagram: '#' }},

  // Media Team
  { id: 51, name: 'Mahak', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859527/Mahak_AM_kv4kgj.jpg', socials: { linkedin: 'https://www.linkedin.com/in/mahak-154720287/', twitter: 'https://x.com/Mahak0520', instagram: '#' }},
  { id: 52, name: 'Priyanshi', position: 'Lead', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/priyanshi_cuuz7x.jpg', socials: { linkedin: 'www.linkedin.com/in/priyanshi-roy-a67825201', twitter: 'https://x.com/phiandrho', instagram: '#' }},
  { id: 53, name: 'Mehar Kapoor', position: 'Core', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/mehar_kvevsp.jpg', socials: { linkedin: 'https://linkedin.com/in/mehar-kapoor-428802214/', twitter: '#', instagram: 'https://www.instagram.com/mehar_kapoor7/' }},
  { id: 54, name: 'Diya Kotru', position: 'Core', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/diya_a73a8v.jpg', socials: { linkedin: 'https://www.linkedin.com/in/diya-kotru-9059a2322', twitter: 'https://x.com/DiyaKotru137', instagram: 'https://www.instagram.com/kotrudiya' }},
  { id: 55, name: 'Tulip', position: 'Core', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/tulip_swx7su.jpg', socials: { linkedin: 'www.linkedin.com/in/tulip-gupta-292661328', twitter: 'https://x.com/tulipp_19', instagram: 'https://www.instagram.com/_tulip.15_' }},
  { id: 56, name: 'Aakriti Shakya', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/akriti_b3h3zd.jpg', socials: { linkedin: 'https://www.linkedin.com/in/aakriti-shakya-a826b8275', twitter: 'https://x.com/aakritishakya9', instagram: 'https://www.instagram.com/aakritishakya9' }},
  { id: 57, name: 'Droni Arora', position: 'Coordinator', team: 'Media', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762851301/Screenshot_2025-11-11_142442_e5km6l.png', socials: { linkedin: 'https://www.linkedin.com/in/droni-arora-00b164381', twitter: 'https://x.com/AroraDroni0710', instagram: 'https://www.instagram.com/droniarora07' }},
  { id: 58, name: 'Hanishka Bhardwaj', position: 'Coordinator', team: 'Media', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/hanishka-bhardwaj-b88841383', twitter: '', instagram: 'https://www.instagram.com/hanishkaa_bhardwaj' }},
  { id: 59, name: 'Meghna Sharma', position: 'Coordinator', team: 'Media', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/meghna-sharma-9b16ba382', twitter: 'https://x.com/meghna_srma?t=eK1aw0oqmeDg07ejqV_h3A&s=08', instagram: 'https://www.instagram.com/_meghna_shm007' }},
  { id: 60, name: 'Rashi Choudhary', position: 'Coordinator', team: 'Media', imageUrl: '', socials: { linkedin: 'https://www.linkedin.com/in/rashi-choudhary-5a2763381', twitter: '', instagram: 'https://www.instagram.com/ri_pvt18' }},

  // Outreach Team
  { id: 61, name: 'Anusha Arora', position: 'Lead', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dlx9sj1pl/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859478/f0d11246-336f-4aa6-91d9-8b6f7d94a23f_shtsrl.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anusha-arora-23a75228a/', twitter: '#', instagram: '#' }},
  // { id: 51, name: 'Shruti Jha', position: 'Lead', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dlx9sj1pl/image/upload/ar_1:1,b_rgb:ffffff,bo_12px_solid_rgb:f2af13,c_fill,g_auto,r_max,w_1000/v1717859596/picture_for_AM_k08emn.jpg', socials: { linkedin: 'https://www.linkedin.com/in/shruti-jha-28b4b5255', twitter: 'https://x.com/Shruti_Jha6', instagram: 'https://www.instagram.com/shuru_iti/' }},
  { id: 62, name: 'Vani Tyagi', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742916432/Screenshot_2025-03-25_191201_nu1w2o.png', socials: { linkedin: 'https://www.linkedin.com/in/vani-tyagi-5a4440328/', twitter: 'https://x.com/tyagi806_vani', instagram: 'https://www.instagram.com/vanityagi.8/' }},
  { id: 63, name: 'Akshita', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/akshita_oo3r39.jpg', socials: { linkedin: 'https://www.linkedin.com/in/akshita-tanwar-939a04321', twitter: 'https://x.com/Akshita47246470', instagram: 'https://www.instagram.com/akshita.t9' }},
  { id: 64, name: 'Anupriya', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1742916431/20240918_233205_b4d9lm.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anupriya-7a8584322', twitter: 'https://x.com/Anu_heree', instagram: 'https://www.instagram.com/anu.heree' }},
  { id: 65, name: 'Lavanya Arora', position: 'Core', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/dalgvlhes/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1695672367/ProfilePic_tlkcwj.jpg', socials: { linkedin: 'https://www.linkedin.com/in/lavanya-arora-757412320', twitter: '#', instagram: 'https://www.instagram.com/its_lavanya_749' }},
  { id: 66, name: 'Bhumika', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/bhumika-lohran-2750b7329', twitter: 'https://x.com/bhumikaalohran?t=OKrckQKgIXwacFbZdZOcqg&s=09', instagram: 'https://www.instagram.com/arre_bhumi?igsh=MXNiZDIzeDZ6Znp1YQ==' }},
  { id: 67, name: 'Kashvi', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/kashvi-%E2%80%8E-790b06377/', twitter: 'https://x.com/Kashvi219671?t=ppmS244odRRwgSWAHL-hIA&s=09', instagram: 'https://www.instagram.com/kashvi.iee?igsh=MWlnMzY5Nnh5YXl1bg==' }},
  { id: 68, name: 'Bhumika Garg', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/bhumika-garg-a77577385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: '#', instagram: 'https://www.instagram.com/invites/contact/?igsh=16p6ayyenrj8h&utm_content=xpm7whz' }},
  { id: 69, name: 'Devanshi Malhotra', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850144/Screenshot_2025-11-11_140222_jaynjs.png', socials: { linkedin: 'https://www.linkedin.com/in/devanshi5malhotra/', twitter: '#', instagram: 'https://www.instagram.com/devanshi5malhotra/' }},
  { id: 70, name: 'Anshika Parmar', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/anshika-parmar-300a17326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', twitter: 'https://x.com/Anshikahehe?s=09', instagram: 'https://www.instagram.com/anshikaparmar._?igsh=ZWdrYXQydGY4NjR4' }},
  { id: 71, name: 'Khushboo', position: 'Coordinator', team: 'Outreach', imageUrl: 'https://res.cloudinary.com/deysvolet/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_10px_solid_rgb:F2AF13,b_rgb:262c35/v1762850360/Screenshot_2025-11-11_140905_aiihog.png', socials: { linkedin: 'https://www.linkedin.com/in/khushboo-aggarwal9582', twitter: 'https://x.com/Khushboo777868?t=k95x-EfKOlWLp0zUZahgbw&s=09', instagram: 'https://www.instagram.com/khushboo_aggarwal17?igsh=MWxiOXp2eDJ0YTlseQ==' }},
  { id: 72, name: 'Ritisha Sharma', position: 'Coordinator', team: 'Outreach', imageUrl: '#', socials: { linkedin: 'https://www.linkedin.com/in/ritisha-sharma-380b77379', twitter: 'https://x.com/ritsharma386?t=lZAJKazNkCZHi1EcqxmA4w&s=09', instagram: 'https://www.instagram.com/about.ritz?igsh=MXYzZHVxaDNlOTR5MA==' }},

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = ((y / height) - 0.5) * -40; // Max rotation on X-axis
    const rotateY = ((x / width) - 0.5) * 40;  // Max rotation on Y-axis

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-xs rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center shadow-lg backdrop-blur-sm transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative [transform-style:preserve-3d]">
        <img
          src={member.imageUrl}
          alt={`Profile of ${member.name}`}
          className="mx-auto h-32 w-32 rounded-full border-4 border-slate-700 object-cover shadow-md transition-all duration-300 group-hover:border-amber-400 [transform:translateZ(40px)]"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/1e293b/FFFFFF?text=Image'; }}
        />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-white [transform:translateZ(30px)]">{member.name}</h3>
      <p className="mt-1 font-medium text-amber-400 [transform:translateZ(20px)]">{member.position}</p>
      <div className="mt-5 flex items-center justify-center gap-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100 [transform:translateZ(20px)]">
        {member.socials.linkedin && member.socials.linkedin !== '#' && (
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-amber-400">
            <Linkedin size={24} />
          </a>
        )}
        {member.socials.twitter && member.socials.twitter !== '#' && (
          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-amber-400">
            <Twitter size={24} />
          </a>
        )}
        {member.socials.instagram && member.socials.instagram !== '#' && (
          <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-amber-400">
            <Instagram size={24} />
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
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 z-10 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #a3a3a3 1px, transparent 0)',
        backgroundSize: '1.5rem 1.5rem'
      }}></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(217,119,6,0.2),_rgba(0,0,0,0)_50%)]"></div>
    </div>
  );

  return (
    <div className="relative bg-black text-white min-h-screen font-sans overflow-hidden">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mt-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 to-amber-500">
            Meet The Team
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            The passionate individuals driving our vision forward.
          </p>
        </div>

        {/* --- MODIFIED: Responsive Tab Navigation --- */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 rounded-lg p-2 bg-slate-900/70 backdrop-blur-sm border border-slate-800">
            {teams.map(team => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap ${
                  activeTab === team
                    ? 'text-slate-900 bg-[#F6B433] shadow-md shadow-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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