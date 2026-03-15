# Salam PMO Control Tower

Executive control tower demo designed for customer delivery, PMO governance, escalation handling, and executive decision support.

Live URL: https://pmo-sultan.vercel.app

## What this project demonstrates

- Executive portfolio posture across delivery, revenue exposure, and intervention demand
- Leadership decision queue, owner-backed action register, and deterministic scenario planning
- Operational drill-downs for delivery control, strategic orders, escalations, booking, and B2C fulfillment
- Governed KPI definitions with accountable owners, review forums, and thresholds
- Official Salam service-portfolio coverage across consumer, business, and wholesale references
- A bounded executive desk for dashboard Q&A and presentation support using Gemini when configured
- A productized interview demo that connects design, product thinking, and frontend execution

## Primary routes

- `/` Executive Overview
- `/briefing` VP Briefing Pack
- `/portfolio` Salam Service Portfolio
- `/delivery` Delivery Control Tower
- `/strategic` Strategic Orders
- `/explorer` Portfolio Explorer
- `/methodology` Data Governance & Methodology
- `/deployment` From Demo to Live Deployment

## Local development

```bash
npm install
npm run dev
```

To enable the executive desk and live brief refresh, create `.env.local`
and set:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Production build:

```bash
npm run build
npm run start -- -p 9002
```

## نبذة عربية

هذا المشروع عبارة عن لوحة تحكم تنفيذية تجريبية لمنصب `Director Customer PMO`
في شركة سلام، وتركّز على:

- متابعة صحة التنفيذ والتسليم
- حماية الإيراد المعرض للخطر
- إدارة التصعيدات والتعافي
- ربط كل KPI بمالك ومصدر ومنتدى مراجعة

لتشغيل المشروع محلياً:

```bash
npm install
npm run dev
```

ولتفعيل التحديث الذكي للملخص التنفيذي:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
