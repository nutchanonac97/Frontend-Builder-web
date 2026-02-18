// Mock data สำหรับแบบบ้าน – 100 entries
// budgetCategory: 'under5m' | '5to10m' | 'over10m'

// ─── Image pool (Unsplash, WebP) ───
const images = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80&fm=webp',
];

// ─── Templates per budget category ───
const templates = {
  under5m: [
    { title: 'บ้านชั้นเดียว สไตล์โมเดิร์น', floors: 1, style: 'โมเดิร์น', tags: ['ชั้นเดียว', 'ประหยัดพลังงาน', 'ครอบครัวเล็ก'], desc: 'บ้านชั้นเดียวดีไซน์ทันสมัย เน้นเส้นสายเรียบง่าย เหมาะสำหรับครอบครัวขนาดเล็ก พร้อมพื้นที่สวนรอบบ้าน' },
    { title: 'บ้านสองชั้น คอมแพ็ค', floors: 2, style: 'คอนเทมโพรารี่', tags: ['สองชั้น', 'คอมแพ็ค', 'ที่ดินแคบ'], desc: 'บ้านสองชั้นขนาดกะทัดรัด ใช้พื้นที่ดินน้อย ออกแบบให้ทุกตารางเมตรมีประโยชน์สูงสุด' },
    { title: 'บ้านชั้นเดียว ทรอปิคอล', floors: 1, style: 'ทรอปิคอล', tags: ['ชั้นเดียว', 'ระบายอากาศดี', 'ทรอปิคอล'], desc: 'บ้านชั้นเดียวสไตล์ทรอปิคอลโมเดิร์น หลังคาทรงสูง ระบายอากาศดี เหมาะกับอากาศเมืองไทย' },
    { title: 'บ้านสองชั้น มินิมอล', floors: 2, style: 'มินิมอล', tags: ['สองชั้น', 'มินิมอล', '4 ห้องนอน'], desc: 'บ้านสองชั้นดีไซน์มินิมอล เน้นเส้นสายเรียบง่าย วัสดุคุณภาพ พื้นที่ใช้สอยลงตัว' },
    { title: 'บ้านชั้นเดียว สไตล์ญี่ปุ่น', floors: 1, style: 'มินิมอล', tags: ['ชั้นเดียว', 'Japanese Style', 'Zen Garden'], desc: 'บ้านชั้นเดียวสไตล์มูจิ เน้นวัสดุไม้ธรรมชาติ พื้นที่โปร่งโล่ง เชื่อมต่อกับสวนญี่ปุ่น' },
    { title: 'ทาวน์โฮม Industrial', floors: 2, style: 'โมเดิร์น', tags: ['สองชั้น', 'Industrial', 'Loft'], desc: 'ทาวน์โฮม 2 ชั้นสไตล์ Industrial Loft ผนังอิฐโชว์แนว เหล็กดำ คอนกรีตเปลือย ดีไซน์เท่' },
    { title: 'บ้านชั้นเดียว Farmhouse', floors: 1, style: 'คลาสสิค', tags: ['ชั้นเดียว', 'Farmhouse', 'ระเบียงกว้าง'], desc: 'บ้านชั้นเดียว Modern Farmhouse หลังคาจั่ว ระเบียงกว้าง บรรยากาศอบอุ่นแบบชนบท' },
    { title: 'บ้านสองชั้น Box House', floors: 2, style: 'โมเดิร์น', tags: ['สองชั้น', 'Box House', 'กระจกบานใหญ่'], desc: 'บ้านสองชั้นทรงกล่อง เส้นสายตรง หน้าต่างกระจกบานใหญ่ รับแสงธรรมชาติเต็มที่' },
    { title: 'บ้านชั้นเดียว Eco Living', floors: 1, style: 'โมเดิร์น', tags: ['ชั้นเดียว', 'Eco', 'ประหยัดไฟ'], desc: 'บ้านชั้นเดียวรักษ์โลก ฉนวนกันร้อน หลังคาเขียว ลดพลังงานไฟฟ้า ค่าแอร์ลดลง 40%' },
    { title: 'บ้านสองชั้น สแกนดิเนเวียน', floors: 2, style: 'นอร์ดิก', tags: ['สองชั้น', 'Nordic', 'ไม้สน'], desc: 'บ้านสองชั้นสไตล์นอร์ดิก โทนสีขาว-ไม้สน ผ้าทอมือ บรรยากาศอบอุ่นน่าอยู่' },
  ],
  '5to10m': [
    { title: 'บ้านสองชั้น โมเดิร์นลักซ์', floors: 2, style: 'โมเดิร์น', tags: ['สองชั้น', 'พื้นที่กว้าง', 'Home Office'], desc: 'บ้านสองชั้นสไตล์โมเดิร์นหรูหรา พื้นที่กว้างขวาง พร้อมห้องทำงานและห้องออกกำลังกาย' },
    { title: 'พูลวิลล่า คอนเทมโพรารี่', floors: 1, style: 'คอนเทมโพรารี่', tags: ['Pool Villa', 'ชั้นเดียว', 'Open Plan'], desc: 'พูลวิลล่าชั้นเดียว พร้อมสระว่ายน้ำส่วนตัว ห้องนอนใหญ่วิวสระ เปิดโล่งเชื่อมต่อธรรมชาติ' },
    { title: 'บ้านสามชั้น สแกนดิเนเวียน', floors: 3, style: 'นอร์ดิก', tags: ['สามชั้น', 'Scandinavian', 'Rooftop'], desc: 'บ้านสามชั้นสไตล์นอร์ดิก ใช้ไม้ธรรมชาติ โทนสีอบอุ่น พร้อมดาดฟ้าชมวิว' },
    { title: 'บ้านคลาสสิค ยูโรเปียน', floors: 2, style: 'คลาสสิค', tags: ['คลาสสิค', 'European', 'สวนสวย'], desc: 'บ้านสองชั้นสไตล์คลาสสิคยูโรเปียน หลังคาจั่วซ้อน ผนังหินศิลาแลง สวนสไตล์อังกฤษ' },
    { title: 'บ้านสองชั้น Mediterranean', floors: 2, style: 'คลาสสิค', tags: ['Mediterranean', 'ซุ้มโค้ง', 'สนามหญ้า'], desc: 'บ้านสไตล์เมดิเตอร์เรเนียน หลังคากระเบื้องดินเผา ผนังปูนขัดมัน ซุ้มโค้ง สนามหญ้า' },
    { title: 'โฮมออฟฟิศ ทรอปิคอล', floors: 2, style: 'ทรอปิคอล', tags: ['Home Office', 'ทรอปิคอล', 'SME'], desc: 'บ้านพร้อมออฟฟิศ ชั้นล่างเป็นสำนักงาน ชั้นบนเป็นที่พัก สไตล์ทรอปิคอลร่มรื่น' },
    { title: 'บ้านสองชั้น Art Deco', floors: 2, style: 'คลาสสิค', tags: ['Art Deco', 'หรูหรา', 'สระว่ายน้ำ'], desc: 'บ้านสไตล์ Art Deco สุดหรู ลวดลายเรขาคณิต สีทอง-ดำ-ขาว พร้อมสระว่ายน้ำ' },
    { title: 'กรีนเฮ้าส์ ประหยัดพลังงาน', floors: 2, style: 'โมเดิร์น', tags: ['Green House', 'Solar', 'ประหยัดพลังงาน'], desc: 'บ้านประหยัดพลังงาน Solar Rooftop ระบบน้ำรีไซเคิล ฉนวนกันร้อน ลดค่าไฟ 60%' },
    { title: 'บ้านสองชั้น ทรอปิคอลลักซ์', floors: 2, style: 'ทรอปิคอล', tags: ['ทรอปิคอล', 'Luxury', 'Garden'], desc: 'บ้านสองชั้นทรอปิคอลหรู สวนเขตร้อนรอบบ้าน ห้องนอนเปิดรับลม ครัวไทย-ฝรั่ง' },
    { title: 'บ้านสองชั้น มินิมอล ลักซ์', floors: 2, style: 'มินิมอล', tags: ['มินิมอล', 'Luxury', 'Courtyard'], desc: 'บ้านมินิมอลหรู คอร์ทยาร์ดกลางบ้าน ช่องแสง skylight วัสดุพรีเมียม' },
  ],
  over10m: [
    { title: 'Luxury Pool Villa', floors: 2, style: 'ลักซ์ชัวรี่', tags: ['Luxury', 'Smart Home', 'Infinity Pool'], desc: 'ลักซ์ชัวรี่พูลวิลล่า สระว่ายน้ำ Infinity พร้อมระบบ Smart Home ครบครัน' },
    { title: 'Modern Mansion', floors: 3, style: 'โมเดิร์น', tags: ['Mansion', 'ลิฟต์ส่วนตัว', 'Home Theater'], desc: 'คฤหาสน์สไตล์โมเดิร์น 3 ชั้น พร้อมลิฟต์ส่วนตัว โรงหนังในบ้าน สระว่ายน้ำ' },
    { title: 'Tropical Resort Villa', floors: 2, style: 'ทรอปิคอล', tags: ['Resort Style', 'Spa', 'Garden'], desc: 'วิลล่าสไตล์ทรอปิคอลรีสอร์ท กลางสวนสวย พร้อมศาลาพักผ่อน สปาส่วนตัว' },
    { title: 'Ultra Luxury Estate', floors: 3, style: 'ลักซ์ชัวรี่', tags: ['Ultra Luxury', 'Wine Cellar', 'Golf'], desc: 'คฤหาสน์สุดหรู พร้อมสนามกอล์ฟจำลอง ห้องไวน์ และสระว่ายน้ำโอลิมปิก' },
    { title: 'Penthouse Villa', floors: 3, style: 'โมเดิร์น', tags: ['Penthouse', 'Sky Lounge', 'Jacuzzi'], desc: 'วิลล่า 3 ชั้น ชั้นบนสุดเป็น Sky Lounge วิวพาโนรามา 360 องศา พร้อม Jacuzzi' },
    { title: 'Smart Home Villa', floors: 2, style: 'โมเดิร์น', tags: ['Smart Home', 'AI Security', 'Voice Control'], desc: 'บ้าน Smart Home เต็มระบบ สั่งงานด้วยเสียง ระบบรักษาความปลอดภัย AI' },
    { title: 'Waterfront Villa', floors: 2, style: 'ทรอปิคอล', tags: ['Waterfront', 'ท่าเรือส่วนตัว', 'Infinity Pool'], desc: 'วิลล่าริมน้ำ ท่าเรือส่วนตัว สระว่ายน้ำ Infinity Edge วิวแม่น้ำกว้าง' },
    { title: 'Royal Palace Estate', floors: 3, style: 'ลักซ์ชัวรี่', tags: ['Royal Estate', 'สนามเทนนิส', 'Ballroom'], desc: 'คฤหาสน์ระดับ Royal สนามเทนนิส สระว่ายน้ำขนาดโอลิมปิก ห้องจัดเลี้ยง' },
    { title: 'Hillside Villa', floors: 2, style: 'โมเดิร์น', tags: ['Hillside', 'วิวภูเขา', 'Cantilevered'], desc: 'วิลล่าบนเนินเขา โครงสร้างยื่นเหนือหน้าผา วิวภูเขา 180 องศา กระจกแบบ Floor-to-ceiling' },
    { title: 'Beachfront Mansion', floors: 2, style: 'ทรอปิคอล', tags: ['Beachfront', 'Private Beach', 'Cabana'], desc: 'คฤหาสน์ริมทะเล ชายหาดส่วนตัว ศาลาริมทะเล สระว่ายน้ำล้นขอบ วิวพระอาทิตย์ตก' },
  ],
};

// ─── Price / Size ranges per budget ───
const ranges = {
  under5m: { priceMin: 2500000, priceMax: 4900000, sizeMin: 100, sizeMax: 200, bedMin: 2, bedMax: 4, bathMin: 1, bathMax: 3 },
  '5to10m': { priceMin: 5000000, priceMax: 9900000, sizeMin: 220, sizeMax: 400, bedMin: 3, bedMax: 5, bathMin: 3, bathMax: 5 },
  over10m: { priceMin: 10000000, priceMax: 50000000, sizeMin: 400, sizeMax: 1200, bedMin: 4, bedMax: 8, bathMin: 4, bathMax: 10 },
};

const formatPrice = (p) => {
  if (p >= 10000000) return `${(p / 1000000).toFixed(0)} ล้านบาท`;
  return `${(p / 1000000).toFixed(1)} ล้านบาท`;
};

// ─── Generate 100 plans ───
const budgetKeys = ['under5m', '5to10m', 'over10m'];
const planCounts = { under5m: 35, '5to10m': 35, over10m: 30 };

const housePlans = [];
let id = 1;

// Use a seed-like approach for consistent randomness
const seededRand = (seed, min, max) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  const r = x - Math.floor(x);
  return Math.floor(min + r * (max - min + 1));
};

for (const budget of budgetKeys) {
  const { priceMin, priceMax, sizeMin, sizeMax, bedMin, bedMax } = ranges[budget];
  const tpls = templates[budget];
  const count = planCounts[budget];

  for (let i = 0; i < count; i++) {
    const tpl = tpls[i % tpls.length];
    const seed = id * 137;

    const price = Math.round((priceMin + ((priceMax - priceMin) * i) / (count - 1)) / 100000) * 100000;
    const size = Math.round((sizeMin + ((sizeMax - sizeMin) * i) / (count - 1)) / 10) * 10;
    const bedrooms = seededRand(seed + 1, bedMin, bedMax);
    const bathrooms = seededRand(seed + 2, Math.max(1, bedrooms - 1), bedrooms + 1);
    const imgIdx = (id - 1) % images.length;

    housePlans.push({
      id,
      title: i < tpls.length ? tpl.title : `${tpl.title} V.${Math.floor(i / tpls.length) + 1}`,
      price,
      priceLabel: formatPrice(price),
      budgetCategory: budget,
      floors: tpl.floors,
      size,
      sizeLabel: size >= 1000 ? `${size.toLocaleString()} ตร.ม.` : `${size} ตร.ม.`,
      bedrooms,
      bathrooms,
      style: tpl.style,
      image: images[imgIdx],
      description: tpl.desc,
      tags: tpl.tags,
    });
    id++;
  }
}

// Budget categories สำหรับ filter
export const budgetCategories = [
  { slug: 'all', label: 'ทั้งหมด' },
  { slug: 'under5m', label: 'ไม่เกิน 5 ล้าน' },
  { slug: '5to10m', label: '5-10 ล้าน' },
  { slug: 'over10m', label: '10 ล้านขึ้นไป' },
];

export const floorOptions = [
  { value: 1, label: '1 ชั้น' },
  { value: 2, label: '2 ชั้น' },
  { value: 3, label: '3 ชั้น' },
];

export const sizeRanges = [
  { slug: 'under200', label: 'ไม่เกิน 200 ตร.ม.', min: 0, max: 200 },
  { slug: '200to400', label: '200-400 ตร.ม.', min: 200, max: 400 },
  { slug: '400to600', label: '400-600 ตร.ม.', min: 400, max: 600 },
  { slug: 'over600', label: '600 ตร.ม. ขึ้นไป', min: 600, max: Infinity },
];

export const styleOptions = [
  { slug: 'โมเดิร์น', label: 'โมเดิร์น' },
  { slug: 'คอนเทมโพรารี่', label: 'คอนเทมโพรารี่' },
  { slug: 'ทรอปิคอล', label: 'ทรอปิคอล' },
  { slug: 'มินิมอล', label: 'มินิมอล' },
  { slug: 'นอร์ดิก', label: 'นอร์ดิก' },
  { slug: 'คลาสสิค', label: 'คลาสสิค' },
  { slug: 'ลักซ์ชัวรี่', label: 'ลักซ์ชัวรี่' },
];

export default housePlans;
