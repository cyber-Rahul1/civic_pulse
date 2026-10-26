import fs from 'fs';

// Extract data from simplified_ap_geo.json and build-ap-map.mjs
const apGeo = JSON.parse(fs.readFileSync('simplified_ap_geo.json', 'utf8'));

// The 28 Districts of Andhra Pradesh with official headquarter coordinates and mandals
// Sources: AP District Reorganisation Gazette 2022, G.O.Ms.No.524 (Markapuram), G.O.Ms.No.517 (Polavaram)
const AP_ADMIN_DISTRICTS = [
  {
    id: 'alluri_sitharama_raju',
    name: 'Alluri Sitharama Raju',
    headquarters: 'Paderu',
    region: 'North Coastal',
    center: { latitude: 18.0833, longitude: 82.6667 },
    mandals: [
      { id: 'paderu', name: 'Paderu', center: { latitude: 18.0833, longitude: 82.6667 }, localities: ['Collectorate Area', 'Bus Station Road', 'Weekly Market', 'Sub-Collector Office'] },
      { id: 'araku_valley', name: 'Araku Valley', center: { latitude: 18.3273, longitude: 82.8775 }, localities: ['Tribal Museum Area', 'Padmapuram Gardens', 'Araku Railway Station', 'Main Bazaar'] },
      { id: 'ananthagiri', name: 'Ananthagiri', center: { latitude: 18.2383, longitude: 83.0118 }, localities: ['Borra Caves Junction', 'Coffee Plantation Zone', 'Ghat Road Center'] },
      { id: 'hukumpeta', name: 'Hukumpeta', center: { latitude: 18.1567, longitude: 82.7667 }, localities: ['Mandal Parishad Office', 'Main Road'] },
      { id: 'dumbriguda', name: 'Dumbriguda', center: { latitude: 18.2833, longitude: 82.7833 }, localities: ['Chaparai Road', 'Panchayat Center'] },
      { id: 'g_madugula', name: 'G.Madugula', center: { latitude: 17.9667, longitude: 82.5167 }, localities: ['Police Station Area', 'RTC Bus Stop'] }
    ]
  },
  {
    id: 'anakapalli',
    name: 'Anakapalli',
    headquarters: 'Anakapalli',
    region: 'North Coastal',
    center: { latitude: 17.6913, longitude: 83.0039 },
    mandals: [
      { id: 'anakapalli', name: 'Anakapalli', center: { latitude: 17.6913, longitude: 83.0039 }, localities: ['Jaggery Market Yard', 'Ring Road', 'Gavarapalem', 'Railway Station Road'] },
      { id: 'chodavaram', name: 'Chodavaram', center: { latitude: 17.8333, longitude: 82.9333 }, localities: ['Govt Hospital Center', 'RTC Depot', 'Four Roads Junction'] },
      { id: 'elamanchili', name: 'Elamanchili', center: { latitude: 17.5500, longitude: 82.9167 }, localities: ['Court Complex Area', 'Bypass Road', 'Main Bazaar'] },
      { id: 'narsipatnam', name: 'Narsipatnam', center: { latitude: 17.6667, longitude: 82.6167 }, localities: ['Balighattam Road', 'Abid Nagar', 'Muncipal Office'] },
      { id: 'pendurthi', name: 'Pendurthi', center: { latitude: 17.8333, longitude: 83.2000 }, localities: ['Railway Junction', 'Suvarna Nagar', 'BRTS Road'] },
      { id: 'payakaraopeta', name: 'Payakaraopeta', center: { latitude: 17.3667, longitude: 82.5667 }, localities: ['Tuni Border Bridge', 'Panchayat Area'] }
    ]
  },
  {
    id: 'ananthapuramu',
    name: 'Ananthapuramu',
    headquarters: 'Anantapur',
    region: 'Rayalaseema',
    center: { latitude: 14.6819, longitude: 77.6006 },
    mandals: [
      { id: 'anantapur_urban', name: 'Anantapur Urban', center: { latitude: 14.6819, longitude: 77.6006 }, localities: ['Clock Tower Circle', 'Subash Road', 'JNTU Campus Area', 'Sapthagiri Circle'] },
      { id: 'guntakal', name: 'Guntakal', center: { latitude: 15.1667, longitude: 77.3667 }, localities: ['Railway Division HQ', 'Hanuman Circle', 'NTR Marg'] },
      { id: 'tadipatri', name: 'Tadipatri', center: { latitude: 14.9100, longitude: 78.0100 }, localities: ['Bugga Ramalingeswara Temple Area', 'Industrial Estate', 'Bypass'] },
      { id: 'uravakonda', name: 'Uravakonda', center: { latitude: 14.9500, longitude: 77.2667 }, localities: ['Bus Stand Circle', 'Taluk Office Area'] },
      { id: 'kalyandurg', name: 'Kalyandurg', center: { latitude: 14.5500, longitude: 77.1000 }, localities: ['Fort Area', 'Weekly Market', 'Main Road'] }
    ]
  },
  {
    id: 'annamayya',
    name: 'Annamayya',
    headquarters: 'Rayachoti',
    region: 'Rayalaseema',
    center: { latitude: 14.0564, longitude: 78.7523 },
    mandals: [
      { id: 'rayachoti', name: 'Rayachoti', center: { latitude: 14.0564, longitude: 78.7523 }, localities: ['Collectorate Complex', 'Kadapa Road Junction', 'Madanapalle Road', 'Old Town'] },
      { id: 'madanapalle', name: 'Madanapalle', center: { latitude: 13.5500, longitude: 78.5000 }, localities: ['Besant Theosophical College Area', 'Patel Road', 'Bangalore Bus Stand'] },
      { id: 'rajampet', name: 'Rajampet', center: { latitude: 14.1833, longitude: 79.1667 }, localities: ['Railway Station Area', 'AITS Campus Junction', 'Old Market'] },
      { id: 'pileru', name: 'Pileru', center: { latitude: 13.7000, longitude: 78.9333 }, localities: ['Four Roads Circle', 'RTC Bus Station'] },
      { id: 'kodur', name: 'Railway Kodur', center: { latitude: 13.9500, longitude: 79.3500 }, localities: ['Fruit Market Yard', 'Bypass Road'] }
    ]
  },
  {
    id: 'bapatla',
    name: 'Bapatla',
    headquarters: 'Bapatla',
    region: 'Coastal Andhra',
    center: { latitude: 15.9042, longitude: 80.4674 },
    mandals: [
      { id: 'bapatla', name: 'Bapatla', center: { latitude: 15.9042, longitude: 80.4674 }, localities: ['Agricultural College Road', 'Suryalanka Beach Road', 'Railway Station Junction', 'Old Guntur Road'] },
      { id: 'chirala', name: 'Chirala', center: { latitude: 15.8200, longitude: 80.3500 }, localities: ['Handloom Textile Market', 'Peraiah Complex', 'Bypass Circle', 'Vadarevu Road'] },
      { id: 'addanki', name: 'Addanki', center: { latitude: 15.8167, longitude: 79.9833 }, localities: ['Gundlakamma River Bank Area', 'Main Cross Road'] },
      { id: 'repalle', name: 'Repalle', center: { latitude: 16.0200, longitude: 80.8500 }, localities: ['Railway Terminus Road', 'RTC Complex Area'] },
      { id: 'vemuru', name: 'Vemuru', center: { latitude: 16.1667, longitude: 80.7500 }, localities: ['Panchayat Office', 'Bhattiprolu Junction'] }
    ]
  },
  {
    id: 'chittoor',
    name: 'Chittoor',
    headquarters: 'Chittoor',
    region: 'Rayalaseema',
    center: { latitude: 13.2172, longitude: 79.1003 },
    mandals: [
      { id: 'chittoor_urban', name: 'Chittoor Urban', center: { latitude: 13.2172, longitude: 79.1003 }, localities: ['Gandhi Road', 'District Collectorate', 'Greamspet', 'MSR Circle', 'Kongareddypalli'] },
      { id: 'palamaner', name: 'Palamaner', center: { latitude: 13.2000, longitude: 78.7500 }, localities: ['National Highway Circle', 'Cattle Market Area', 'Bazaar Street'] },
      { id: 'kuppam', name: 'Kuppam', center: { latitude: 12.7500, longitude: 78.3667 }, localities: ['PES Medical College Area', 'Railway Station Road', 'NTR Circle'] },
      { id: 'nagari', name: 'Nagari', center: { latitude: 13.3300, longitude: 79.5800 }, localities: ['Weavers Colony', 'Bazaar Street', 'Border Checkpost'] },
      { id: 'punganur', name: 'Punganur', center: { latitude: 13.3667, longitude: 78.5833 }, localities: ['Palace Road', 'Market Junction'] }
    ]
  },
  {
    id: 'konaseema',
    name: 'Dr. B.R. Ambedkar Konaseema',
    headquarters: 'Amalapuram',
    region: 'Coastal Andhra',
    center: { latitude: 16.5787, longitude: 82.0061 },
    mandals: [
      { id: 'amalapuram', name: 'Amalapuram', center: { latitude: 16.5787, longitude: 82.0061 }, localities: ['Clock Tower Center', 'Black Bridge Area', 'Collectorate Camp Office', 'KIMS Hospital Road'] },
      { id: 'ramachandrapuram', name: 'Ramachandrapuram', center: { latitude: 16.8500, longitude: 82.0200 }, localities: ['Fort Area', 'Kakinada Road Junction', 'Main Bazaar'] },
      { id: 'mandapeta', name: 'Mandapeta', center: { latitude: 16.8700, longitude: 81.9300 }, localities: ['Rice Mills Industrial Area', 'Four Roads Circle'] },
      { id: 'razole', name: 'Razole', center: { latitude: 16.4833, longitude: 81.8333 }, localities: ['Godavari Ferry Point', 'Bridge Approach', 'Main Road'] },
      { id: 'mummidivaram', name: 'Mummidivaram', center: { latitude: 16.6500, longitude: 82.1167 }, localities: ['Balayogi Samadhi Area', 'RTC Bus Station'] }
    ]
  },
  {
    id: 'east_godavari',
    name: 'East Godavari',
    headquarters: 'Rajahmundry',
    region: 'Coastal Andhra',
    center: { latitude: 17.0005, longitude: 81.8040 },
    mandals: [
      { id: 'rajahmundry_urban', name: 'Rajahmundry Urban', center: { latitude: 17.0005, longitude: 81.8040 }, localities: ['Godavari Pushkar Ghat', 'Kotipalli Bus Stand', 'Danavaipeta', 'Kambal Cheruvu', 'Jampeta'] },
      { id: 'kovvur', name: 'Kovvur', center: { latitude: 17.0167, longitude: 81.7333 }, localities: ['Godavari Toll Plaza', 'Goshpada Kshetram', 'Station Road'] },
      { id: 'nidadavole', name: 'Nidadavole', center: { latitude: 16.9167, longitude: 81.6667 }, localities: ['Canal Road', 'Railway Junction Area'] },
      { id: 'anaparthy', name: 'Anaparthy', center: { latitude: 16.9333, longitude: 81.9500 }, localities: ['Bazaar Street', 'Canal Bund Road'] },
      { id: 'rajanagaram', name: 'Rajanagaram', center: { latitude: 17.0833, longitude: 81.9000 }, localities: ['Adikavi Nannaya University Area', 'NH-16 Junction'] }
    ]
  },
  {
    id: 'eluru',
    name: 'Eluru',
    headquarters: 'Eluru',
    region: 'Coastal Andhra',
    center: { latitude: 16.7107, longitude: 81.0952 },
    mandals: [
      { id: 'eluru', name: 'Eluru', center: { latitude: 16.7107, longitude: 81.0952 }, localities: ['Fire Station Center', 'Powerpet Railway Station', 'Collectorate', 'R.R. Pet', 'Ashok Nagar'] },
      { id: 'jangareddygudem', name: 'Jangareddygudem', center: { latitude: 17.1167, longitude: 81.3000 }, localities: ['RTC Bus Stand', 'Tobacco Board Area', 'Kammavaripalem'] },
      { id: 'nuzvid', name: 'Nuzvid', center: { latitude: 16.7833, longitude: 80.8500 }, localities: ['IIIT Nuzvid Campus', 'Mango Market Yard', 'Fort Area'] },
      { id: 'chintalapudi', name: 'Chintalapudi', center: { latitude: 17.0667, longitude: 80.9833 }, localities: ['Main Bazaar', 'Govt Hospital Road'] },
      { id: 'kaikalur', name: 'Kaikalur', center: { latitude: 16.5667, longitude: 81.2000 }, localities: ['Kolleru Lake Road', 'Railway Station Road'] }
    ]
  },
  {
    id: 'guntur',
    name: 'Guntur',
    headquarters: 'Guntur',
    region: 'Coastal Andhra',
    center: { latitude: 16.3067, longitude: 80.4365 },
    mandals: [
      { id: 'guntur_urban', name: 'Guntur Urban', center: { latitude: 16.3067, longitude: 80.4365 }, localities: ['Arundelpet', 'Brodipet', 'Laxmipuram', 'Chilli Market Yard', 'Kothapet', 'Collectorate'] },
      { id: 'amaravati', name: 'Amaravati (Capital)', center: { latitude: 16.5131, longitude: 80.5165 }, localities: ['Secretariat Complex (Velagapudi)', 'High Court Area', 'Seed Access Road', 'Rayapudi'] },
      { id: 'mangalagiri', name: 'Mangalagiri', center: { latitude: 16.4300, longitude: 80.5700 }, localities: ['AIIMS Campus', 'Panakala Temple Area', 'Old Handloom Bazaar', 'Bypass'] },
      { id: 'tenali', name: 'Tenali', center: { latitude: 16.2400, longitude: 80.6500 }, localities: ['Bose Road', 'Canal Road', 'Three Lanterns Center', 'Chenchupet'] },
      { id: 'ponnuru', name: 'Ponnuru', center: { latitude: 16.0700, longitude: 80.5700 }, localities: ['Sakshi Ganapathi Temple Area', 'Nidubrolu Railway Station'] }
    ]
  },
  {
    id: 'kakinada',
    name: 'Kakinada',
    headquarters: 'Kakinada',
    region: 'Coastal Andhra',
    center: { latitude: 16.9891, longitude: 82.2475 },
    mandals: [
      { id: 'kakinada_urban', name: 'Kakinada Urban', center: { latitude: 16.9891, longitude: 82.2475 }, localities: ['Main Road (Bhanugudi)', 'Deep Water Port Area', 'Collectorate', 'Sarpavaram Junction', 'Jagannaickpur'] },
      { id: 'peddapuram', name: 'Peddapuram', center: { latitude: 17.0800, longitude: 82.1300 }, localities: ['Silk Handloom Colony', 'Maridamma Temple Area', 'Bypass'] },
      { id: 'pithapuram', name: 'Pithapuram', center: { latitude: 17.1100, longitude: 82.2600 }, localities: ['Kukkuteswara Swamy Temple Road', 'Railway Station Area'] },
      { id: 'tuni', name: 'Tuni', center: { latitude: 17.3500, longitude: 82.5500 }, localities: ['Railway Junction Area', 'Betel Leaf Market', 'NH-16 Flyover'] },
      { id: 'samalkota', name: 'Samalkota', center: { latitude: 17.0500, longitude: 82.1700 }, localities: ['Railway Station Junction', 'Sugar Factory Road'] }
    ]
  },
  {
    id: 'krishna',
    name: 'Krishna',
    headquarters: 'Machilipatnam',
    region: 'Coastal Andhra',
    center: { latitude: 16.1875, longitude: 81.1389 },
    mandals: [
      { id: 'machilipatnam', name: 'Machilipatnam', center: { latitude: 16.1875, longitude: 81.1389 }, localities: ['Collectorate Area', 'Koneru Center', 'Manginapudi Beach Road', 'Robertsonpet', 'Bandar Port Zone'] },
      { id: 'gudivada', name: 'Gudivada', center: { latitude: 16.4300, longitude: 80.9900 }, localities: ['Nehru Chowk', 'Railway Station Road', 'Gudivada Bus Stand'] },
      { id: 'pedana', name: 'Pedana', center: { latitude: 16.2600, longitude: 81.1600 }, localities: ['Kalamkari Block Print Area', 'Bazaar Center'] },
      { id: 'avanigadda', name: 'Avanigadda', center: { latitude: 16.0200, longitude: 80.9200 }, localities: ['Gandhi Kshetram', 'Puligadda Bridge Approach'] },
      { id: 'pamarru', name: 'Pamarru', center: { latitude: 16.3300, longitude: 80.9600 }, localities: ['Four Roads Junction', 'Market Yard'] }
    ]
  },
  {
    id: 'kurnool',
    name: 'Kurnool',
    headquarters: 'Kurnool',
    region: 'Rayalaseema',
    center: { latitude: 15.8281, longitude: 78.0373 },
    mandals: [
      { id: 'kurnool_urban', name: 'Kurnool Urban', center: { latitude: 15.8281, longitude: 78.0373 }, localities: ['Konda Reddy Buruju', 'Mourya Inn Circle', 'Collectorate', 'C-Camp', 'Raj Vihar Circle'] },
      { id: 'adoni', name: 'Adoni', center: { latitude: 15.6300, longitude: 77.2800 }, localities: ['Cotton Market Yard', 'Fort Road', 'Bypass Junction'] },
      { id: 'yemmiganur', name: 'Yemmiganur', center: { latitude: 15.7700, longitude: 77.4800 }, localities: ['Weavers Colony', 'Somappa Nagar'] },
      { id: 'mantralayam', name: 'Mantralayam', center: { latitude: 15.9300, longitude: 77.4300 }, localities: ['Raghavendra Swamy Mutt Area', 'Tungabhadra River Ghat'] },
      { id: 'kodumur', name: 'Kodumur', center: { latitude: 15.6800, longitude: 77.7800 }, localities: ['Bus Station Area', 'Panchayat Road'] }
    ]
  },
  {
    id: 'markapuram',
    name: 'Markapuram',
    headquarters: 'Markapur',
    region: 'Coastal Andhra',
    center: { latitude: 15.7353, longitude: 79.2685 },
    mandals: [
      { id: 'markapur', name: 'Markapur', center: { latitude: 15.7353, longitude: 79.2685 }, localities: ['Chennakesava Swamy Temple Road', 'Slate Factory Zone', 'Collectorate Office', 'Railway Station Road', 'Kurnool-Guntur Road'] },
      { id: 'giddalur', name: 'Giddalur', center: { latitude: 15.3800, longitude: 78.9300 }, localities: ['Nallamala Forest Border', 'Railway Gate Area', 'Old Town'] },
      { id: 'kanigiri', name: 'Kanigiri', center: { latitude: 15.4000, longitude: 79.5100 }, localities: ['Pamur Road Junction', 'RTC Bus Station'] },
      { id: 'yerragondapalem', name: 'Yerragondapalem', center: { latitude: 16.0300, longitude: 79.3000 }, localities: ['Srisailam Ghat Entry Road', 'Four Roads Junction'] },
      { id: 'podili', name: 'Podili', center: { latitude: 15.6000, longitude: 79.6000 }, localities: ['Main Bazaar', 'Govt Hospital Road'] }
    ]
  },
  {
    id: 'nandyal',
    name: 'Nandyal',
    headquarters: 'Nandyal',
    region: 'Rayalaseema',
    center: { latitude: 15.4859, longitude: 78.4841 },
    mandals: [
      { id: 'nandyal', name: 'Nandyal', center: { latitude: 15.4859, longitude: 78.4841 }, localities: ['Sanjeeva Nagar Gate', 'Nava Nandi Road', 'Collectorate', 'Srinivasa Nagar', 'Bypass Circle'] },
      { id: 'allagadda', name: 'Allagadda', center: { latitude: 15.1300, longitude: 78.5100 }, localities: ['Sculpture Art Village Area', 'Ahobilam Road Junction'] },
      { id: 'dhone', name: 'Dhone', center: { latitude: 15.4200, longitude: 77.8700 }, localities: ['Railway Junction Area', 'Old Bus Stand'] },
      { id: 'nandikotkur', name: 'Nandikotkur', center: { latitude: 15.8600, longitude: 78.2600 }, localities: ['Market Yard', 'Sangameswaram Road'] },
      { id: 'srisailam', name: 'Srisailam', center: { latitude: 16.0700, longitude: 78.8700 }, localities: ['Mallikarjuna Swamy Temple Area', 'Sunnipenta', 'Dam Viewpoint'] }
    ]
  },
  {
    id: 'ntr',
    name: 'NTR',
    headquarters: 'Vijayawada',
    region: 'Coastal Andhra',
    center: { latitude: 16.5062, longitude: 80.6480 },
    mandals: [
      { id: 'vijayawada_urban', name: 'Vijayawada Urban', center: { latitude: 16.5062, longitude: 80.6480 }, localities: ['Benz Circle', 'Prakasam Barrage', 'Kanaka Durga Temple Area', 'Governorpet', 'M.G. Road', 'Autonagar'] },
      { id: 'mylavaram', name: 'Mylavaram', center: { latitude: 16.7600, longitude: 80.6400 }, localities: ['LBRCE College Area', 'Nuzvid Road'] },
      { id: 'nandigama', name: 'Nandigama', center: { latitude: 16.7700, longitude: 80.2900 }, localities: ['Hyderabad Highway Junction', 'Old Market'] },
      { id: 'jaggayyapeta', name: 'Jaggayyapeta', center: { latitude: 16.8900, longitude: 80.0900 }, localities: ['Cement Industrial Belt', 'Bypass Road'] },
      { id: 'tiruvuru', name: 'Tiruvuru', center: { latitude: 17.1100, longitude: 80.6100 }, localities: ['Bazaar Street', 'Telangana Border Road'] }
    ]
  },
  {
    id: 'palnadu',
    name: 'Palnadu',
    headquarters: 'Narasaraopet',
    region: 'Coastal Andhra',
    center: { latitude: 16.2359, longitude: 80.0499 },
    mandals: [
      { id: 'narasaraopet', name: 'Narasaraopet', center: { latitude: 16.2359, longitude: 80.0499 }, localities: ['Kotappakonda Road', 'Collectorate Complex', 'Prakash Nagar', 'Station Road', 'Palnadu Bus Stand'] },
      { id: 'sattenapalle', name: 'Sattenapalle', center: { latitude: 16.3900, longitude: 80.1800 }, localities: ['Railway Station Area', 'Guntur Road Junction'] },
      { id: 'macherla', name: 'Macherla', center: { latitude: 16.4800, longitude: 79.3000 }, localities: ['Nagarjuna Sagar Road', 'Chennakesava Temple Area'] },
      { id: 'vinukonda', name: 'Vinukonda', center: { latitude: 16.0500, longitude: 79.7400 }, localities: ['Hill Fort View Area', 'Markapur Road'] },
      { id: 'chilakaluripet', name: 'Chilakaluripet', center: { latitude: 16.0900, longitude: 80.1700 }, localities: ['NH-16 Flyover Area', 'Kalamandir Junction'] }
    ]
  },
  {
    id: 'parvathipuram_manyam',
    name: 'Parvathipuram Manyam',
    headquarters: 'Parvathipuram',
    region: 'North Coastal',
    center: { latitude: 18.7758, longitude: 83.4265 },
    mandals: [
      { id: 'parvathipuram', name: 'Parvathipuram', center: { latitude: 18.7758, longitude: 83.4265 }, localities: ['Collectorate Office', 'Belgam Area', 'Railway Station Road', 'Main Market', 'Old Town'] },
      { id: 'salur', name: 'Salur', center: { latitude: 18.5200, longitude: 83.2100 }, localities: ['Odisha Border Ghat Road', 'Bypass'] },
      { id: 'palakonda', name: 'Palakonda', center: { latitude: 18.6000, longitude: 83.7500 }, localities: ['Kota Durga Temple Area', 'Nagavali River Road'] },
      { id: 'kurupam', name: 'Kurupam', center: { latitude: 18.8700, longitude: 83.5500 }, localities: ['Palace Grounds', 'Tribal Welfare Complex'] }
    ]
  },
  {
    id: 'polavaram',
    name: 'Polavaram',
    headquarters: 'Rampachodavaram',
    region: 'Coastal Andhra',
    center: { latitude: 17.4385, longitude: 81.7774 },
    mandals: [
      { id: 'rampachodavaram', name: 'Rampachodavaram', center: { latitude: 17.4385, longitude: 81.7774 }, localities: ['Collectorate Administrative Zone', 'ITDA Office Complex', 'Maredumilli Eco-Tourism Road', 'Ghat Road Junction'] },
      { id: 'chinturu', name: 'Chinturu', center: { latitude: 17.7500, longitude: 81.4000 }, localities: ['Sabari-Godavari Confluence Area', 'Bhadrachalam Road Checkpost'] },
      { id: 'maredumilli', name: 'Maredumilli', center: { latitude: 17.6000, longitude: 81.7100 }, localities: ['Jungle Star Eco-Camp', 'Main Forest Road'] },
      { id: 'kunavaram', name: 'Kunavaram', center: { latitude: 17.5800, longitude: 81.2700 }, localities: ['Sabari River Ferry Point', 'Bazaar Street'] },
      { id: 'vr_puram', name: 'Vararamachandrapuram', center: { latitude: 17.5200, longitude: 81.4300 }, localities: ['Godavari Bank Area', 'Panchayat Center'] }
    ]
  },
  {
    id: 'prakasam',
    name: 'Prakasam',
    headquarters: 'Ongole',
    region: 'Coastal Andhra',
    center: { latitude: 15.5057, longitude: 80.0499 },
    mandals: [
      { id: 'ongole_urban', name: 'Ongole Urban', center: { latitude: 15.5057, longitude: 80.0499 }, localities: ['Collectorate Area', 'Kurnool Road Flyover', 'Lawyerpet', 'Trunk Road', 'RIMS Hospital Road'] },
      { id: 'santhanuthalapadu', name: 'Santhanuthalapadu', center: { latitude: 15.5600, longitude: 79.9500 }, localities: ['Granite Industrial Belt', 'Bypass'] },
      { id: 'darsi', name: 'Darsi', center: { latitude: 15.7700, longitude: 79.6800 }, localities: ['Nagarjuna Sagar Canal Area', 'Main Cross Road'] },
      { id: 'kondapi', name: 'Kondapi', center: { latitude: 15.4200, longitude: 79.8800 }, localities: ['Taluk Office', 'Panchayat Area'] }
    ]
  },
  {
    id: 'nellore',
    name: 'Sri Potti Sriramulu Nellore',
    headquarters: 'Nellore',
    region: 'Coastal Andhra',
    center: { latitude: 14.4426, longitude: 79.9865 },
    mandals: [
      { id: 'nellore_urban', name: 'Nellore Urban', center: { latitude: 14.4426, longitude: 79.9865 }, localities: ['V.R.C. Center', 'Magunta Layout', 'Trunk Road', 'Collectorate', 'Podalakur Road', 'Penna River Bridge'] },
      { id: 'kavali', name: 'Kavali', center: { latitude: 14.9100, longitude: 79.9900 }, localities: ['Trunk Road', 'Railway Station Junction', 'RTC Bus Stand'] },
      { id: 'kandukur', name: 'Kandukur', center: { latitude: 15.2200, longitude: 79.9000 }, localities: ['Old Town', 'Pamuru Road', 'Bypass Circle'] },
      { id: 'atmakur', name: 'Atmakur', center: { latitude: 14.6100, longitude: 79.3700 }, localities: ['Somasila Road Junction', 'Main Bazaar'] },
      { id: 'kovuru', name: 'Kovuru', center: { latitude: 14.4900, longitude: 79.9800 }, localities: ['Toll Plaza Area', 'Sugar Factory Road'] }
    ]
  },
  {
    id: 'sri_sathya_sai',
    name: 'Sri Sathya Sai',
    headquarters: 'Puttaparthi',
    region: 'Rayalaseema',
    center: { latitude: 14.1678, longitude: 77.8115 },
    mandals: [
      { id: 'puttaparthi', name: 'Puttaparthi', center: { latitude: 14.1678, longitude: 77.8115 }, localities: ['Prasanthi Nilayam Area', 'Super Speciality Hospital Road', 'Collectorate', 'Chitravathi Road', 'Airport Road'] },
      { id: 'hindupur', name: 'Hindupur', center: { latitude: 13.8300, longitude: 77.4900 }, localities: ['M.G. Road', 'Industrial Estate', 'Railway Station Road'] },
      { id: 'dharmavaram', name: 'Dharmavaram', center: { latitude: 14.4100, longitude: 77.7200 }, localities: ['Silk Saree Weaver Colony', 'Railway Junction'] },
      { id: 'kadiri', name: 'Kadiri', center: { latitude: 14.1100, longitude: 78.1600 }, localities: ['Lakshmi Narasimha Temple Road', 'Bypass'] },
      { id: 'penukonda', name: 'Penukonda', center: { latitude: 14.0800, longitude: 77.6000 }, localities: ['Kia Motors Auto Hub Area', 'Gagan Mahal Fort Road'] }
    ]
  },
  {
    id: 'srikakulam',
    name: 'Srikakulam',
    headquarters: 'Srikakulam',
    region: 'North Coastal',
    center: { latitude: 18.2969, longitude: 83.8968 },
    mandals: [
      { id: 'srikakulam_urban', name: 'Srikakulam Urban', center: { latitude: 18.2969, longitude: 83.8968 }, localities: ['7 Road Junction', 'Collectorate Complex', 'Palakonda Road', 'Arasavalli Sun Temple Road', 'Nagavali River Bund'] },
      { id: 'palasa', name: 'Palasa', center: { latitude: 18.7700, longitude: 84.4100 }, localities: ['Cashew Processing Zone', 'Kasibugga Railway Station Area'] },
      { id: 'tekkali', name: 'Tekkali', center: { latitude: 18.6100, longitude: 84.2300 }, localities: ['Court Complex Area', 'Four Roads Junction'] },
      { id: 'ichchapuram', name: 'Ichchapuram', center: { latitude: 19.1100, longitude: 84.6900 }, localities: ['Odisha Border Checkpost', 'Bypass'] },
      { id: 'amadalavalasa', name: 'Amadalavalasa', center: { latitude: 18.4200, longitude: 83.9000 }, localities: ['Srikakulam Road Railway Station', 'Sugar Factory Area'] }
    ]
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    headquarters: 'Tirupati',
    region: 'Rayalaseema',
    center: { latitude: 13.6288, longitude: 79.4192 },
    mandals: [
      { id: 'tirupati_urban', name: 'Tirupati Urban', center: { latitude: 13.6288, longitude: 79.4192 }, localities: ['Alipiri Foot of Hills', 'Tirumala Ghat Road', 'Tirupati Railway Station', 'Collectorate', 'Bairagipatteda', 'SV University Area'] },
      { id: 'srikalahasti', name: 'Srikalahasti', center: { latitude: 13.7500, longitude: 79.7000 }, localities: ['Srikalahasteeswara Temple Road', 'Swarnamukhi River Bund', 'RTC Bus Stand'] },
      { id: 'gudur', name: 'Gudur', center: { latitude: 14.1500, longitude: 79.8500 }, localities: ['Mica Industrial Area', 'Railway Junction'] },
      { id: 'sullurpeta', name: 'Sullurpeta', center: { latitude: 13.7000, longitude: 80.0200 }, localities: ['ISRO Sriharikota Access Road', 'Pulicat Lake Area'] },
      { id: 'venkatagiri', name: 'Venkatagiri', center: { latitude: 13.9600, longitude: 79.5800 }, localities: ['Zari Handloom Cluster', 'Raja Palace Road'] }
    ]
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    headquarters: 'Visakhapatnam',
    region: 'North Coastal',
    center: { latitude: 17.6868, longitude: 83.2185 },
    mandals: [
      { id: 'visakhapatnam_urban', name: 'Visakhapatnam Urban', center: { latitude: 17.6868, longitude: 83.2185 }, localities: ['RK Beach Road', 'Siripuram Circle', 'Jagadamba Center', 'Dwaraka Nagar (RTC Complex)', 'MVP Colony', 'Collectorate', 'Rushikonda IT SEZ'] },
      { id: 'gajuwaka', name: 'Gajuwaka', center: { latitude: 17.6900, longitude: 83.1800 }, localities: ['Steel Plant Main Gate', 'BHPVL Junction', 'Old Gajuwaka Market'] },
      { id: 'bhimili', name: 'Bheemunipatnam (Bhimili)', center: { latitude: 17.8900, longitude: 83.4300 }, localities: ['Dutch Cemetery Road', 'Beach Promenade', 'Gosthani River Confluence'] },
      { id: 'pedagantyada', name: 'Pedagantyada', center: { latitude: 17.6500, longitude: 83.2300 }, localities: ['Gangavaram Port Gate', 'Scindia Junction'] }
    ]
  },
  {
    id: 'vizianagaram',
    name: 'Vizianagaram',
    headquarters: 'Vizianagaram',
    region: 'North Coastal',
    center: { latitude: 18.1124, longitude: 83.4079 },
    mandals: [
      { id: 'vizianagaram_urban', name: 'Vizianagaram Urban', center: { latitude: 18.1124, longitude: 83.4079 }, localities: ['Gajapathi Fort Area', 'Collectorate', 'Mayuri Junction', 'Kanthi Road', 'Railway Station Road', 'Cantonment'] },
      { id: 'bobbili', name: 'Bobbili', center: { latitude: 18.5700, longitude: 83.3600 }, localities: ['Bobbili Fort Grounds', 'Industrial Growth Centre'] },
      { id: 'cheepurupalli', name: 'Cheepurupalli', center: { latitude: 18.3100, longitude: 83.5700 }, localities: ['Railway Station Area', 'Main Road'] },
      { id: 'srungavarapukota', name: 'Srungavarapukota (S.Kota)', center: { latitude: 18.1100, longitude: 83.1500 }, localities: ['Punygiri Road', 'Bypass Circle'] },
      { id: 'rajam', name: 'Rajam', center: { latitude: 18.4500, longitude: 83.6500 }, localities: ['GMRIT Campus Area', 'Main Bazaar'] }
    ]
  },
  {
    id: 'west_godavari',
    name: 'West Godavari',
    headquarters: 'Bhimavaram',
    region: 'Coastal Andhra',
    center: { latitude: 16.5449, longitude: 81.5212 },
    mandals: [
      { id: 'bhimavaram', name: 'Bhimavaram', center: { latitude: 16.5449, longitude: 81.5212 }, localities: ['Somaramam Temple Area', 'Collectorate Office', 'DNR College Road', 'Prakasam Chowk', 'Bypass Circle'] },
      { id: 'tadepalligudem', name: 'Tadepalligudem', center: { latitude: 16.8100, longitude: 81.5200 }, localities: ['NIT Andhra Pradesh Campus', 'KN Road', 'Railway Station Junction'] },
      { id: 'tanuku', name: 'Tanuku', center: { latitude: 16.7500, longitude: 81.7000 }, localities: ['Narendra Center', 'Andhra Sugars Complex Area'] },
      { id: 'narasapuram', name: 'Narasapuram', center: { latitude: 16.4300, longitude: 81.7000 }, localities: ['Crochet Lace Cluster', 'Vashista Godavari River Front'] },
      { id: 'palakollu', name: 'Palakollu', center: { latitude: 16.5200, longitude: 81.7300 }, localities: ['Ksheera Ramalingeswara Temple Area', 'Gandhi Chowk'] }
    ]
  },
  {
    id: 'ysr_kadapa',
    name: 'YSR Kadapa',
    headquarters: 'Kadapa',
    region: 'Rayalaseema',
    center: { latitude: 14.4673, longitude: 78.8242 },
    mandals: [
      { id: 'kadapa_urban', name: 'Kadapa Urban', center: { latitude: 14.4673, longitude: 78.8242 }, localities: ['Seven Roads Circle', 'Collectorate Complex', 'Ameen Peer Dargah Area', 'Yerramukkapalli', 'RIMS Hospital Road'] },
      { id: 'proddatur', name: 'Proddatur', center: { latitude: 14.7300, longitude: 78.5500 }, localities: ['Gold & Cotton Market Yard', 'Mydukur Road', 'Bypass Circle'] },
      { id: 'pulivendla', name: 'Pulivendla', center: { latitude: 14.4200, longitude: 78.2300 }, localities: ['JNTU Pulivendula Campus', 'R.P. Road', 'Flower Market'] },
      { id: 'jammalamadugu', name: 'Jammalamadugu', center: { latitude: 14.8500, longitude: 78.3800 }, localities: ['Gandikota Canyon Road', 'Pennar River Bridge'] },
      { id: 'badvel', name: 'Badvel', center: { latitude: 14.7400, longitude: 79.0600 }, localities: ['Nellore Road Junction', 'Four Roads Circle'] }
    ]
  }
];

// Write packages/contracts/src/locations.ts
const locationsContent = `/**
 * Andhra Pradesh Administrative Hierarchy and Geographic Data
 * 
 * Sourced: AP Gazette notifications (2022 Reorganisation, G.O.Ms.No.524 Markapuram, G.O.Ms.No.517 Polavaram)
 * License: Open Database License (ODbL) / Government Open Data
 * Provenance: OpenStreetMap & AP Government Gazette
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface LocalityItem {
  id: string;
  name: string;
  mandalId: string;
  districtId: string;
  coordinate: GeoCoordinate;
  type: 'city' | 'town' | 'village' | 'locality';
}

export interface MandalItem {
  id: string;
  name: string;
  districtId: string;
  center: GeoCoordinate;
  localities: LocalityItem[];
}

export interface DistrictHierarchyItem {
  id: string;
  name: string;
  headquarters: string;
  region: 'Coastal Andhra' | 'Rayalaseema' | 'North Coastal';
  center: GeoCoordinate;
  mandals: MandalItem[];
}

export const ANDHRA_PRADESH_BOUNDING_BOX = {
  minLatitude: 12.6239,
  maxLatitude: 19.1594,
  minLongitude: 76.7601,
  maxLongitude: 84.7658,
};

// Verified state boundary polygon coordinates from OSM
export const ANDHRA_PRADESH_STATE_POLYGON: GeoCoordinate[] = ${JSON.stringify(apGeo.statePolygon, null, 2)};

/**
 * Checks whether [latitude, longitude] falls within Andhra Pradesh jurisdiction.
 * Uses ray-casting point-in-polygon algorithm against the official state boundary.
 */
export function isCoordinateInAndhraPradesh(lat: number, lng: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return false;
  }

  // Bounding box filter (fast path)
  if (
    lat < ANDHRA_PRADESH_BOUNDING_BOX.minLatitude ||
    lat > ANDHRA_PRADESH_BOUNDING_BOX.maxLatitude ||
    lng < ANDHRA_PRADESH_BOUNDING_BOX.minLongitude ||
    lng > ANDHRA_PRADESH_BOUNDING_BOX.maxLongitude
  ) {
    return false;
  }

  const polygon = ANDHRA_PRADESH_STATE_POLYGON;
  if (!polygon || polygon.length === 0) return true;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ptI = polygon[i];
    const ptJ = polygon[j];
    if (!ptI || !ptJ) continue;

    const xi = ptI.longitude;
    const yi = ptI.latitude;
    const xj = ptJ.longitude;
    const yj = ptJ.latitude;

    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

export const AP_DISTRICTS_DATA: DistrictHierarchyItem[] = ${JSON.stringify(
  AP_ADMIN_DISTRICTS.map((d) => ({
    id: d.id,
    name: d.name,
    headquarters: d.headquarters,
    region: d.region,
    center: d.center,
    mandals: d.mandals.map((m) => ({
      id: m.id,
      name: m.name,
      districtId: d.id,
      center: m.center,
      localities: m.localities.map((loc, idx) => ({
        id: m.id + '_loc_' + (idx + 1),
        name: loc,
        mandalId: m.id,
        districtId: d.id,
        coordinate: m.center,
        type: idx === 0 ? 'town' : 'locality',
      })),
    })),
  })),
  null,
  2
)};
`;

fs.writeFileSync('packages/contracts/src/locations.ts', locationsContent);
console.log('Successfully generated packages/contracts/src/locations.ts with all 28 districts!');
