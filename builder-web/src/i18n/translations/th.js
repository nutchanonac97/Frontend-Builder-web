const th = {
  // ─── Navbar ───
  nav: {
    home: 'หน้าแรก',
    services: 'บริการ',
    portfolio: 'ผลงาน',
    plans: 'แบบบ้าน',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อเรา',
  },

  // ─── Services Page ───
  services: {
    hero: {
      badge: 'Crystal Bridge Construction',
      title1: 'สร้างทุกฝัน',
      title2: 'ให้เป็นจริง',
      subtitle: 'บริการรับสร้างบ้าน รีสอร์ท โรงแรม และอาคารพาณิชย์',
      subtitle2: 'ด้วยมาตรฐานระดับพรีเมียม',
      scrollDown: 'เลื่อนลงดูบริการ',
    },
    stats: {
      projects: 'โปรเจ็คสำเร็จ',
      experience: 'ปีประสบการณ์',
      satisfaction: 'ลูกค้าพึงพอใจ',
      warranty: 'ปีรับประกัน',
    },
    items: [
      {
        title: 'บ้านพักอาศัย',
        subtitle: 'Residential',
        tagline: 'สร้างบ้านที่เป็นมากกว่าที่พักอาศัย',
        description: 'ออกแบบและก่อสร้างบ้านในฝันของคุณ ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ',
        features: ['ออกแบบตามไลฟ์สไตล์', 'วัสดุพรีเมียม', 'ประกัน 10 ปี'],
      },
      {
        title: 'รีสอร์ท & โรงแรม',
        subtitle: 'Resort & Hotel',
        tagline: 'สร้างประสบการณ์พักผ่อนระดับโลก',
        description: 'ออกแบบและก่อสร้างรีสอร์ท โรงแรม ที่ผสมผสานความหรูหราและธรรมชาติ',
        features: ['Interior Design รวม', 'Landscape Design', 'ระบบ Smart Hotel'],
      },
      {
        title: 'บ้านลอยน้ำ',
        subtitle: 'Floating House',
        tagline: 'นวัตกรรมที่พักริมน้ำแห่งอนาคต',
        description: 'บ้านลอยน้ำที่แข็งแรง ทนทาน ออกแบบให้เหมาะกับวิถีชีวิตริมน้ำ',
        features: ['ลอยน้ำได้จริง', 'วัสดุกันน้ำ 100%', 'พลังงานโซลาร์'],
      },
      {
        title: 'อาคารพาณิชย์',
        subtitle: 'Commercial Building',
        tagline: 'สร้างพื้นที่ธุรกิจที่น่าจดจำ',
        description: 'ออกแบบและก่อสร้างอาคารพาณิชย์ ออฟฟิศ ร้านค้า โกดังและโรงงาน',
        features: ['แบบมาตรฐาน อบต.', 'ระบบ MEP ครบ', 'ส่งมอบตรงเวลา'],
      },
      {
        title: 'บ้านสำเร็จรูป',
        subtitle: 'Prefabricated House',
        tagline: 'บ้านคุณภาพ สร้างเร็ว ราคาคุ้ม',
        description: 'บ้านสำเร็จรูปที่ผลิตจากโรงงาน ติดตั้งรวดเร็ว ประหยัดเวลา',
        features: ['สร้างเสร็จ 45 วัน', 'ราคาคงที่', 'เลือกแบบได้'],
      },
    ],
    section: {
      viewWork: 'ดูผลงาน',
      watchVideo: 'ดูวิดีโอ',
      latestProject: 'ผลงานล่าสุด',
      projectLabel: 'โปรเจ็ค',
      location: 'กรุงเทพฯ และปริมณฑล',
      projectsCompleted: 'โปรเจ็คสำเร็จ',
      satisfactionLabel: 'ความพึงพอใจ',
    },
    cta: {
      badge: 'ปรึกษาฟรี 24 ชั่วโมง',
      title1: 'พร้อมเริ่มสร้าง',
      title2: 'บ้านในฝันแล้วหรือยัง?',
      subtitle1: 'ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด',
      subtitle2: 'ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษา',
      startProject: 'เริ่มต้นโปรเจ็คของคุณ',
      phone: '083-892-4659',
      trustWarranty: 'รับประกัน 10 ปี',
      trustISO: 'มาตรฐาน ISO',
      trustClients: '500+ ลูกค้าไว้วางใจ',
    },
    footer: {
      companyDesc: 'บริษัท รับสร้างบ้าน รับเหมาก่อสร้าง',
      companyDesc2: 'ที่คุณไว้วางใจมากว่า 15 ปี',
      contactTitle: 'ติดต่อเรา',
      socialTitle: 'SOCIAL MEDIA',
      linksTitle: 'ID & LINKS',
      licenseNo: 'ใบอนุญาตเลขที่: 12/4829',
      regNo: 'เลขที่จดทะเบียน: 0915764',
      requestQuote: 'ขอใบเสนอราคา',
      copyright: '© 2026 Crystal Bridge Co., Ltd. สงวนลิขสิทธิ์',
    },
  },

  // ─── Portfolio Page ───
  portfolio: {
    beforeLabel: '3D Render',
    afterLabel: 'ผลงานจริง',
    viewDetails: 'ดูรายละเอียด',
    interestedBtn: 'สนใจโครงการแบบนี้',
    area: 'พื้นที่',
    budget: 'งบประมาณ',
    duration: 'ระยะเวลา',
    completed: 'ปีที่เสร็จ',
    stats: {
      projects: 'โครงการสำเร็จ',
      satisfaction: 'ความพึงพอใจ',
      experience: 'ปีประสบการณ์',
      team: 'ทีมผู้เชี่ยวชาญ',
    },
    section: {
      title: 'ผลงานทั้งหมด',
      subtitle: 'สำรวจโครงการบ้าน รีสอร์ท และอาคารที่เราได้สร้างสรรค์',
    },
    categories: ['ทั้งหมด', 'บ้าน', 'รีสอร์ท', 'บ้านลอยน้ำ', 'อาคารพาณิชย์'],
    cta: {
      title: 'พร้อมสร้างบ้านในฝันของคุณ?',
      subtitle: 'ปรึกษาทีมออกแบบของเราฟรี พร้อมรับแคตตาล็อกแบบบ้านกว่า 200+ แบบ',
      consult: 'นัดหมายปรึกษาฟรี',
      catalog: 'ดาวน์โหลดแคตตาล็อก',
    },
    projects: [
      {
        title: 'Modern Luxury Villa',
        category: 'บ้าน',
        location: 'กรุงเทพมหานคร',
        size: '450 ตร.ม.',
        budget: '12.5 ล้านบาท',
        duration: '8 เดือน',
        description: 'บ้านหรูสไตล์โมเดิร์นมินิมอล 5 ห้องนอน 6 ห้องน้ำ พร้อมสระว่ายน้ำ infinity และสวนลอยฟ้า ออกแบบเพื่อการใช้ชีวิตแบบ Smart Living',
        testimonial: {
          text: 'ทีมงานมืออาชีพมาก ตั้งแต่ขั้นตอนออกแบบจนถึงส่งมอบ ผลงานออกมาเกินความคาดหวัง',
          author: 'คุณสมชาย',
          role: 'เจ้าของบ้าน',
        },
      },
      {
        title: 'Khao Yai Mountain Resort',
        category: 'รีสอร์ท',
        location: 'นครราชสีมา',
        size: '2,500 ตร.ม.',
        budget: '65 ล้านบาท',
        duration: '14 เดือน',
        description: 'รีสอร์ทส่วนตัวกลางหุบเขา 12 ห้องพัก พร้อมร้านอาหาร สปา และ infinity pool วิวภูเขา 360 องศา',
        testimonial: {
          text: 'รีสอร์ทที่สวยที่สุดที่เคยเห็น ทุกรายละเอียดพิถีพิถัน ลูกค้าชื่นชมตลอด',
          author: 'คุณวิภา',
          role: 'เจ้าของกิจการ',
        },
      },
      {
        title: 'Beachfront Pool Villa',
        category: 'บ้าน',
        location: 'หัวหิน',
        size: '380 ตร.ม.',
        budget: '15 ล้านบาท',
        duration: '10 เดือน',
        description: 'พูลวิลล่าริมทะเล 4 ห้องนอน สไตล์ทรอปิคอลโมเดิร์น พร้อมสระว่ายน้ำส่วนตัวและระเบียงชมวิวทะเล',
        testimonial: {
          text: 'ตื่นมาเห็นทะเลทุกเช้า บ้านในฝันที่เป็นจริง ขอบคุณทีมงานมาก',
          author: 'คุณนิดา',
          role: 'เจ้าของบ้าน',
        },
      },
      {
        title: 'Floating Paradise',
        category: 'บ้านลอยน้ำ',
        location: 'กาญจนบุรี',
        size: '180 ตร.ม.',
        budget: '6.8 ล้านบาท',
        duration: '6 เดือน',
        description: 'บ้านลอยน้ำดีไซน์ล้ำสมัย กลางอ่างเก็บน้ำ วิวภูเขา พร้อมระบบพลังงานแสงอาทิตย์และบำบัดน้ำเสีย',
      },
      {
        title: 'Nordic Forest Home',
        category: 'บ้าน',
        location: 'เชียงใหม่',
        size: '320 ตร.ม.',
        budget: '8.5 ล้านบาท',
        duration: '9 เดือน',
        description: 'บ้านสไตล์สแกนดิเนเวียนกลางป่าสน ออกแบบเพื่อความยั่งยืนด้วยวัสดุท้องถิ่น พลังงานแสงอาทิตย์',
      },
      {
        title: 'Urban Commercial Hub',
        category: 'อาคารพาณิชย์',
        location: 'ชลบุรี',
        size: '1,200 ตร.ม.',
        budget: '25 ล้านบาท',
        duration: '12 เดือน',
        description: 'อาคารพาณิชย์ 5 ชั้น ดีไซน์ทันสมัย พร้อมพื้นที่ค้าปลีก สำนักงาน และที่พักอาศัย',
      },
    ],
  },

  // ─── Language ───
  lang: {
    thai: 'ไทย',
    english: 'English',
  },

  // ─── Theme ───
  theme: {
    dark: 'เปลี่ยนเป็นโหมดมืด',
    light: 'เปลี่ยนเป็นโหมดสว่าง',
  },
};

export default th;
