import { AiPoweredExecutiveBriefingInput } from '@/ai/flows/ai-powered-executive-briefing';

export const dashboardData: AiPoweredExecutiveBriefingInput = {
  ordersInFlight: 1485,
  onTimeDeliveryPercentage: 89.2,
  acceptedValueMTD: 62400000,
  revenueAtRisk: 12400000,
  acceptancePending: 184,
  pastDueBacklog: 72,
  weeklyExecutionTrendDescription: "تحسن ملحوظ في سرعة التنفيذ لمشاريع الألياف البصرية للشركات (B2B Fiber)، ولكن هناك تباطؤ بسبب فترات توريد المعدات في قطاع الأمن المدار.",
  portfolioStatusDistributionDescription: "72% قيد التنفيذ المخطط، 18% تحت المخاطرة (تصاريح وسلاسل إمداد)، 10% تأخير حرج.",
  revenueAtRiskByFamily: [
    { family: "سلام للألياف البصرية B2B", revenue: 4500000 },
    { family: "الإنترنت المخصص (DIA)", revenue: 3100000 },
    { family: "الشبكات المدارة VPN/SD-WAN", revenue: 2800000 },
    { family: "السحابة ومراكز البيانات", revenue: 2000000 },
  ],
  topAtRiskAccounts: [
    { accountName: "وزارة الداخلية (إقليمي)", riskReason: "عقبات في تصاريح دخول الموقع", revenueImpact: 3500000 },
    { accountName: "تطوير نيوم (المنطقة C)", riskReason: "ظروف جوية قاسية تؤثر على الأعمال المدنية", revenueImpact: 2800000 },
    { accountName: "البحر الأحمر الدولية (المرحلة 1)", riskReason: "تأخير شحن الأجهزة (وحدات سيسكو)", revenueImpact: 2400000 },
    { accountName: "مشروع أرامكو للتنقيب", riskReason: "نقص موارد اختبارات القبول النهائية", revenueImpact: 1900000 },
  ],
  immediateInterventionQueue: [
    "تحويل ألياف مترو جدة: تصعيد النزاع البلدي لنائب الرئيس للعمليات.",
    "توسعة مركز بيانات الرياض: الحاجة لموافقة على تجاوز طارئ لنظام UPS.",
    "منطقة نيوم C: طلب نشر وحدات أقمار صناعية متنقلة كحل مؤقت.",
    "تفعيل خدمات B2C (الدمام): تفعيل فريق عمل لتقليل المتراكم."
  ],
};

export const executionTrendChartData = [
  { week: 'أسبوع 34', deliveries: 125, target: 130 },
  { week: 'أسبوع 35', deliveries: 138, target: 135 },
  { week: 'أسبوع 36', deliveries: 132, target: 140 },
  { week: 'أسبوع 37', deliveries: 145, target: 145 },
  { week: 'أسبوع 38', deliveries: 158, target: 150 },
  { week: 'أسبوع 39', deliveries: 162, target: 155 },
];

export const portfolioDistributionData = [
  { name: 'في المسار', value: 72, fill: 'hsl(var(--chart-1))' },
  { name: 'تحت المخاطرة', value: 18, fill: 'hsl(var(--chart-2))' },
  { name: 'متأخر', value: 10, fill: 'hsl(var(--destructive))' },
];

export const bookingFulfillmentData = {
  newOrdersMTD: 342,
  cancelledOrdersMTD: 12,
  averageBookingToBillingDays: 24.5,
  throughputByRegion: [
    { region: "الوسطى", volume: 145, growth: "+12%" },
    { region: "الغربية", volume: 98, growth: "+5%" },
    { region: "الشرقية", volume: 76, growth: "-2%" },
    { region: "الجنوبية", volume: 23, growth: "+18%" },
  ]
};

export const deliveryMilestones = [
  { stage: "مسح الموقع", count: 420, status: "completed" },
  { stage: "الأعمال المدنية", count: 310, status: "in-progress" },
  { stage: "تركيب المعدات", count: 245, status: "pending" },
  { stage: "اختبارات القبول (UAT)", count: 184, status: "at-risk" },
];

export const strategicOrders = [
  { id: "SO-9901", account: "وزارة الطاقة", service: "Managed SD-WAN", value: "4.2M", progress: 65, status: "On Track" },
  { id: "SO-9904", account: "صندوق الاستثمارات العامة", service: "Data Center Hosting", value: "8.5M", progress: 40, status: "At Risk" },
  { id: "SO-9912", account: "شركة الاتصالات السعودية (جملة)", service: "International Capacity", value: "12M", progress: 90, status: "On Track" },
];

export const b2cSnapshotData = {
  activeHomeFiberSubs: 84200,
  pendingInstallations: 3100,
  averageTimeToInstall: 4.2, // days
  customerSatisfactionScore: 4.6, // out of 5
  areaPerformance: [
    { area: "الملقا (الرياض)", demand: "مرتفع جداً", status: "تحت السيطرة" },
    { area: "الروضة (جدة)", demand: "متوسط", status: "تحسن في المواعيد" },
    { area: "الفيصلية (الدمام)", demand: "مرتفع", status: "نقص في الفنيين" },
  ]
};

export const explorerData = [
  { id: "PRJ-001", name: "ربط فروع البنك الأهلي", region: "وطني", segment: "بنوك", status: "نشط" },
  { id: "PRJ-002", name: "توسعة ألياف ينبع الصناعية", region: "الغربية", segment: "صناعي", status: "تأخير" },
  { id: "PRJ-003", name: "مشروع سحابة الصحة", region: "الوسطى", segment: "حكومي", status: "نشط" },
  { id: "PRJ-004", name: "تغطية حي النرجس FTTH", region: "الوسطى", segment: "أفراد", status: "مكتمل" },
];

export const escalationData = [
  { id: "ESC-1024", severity: "عالية", age: "48 ساعة", status: "قيد المعالجة", subject: "فشل في نظام NAT في العقدة المركزية" },
  { id: "ESC-1025", severity: "حرجة", age: "12 ساعة", status: "تم التعيين", subject: "قطع في ألياف العمود الفقري لنيوم - الإصلاح جارٍ" },
  { id: "ESC-1028", severity: "متوسطة", age: "72 ساعة", status: "بانتظار العميل", subject: "تأخير في توجيه MPLS لأرامكو" },
  { id: "ESC-1030", severity: "عالية", age: "24 ساعة", status: "تم التعيين", subject: "بطء في بوابة B2B للحسابات الكبرى" },
];
