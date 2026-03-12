export type GuideLanguage = 'en' | 'ar';

export type GuideRouteSummary = Readonly<{
  title: string;
  url: string;
  purpose: string;
  proof: string;
  leadershipQuestion: Readonly<{
    en: string;
    ar: string;
  }>;
  presentationSteps: Readonly<{
    en: readonly string[];
    ar: readonly string[];
  }>;
}>;

export const controlTowerGuideName = 'Executive Desk';

const executiveSignals = {
  ordersInFlight: '1,485',
  onTimeDelivery: '89.2%',
  revenueAtRisk: '12.4M SAR',
  acceptancePending: '184',
  pastDueBacklog: '72',
  topAccounts: 'PIF hosting, NEOM backbone, MoI secure VPN, and Jeddah Airport Fiber Ring',
} as const;

export const guideRouteSummaries: readonly GuideRouteSummary[] = [
  {
    title: 'Executive Overview',
    url: '/',
    purpose:
      'Starts the story with portfolio posture, revenue exposure, intervention demand, and the overall operating signal.',
    proof:
      'Shows leadership posture first, then points directly to where intervention changes the outcome.',
    leadershipQuestion: {
      en: 'What is happening across the portfolio right now, what is exposed, and where should leadership intervene first?',
      ar: 'ما الذي يحدث على مستوى المحفظة الآن، وما حجم التعرض، وأين يجب أن يبدأ تدخل الإدارة أولاً؟',
    },
    presentationSteps: {
      en: [
        `Open with the three signals that matter most: ${executiveSignals.onTimeDelivery} on-time delivery, ${executiveSignals.revenueAtRisk} revenue at risk, and ${executiveSignals.ordersInFlight} live orders.`,
        'Use the risk and intervention sections to show what needs sponsor attention this week, not just what happened historically.',
        'Move next to Delivery Control Tower to prove how a portfolio signal becomes one owner, one decision window, and one expected impact.',
      ],
      ar: [
        `ابدأ بالإشارات الثلاث الأهم: ${executiveSignals.onTimeDelivery} التزام بالتسليم، ${executiveSignals.revenueAtRisk} إيراد معرّض، و${executiveSignals.ordersInFlight} طلبًا نشطًا.`,
        'استخدم أقسام المخاطر والتدخلات لتوضيح ما يحتاج رعاية الإدارة هذا الأسبوع، لا مجرد استعراض تاريخي للأداء.',
        'بعدها انتقل إلى Delivery Control Tower لإثبات كيف تتحول الإشارة العامة إلى مالك واضح وقرار بزمن محدد وأثر متوقع.',
      ],
    },
  },
  {
    title: 'VP Briefing',
    url: '/briefing',
    purpose:
      'Condenses the control tower into one meeting-ready page for sponsor reviews, printouts, and VP-level portfolio posture.',
    proof:
      'Shows that the product can switch from operating console to concise executive brief without losing decision ownership.',
    leadershipQuestion: {
      en: 'If leadership has only one page and five minutes, what should be decided now and why should they trust it?',
      ar: 'إذا كان لدى الإدارة صفحة واحدة وخمس دقائق فقط، فما الذي يجب حسمه الآن ولماذا يمكن الوثوق به؟',
    },
    presentationSteps: {
      en: [
        'Use this page when the audience wants the shortest path from portfolio signal to owner-backed action.',
        'Frame the page as a leadership pack, not an analyst workspace.',
        'Use it to prove that the product supports the meeting room as well as day-to-day operations.',
      ],
      ar: [
        'استخدم هذه الصفحة عندما يريد الجمهور أقصر طريق من الإشارة إلى الإجراء بمالك واضح.',
        'قدّمها كحزمة قيادة تنفيذية لا كمساحة عمل تحليلية.',
        'استخدمها لإثبات أن المنتج يخدم غرفة الاجتماع كما يخدم التشغيل اليومي.',
      ],
    },
  },
  {
    title: 'Delivery Control Tower',
    url: '/delivery',
    purpose:
      'Turns operational slippage into named decisions, accountable owners, and short intervention windows.',
    proof:
      'Demonstrates execution control, recovery discipline, and the difference between visibility and actual management.',
    leadershipQuestion: {
      en: 'Where is delivery slipping now, who owns the fix, and what decision window still changes the outcome?',
      ar: 'أين يتعثر التنفيذ الآن، من يملك المعالجة، وما نافذة القرار التي ما زالت قادرة على تغيير النتيجة؟',
    },
    presentationSteps: {
      en: [
        'Select one focus brief and frame it as a management decision, not a project status update.',
        'Call out the accountable owner, the decision window, and the commercial or customer impact if leadership acts now.',
        'Use this page to prove that the dashboard is designed for intervention, not passive reporting.',
      ],
      ar: [
        'اختر Focus Brief واحدًا وقدمه كقرار إداري وليس كتحديث مشروع تقليدي.',
        'اذكر بوضوح المالك، نافذة القرار، والأثر التجاري أو التشغيلي إذا تم التدخل الآن.',
        'هذه الصفحة هي الدليل على أن الداشبورد مبني للتدخل الفعلي وليس للمراقبة السلبية.',
      ],
    },
  },
  {
    title: 'Strategic Orders',
    url: '/strategic',
    purpose:
      'Focuses on high-value orders where delivery slippage quickly becomes revenue timing or confidence risk.',
    proof:
      'Shows commercial judgment and executive prioritization, not only service tracking.',
    leadershipQuestion: {
      en: 'Which strategic orders matter most right now, and what must leadership protect before revenue or customer confidence moves off plan?',
      ar: 'ما الطلبات الاستراتيجية الأهم الآن، وما الذي يجب أن تحميه الإدارة قبل أن يتأثر الإيراد أو ثقة العميل؟',
    },
    presentationSteps: {
      en: [
        'Use one strategic order to show that the problem is not volume, but consequence.',
        'Highlight how the page separates high-value exposure from normal delivery noise.',
        'Position this view as the revenue-protection layer of the control tower.',
      ],
      ar: [
        'استخدم طلبًا استراتيجيًا واحدًا لتوضيح أن القضية هنا ليست حجم العمل بل أثره.',
        'أظهر كيف تفصل الصفحة بين التعرض عالي القيمة وبين ضوضاء التنفيذ اليومية.',
        'قدّم هذه الصفحة كطبقة حماية الإيراد داخل منظومة التحكم.',
      ],
    },
  },
  {
    title: 'Portfolio Explorer',
    url: '/explorer',
    purpose:
      'Lets the audience drill from portfolio level to one project, account, or focus brief with searchable context.',
    proof:
      'Proves the product supports analysis, case-based review, and accountable conversations.',
    leadershipQuestion: {
      en: 'Can leadership move from a portfolio signal to one accountable case without losing context?',
      ar: 'هل تستطيع الإدارة الانتقال من إشارة على مستوى المحفظة إلى حالة واحدة مسؤولة دون فقدان السياق؟',
    },
    presentationSteps: {
      en: [
        'Search for one exposed account or project and open the detail brief immediately.',
        'Use the case to show that the dashboard supports decision review, not only aggregate KPIs.',
        'Position this view as the bridge between executive posture and project-level accountability.',
      ],
      ar: [
        'ابحث عن حساب أو مشروع معرّض وافتح brief التفصيل مباشرة.',
        'استخدم الحالة لتثبت أن الداشبورد يدعم مراجعة القرار وليس فقط مؤشرات مجمعة.',
        'قدّم هذه الصفحة كجسر بين النظرة التنفيذية العامة والمساءلة على مستوى الحالة.',
      ],
    },
  },
  {
    title: 'Data Governance',
    url: '/methodology',
    purpose:
      'Explains KPI ownership, thresholds, review forums, and how the numbers stay governable.',
    proof:
      'Answers the credibility question before it is asked by showing governance, ownership, and review rhythm.',
    leadershipQuestion: {
      en: 'Why should leadership trust these numbers and act on them?',
      ar: 'لماذا يجب أن تثق الإدارة بهذه الأرقام وتبني عليها قراراتها؟',
    },
    presentationSteps: {
      en: [
        'Use this page to show that every KPI has a source, owner, threshold, and review forum.',
        'Make it clear that governance is built into the product, not added as a slide after the fact.',
        'Close with this page when you want to remove any doubt about credibility or operating discipline.',
      ],
      ar: [
        'استخدم هذه الصفحة لتوضيح أن كل KPI له مصدر ومالك وحد تدخل ومنتدى مراجعة.',
        'أكد أن الحوكمة جزء من المنتج نفسه وليست شريحة إضافية بعد بناء الداشبورد.',
        'اختم بهذه الصفحة عندما تريد إزالة أي شك حول المصداقية أو الانضباط التشغيلي.',
      ],
    },
  },
  {
    title: 'Deployment Roadmap',
    url: '/deployment',
    purpose:
      'Shows how the demo translates into a production operating model, rollout plan, and enterprise path.',
    proof:
      'Positions the work as an operating platform ready for enterprise rollout, not a one-off showcase.',
    leadershipQuestion: {
      en: 'How does this move from a strong demo into a deployable operating platform?',
      ar: 'كيف ينتقل هذا العمل من ديمو قوي إلى منصة تشغيل قابلة للتنفيذ؟',
    },
    presentationSteps: {
      en: [
        'Use this page to show implementation maturity, not just design quality.',
        'Frame the rollout path around governance, adoption, operating cadence, and enterprise readiness.',
        'End here if the audience wants to know how this becomes real inside the business.',
      ],
      ar: [
        'استخدم هذه الصفحة لتوضيح نضج التنفيذ وليس فقط جودة التصميم.',
        'اعرض مسار التحول إلى الإنتاج من زاوية الحوكمة والتبني والإيقاع التشغيلي وجاهزية المؤسسة.',
        'اختم هنا إذا كان الجمهور يريد معرفة كيف يصبح هذا العمل واقعًا داخل الشركة.',
      ],
    },
  },
] as const;

const nextRouteByPathname: Record<string, string> = {
  '/': '/briefing',
  '/briefing': '/delivery',
  '/delivery': '/strategic',
  '/strategic': '/explorer',
  '/explorer': '/methodology',
  '/methodology': '/deployment',
  '/deployment': '/',
};

export function detectGuideLanguage(input: string): GuideLanguage {
  return /[\u0600-\u06FF]/.test(input) ? 'ar' : 'en';
}

export function getGuideRouteSummary(pathname: string): GuideRouteSummary {
  return (
    guideRouteSummaries.find((route) => route.url === pathname) ??
    guideRouteSummaries[0]
  );
}

export function getGuideNextRoute(pathname: string): GuideRouteSummary {
  const nextPath = nextRouteByPathname[pathname] ?? '/';
  return getGuideRouteSummary(nextPath);
}

function buildExecutiveOpening(language: GuideLanguage): string {
  if (language === 'ar') {
    return `الافتتاحية التنفيذية

هذا العمل يجيب بسرعة على ثلاثة أسئلة للإدارة العليا:
- ماذا يتعثر الآن؟
- ما الإيراد المعرّض؟
- أين يغيّر تدخل الإدارة النتيجة؟

الإشارات الحالية:
- ${executiveSignals.ordersInFlight} طلبًا نشطًا
- ${executiveSignals.onTimeDelivery} التزام بالتسليم
- ${executiveSignals.revenueAtRisk} إيراد معرّض
- ${executiveSignals.acceptancePending} عنصر قبول معلق`;
  }

  return `Executive opening

This product answers three leadership questions fast:
- what is slipping
- what revenue is exposed
- where sponsor intervention changes the outcome

Current signal:
- ${executiveSignals.ordersInFlight} live orders
- ${executiveSignals.onTimeDelivery} on-time delivery
- ${executiveSignals.revenueAtRisk} revenue at risk
- ${executiveSignals.acceptancePending} pending acceptance items`;
}

function buildRecommendedRoute(language: GuideLanguage): string {
  if (language === 'ar') {
    return `المسار الموصى به للعرض

1. Executive Overview لإظهار وضع المحفظة
2. VP Briefing لتلخيص القرارات القابلة للحسم فورًا
3. Delivery Control Tower لإظهار منطق التدخل التنفيذي
4. Strategic Orders لإظهار حماية الإيراد
5. Portfolio Explorer ثم Data Governance وDeployment لإقفال سؤال المصداقية والتنفيذ

اطلب مني: مقدمة 60 ثانية، كيف أشرح هذه الصفحة، أعلى خطر اليوم، أو لماذا يجب أن تثق الإدارة بهذا العمل.`;
  }

  return `Recommended live route

1. Executive Overview for portfolio posture
2. VP Briefing for one-page leadership focus
3. Delivery Control Tower for intervention logic
4. Strategic Orders for revenue protection
5. Portfolio Explorer, then Data Governance and Deployment for credibility and rollout

Ask for: a 60-second opener, how to present this page, the top risk today, or why leadership should trust this product.`;
}

function buildCurrentViewBrief(pathname: string, language: GuideLanguage): string {
  const currentRoute = getGuideRouteSummary(pathname);
  const nextRoute = getGuideNextRoute(pathname);
  const steps = currentRoute.presentationSteps[language]
    .map((step, index) => `${index + 1}. ${step}`)
    .join('\n');

  if (language === 'ar') {
    return `الصفحة الحالية: ${currentRoute.title}

السؤال القيادي الذي تجيب عنه:
${currentRoute.leadershipQuestion.ar}

كيف تقدمها:
${steps}

الانتقال الأفضل بعدها: ${nextRoute.title} (${nextRoute.url})`;
  }

  return `Current view: ${currentRoute.title}

Leadership question:
${currentRoute.leadershipQuestion.en}

How to present it:
${steps}

Next best view: ${nextRoute.title} (${nextRoute.url})`;
}

function build60SecondOpener(pathname: string, language: GuideLanguage): string {
  const nextRoute = getGuideNextRoute(pathname);

  if (language === 'ar') {
    return `مقدمة 60 ثانية

هذا العمل عبارة عن Executive PMO control tower صُمم ليجيب بسرعة على ثلاثة أسئلة: ماذا يتعثر، ما الإيراد المعرّض، وأين يغيّر تدخل الإدارة النتيجة.

اليوم لدينا ${executiveSignals.ordersInFlight} طلبًا نشطًا، الالتزام عند ${executiveSignals.onTimeDelivery}، والتعرض المالي عند ${executiveSignals.revenueAtRisk}. الأهم هنا ليس الأرقام وحدها، بل أن المنصة تربط كل إشارة بقرار ومالك وإيقاع حوكمة واضح.

إذا أردت أقوى لحظة إدارية في العرض، افتح ${nextRoute.title} بعد هذه الصفحة مباشرة.`;
  }

  return `60-second opener

This project is an executive PMO control tower built to answer three leadership questions fast: what is slipping, what revenue is exposed, and where sponsor intervention changes the outcome.

Today the portfolio shows ${executiveSignals.ordersInFlight} live orders, ${executiveSignals.onTimeDelivery} on-time delivery, and ${executiveSignals.revenueAtRisk} at risk. The real point is not the numbers alone. It is that every signal is linked to a decision, an owner, and a governance rhythm.

If you want the strongest management moment in the demo, open ${nextRoute.title} next.`;
}

function buildThreeMinuteWalkthrough(language: GuideLanguage): string {
  if (language === 'ar') {
    return `السيناريو التنفيذي خلال 3 دقائق

1. ابدأ من Executive Overview لقراءة وضع المحفظة في أقل من 30 ثانية.
2. انتقل إلى Delivery Control Tower وأظهر حالة واحدة حيث يغيّر تدخل الإدارة النتيجة.
3. افتح Strategic Orders لتوضح كيف تُدار الطلبات عالية القيمة قبل أن يتحول التأخير إلى خطر إيرادي.
4. استخدم Portfolio Explorer لإثبات أن المنصة لا تتوقف عند المؤشرات العامة، بل تصل إلى حالة واحدة قابلة للنقاش.
5. اختم بـ Data Governance وDeployment لتثبت أن الأرقام محكومة وأن العمل قابل للتحول إلى منصة تشغيل فعلية.

هذه الرحلة تُظهر التفكير التنفيذي، والانضباط التشغيلي، وجاهزية المنتج للتبني داخل المؤسسة.`;
  }

  return `3-minute executive walkthrough

1. Start on Executive Overview and frame the portfolio in under 30 seconds.
2. Move to Delivery Control Tower and show one case where sponsor intervention changes the outcome.
3. Open Strategic Orders to show how high-value exposure is governed before it becomes revenue slippage.
4. Use Portfolio Explorer to prove the product can move from portfolio posture to one accountable case.
5. Close on Data Governance and Deployment to prove the numbers are governed and the model is deployable.

That sequence shows product thinking, operating discipline, and enterprise readiness in one narrative.`;
}

function buildLeadershipTrustReply(language: GuideLanguage): string {
  if (language === 'ar') {
    return `لماذا يجب أن تثق الإدارة بهذا العمل

- كل KPI مرتبط بمصدر، مالك، حد تدخل، ومنتدى مراجعة.
- المنصة تفصل بين وضع المحفظة، التدخلات التشغيلية، وحوكمة القياس بدل خلطها في شاشة واحدة.
- Focus briefs تربط المؤشرات بالقرار والمالك والأثر المتوقع.
- صفحة Data Governance تثبت أن الحوكمة جزء من المنتج نفسه، لا شرحًا خارجيًا بعد اكتماله.

أفضل صفحة لإثبات هذه النقطة: Data Governance (/methodology).`;
  }

  return `Why leadership should trust this dashboard

- Every KPI is tied to a source, owner, threshold, and review forum.
- The product separates posture, intervention, and governance instead of blending everything into one noisy screen.
- Focus briefs connect a signal to a decision, an owner, and an expected impact.
- Data Governance proves that credibility is built into the operating model, not added later as a slide.

Next best view: Data Governance (/methodology)`;
}

function buildTopRiskReply(language: GuideLanguage): string {
  if (language === 'ar') {
    return `أعلى إشارة خطر اليوم

- ${executiveSignals.revenueAtRisk} إيراد معرّض
- ${executiveSignals.acceptancePending} عنصر قبول معلق و${executiveSignals.pastDueBacklog} حالة متأخرة
- التركز الأعلى ظاهر في: ${executiveSignals.topAccounts}

إذا أردت إظهار أين يغيّر تدخل الإدارة النتيجة فعليًا، افتح Delivery Control Tower ثم اعرض Focus Brief واحد بوضوح.`;
  }

  return `Top risk today

- ${executiveSignals.revenueAtRisk} currently exposed
- ${executiveSignals.acceptancePending} pending acceptance items and ${executiveSignals.pastDueBacklog} past-due backlog
- Highest visible exposure sits around ${executiveSignals.topAccounts}

If you want to show where leadership intervention materially changes the outcome, open Delivery Control Tower and walk one focus brief.`;
}

function buildProjectPositioning(pathname: string, language: GuideLanguage): string {
  const nextRoute = getGuideNextRoute(pathname);

  if (language === 'ar') {
    return `ما الذي يقدمه هذا المشروع

هذا العمل ليس واجهة مؤشرات فقط. إنه نموذج تشغيل تنفيذي يربط بين:
- وضع التنفيذ على مستوى المحفظة
- المخاطر التي تستحق تدخل الإدارة
- حماية الإيراد في الحسابات والطلبات الاستراتيجية
- حوكمة المؤشرات ومصدرها ومالكها

المميز هنا أن المنتج لا يكتفي بعرض المشكلة، بل يوضح من يملك القرار ومتى ولماذا يهم.

الانتقال الأفضل الآن: ${nextRoute.title} (${nextRoute.url})`;
  }

  return `What this project does

This is more than a dashboard layer. It is an executive operating model that connects:
- portfolio posture
- sponsor-worthy intervention
- revenue protection for strategic accounts
- KPI governance and operating credibility

Its value is that it does not stop at visibility. It shows who owns the decision, when it matters, and why leadership should act.

Next best view: ${nextRoute.title} (${nextRoute.url})`;
}

function buildBoardroomQuestionReply(pathname: string, language: GuideLanguage): string {
  const currentRoute = getGuideRouteSummary(pathname);

  if (language === 'ar') {
    return `السؤال الذي سيطرحه التنفيذيون هنا غالبًا

${currentRoute.leadershipQuestion.ar}

الإجابة القوية يجب أن تكون قصيرة: اذكر الإشارة، ثم القرار، ثم المالك، ثم الأثر المتوقع. بهذه الطريقة يبدو العرض تنفيذيًا لا تشغيليًا فقط.`;
  }

  return `The boardroom question on this page

${currentRoute.leadershipQuestion.en}

The strongest answer pattern is short: state the signal, name the decision, name the owner, then state the expected impact. That keeps the demo executive instead of operationally noisy.`;
}

function buildDefaultReply(pathname: string, language: GuideLanguage): string {
  const currentRoute = getGuideRouteSummary(pathname);
  const nextRoute = getGuideNextRoute(pathname);

  if (language === 'ar') {
    return `أستطيع مساعدتك بأربع طرق واضحة:

- مقدمة تنفيذية سريعة لهذا المنتج
- كيف تشرح الصفحة الحالية للإدارة
- ما أعلى خطر اليوم وأين يبدأ التدخل
- لماذا يجب أن تثق الإدارة بالأرقام

اقتراحي الآن: اشرح ${currentRoute.title} باختصار ثم انتقل إلى ${nextRoute.title}.`;
  }

  return `I can help in four useful ways:

- frame the product in 60 seconds
- tell you how to present the current page
- point to the top risk worth executive attention
- explain why leadership should trust the numbers

My suggestion from here: frame ${currentRoute.title} briefly, then move to ${nextRoute.title}.`;
}

type GuideIntent =
  | 'opener'
  | 'page'
  | 'walkthrough'
  | 'trust'
  | 'risk'
  | 'project'
  | 'board'
  | 'default';

function identifyGuideIntent(prompt: string): GuideIntent {
  const normalizedPrompt = prompt.trim().toLowerCase();

  if (
    /(60-second|60 second|60-sec|opening|opener|افتتاح|مقدمة|ابدأ العرض|ابدأ)/.test(
      normalizedPrompt,
    )
  ) {
    return 'opener';
  }

  if (
    /(explain this page|present this view|how should i present|how do i present|current page|this page|explain .*present|is for and how i should present|what is .*page for|كيف اشرح|كيف أعرض|كيف اعرض|اشرح الصفحة|هذه الصفحة|الصفحة الحالية)/.test(
      normalizedPrompt,
    )
  ) {
    return 'page';
  }

  if (
    /(3-minute|3 minute|walkthrough|demo route|story|tour|sequence|عرض|جولة|3 دقائق|ثلاث دقائق|سيناريو)/.test(
      normalizedPrompt,
    )
  ) {
    return 'walkthrough';
  }

  if (
    /(trust|credibility|governance|methodology|why trust|source|threshold|owner|حوكمة|مصداق|ثقة|منهجية|مصدر|مالك)/.test(
      normalizedPrompt,
    )
  ) {
    return 'trust';
  }

  if (
    /(top risk|highest risk|risk today|revenue|exposure|at risk|مخاطر|أعلى خطر|اعلى خطر|إيراد|ايراد|تعرض)/.test(
      normalizedPrompt,
    )
  ) {
    return 'risk';
  }

  if (
    /(what is this project|what does this do|what is this|about the project|ما هو المشروع|ماذا يفعل|وش المشروع|فكرة المشروع)/.test(
      normalizedPrompt,
    )
  ) {
    return 'project';
  }

  if (
    /(board|leadership|executive question|what will they ask|الإدارة العليا|الادارة العليا|التنفيذي|السؤال المتوقع)/.test(
      normalizedPrompt,
    )
  ) {
    return 'board';
  }

  return 'default';
}

export function shouldPreferPlaybookReply(prompt: string): boolean {
  const intent = identifyGuideIntent(prompt);
  return intent === 'opener' || intent === 'page' || intent === 'walkthrough';
}

export function buildGuidePlaybookReply(
  pathname: string,
  prompt: string,
): string {
  const language = detectGuideLanguage(prompt);
  const intent = identifyGuideIntent(prompt);

  switch (intent) {
    case 'opener':
      return build60SecondOpener(pathname, language);
    case 'page':
      return buildCurrentViewBrief(pathname, language);
    case 'walkthrough':
      return buildThreeMinuteWalkthrough(language);
    case 'trust':
      return buildLeadershipTrustReply(language);
    case 'risk':
      return buildTopRiskReply(language);
    case 'project':
      return buildProjectPositioning(pathname, language);
    case 'board':
      return buildBoardroomQuestionReply(pathname, language);
    default:
      return buildDefaultReply(pathname, language);
  }
}

export function buildGuideWelcomeMessages(): string[] {
  return [
    buildExecutiveOpening('en'),
    buildRecommendedRoute('en'),
    'You can also ask about any KPI, risk account, owner, scenario, briefing page, or governance rule shown in the dashboard.',
  ];
}

export function buildGuideNavigationConfirmation(pathname: string): string {
  const route = getGuideRouteSummary(pathname);

  return `Opening ${route.title}.

Why this page matters:
${route.proof}`;
}
