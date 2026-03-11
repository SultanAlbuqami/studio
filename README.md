# Salam PMO Control Tower

Executive control tower demo designed for customer delivery, PMO governance, escalation handling, and executive decision support.

Live URL: https://pmo-sultan.vercel.app

## What this project demonstrates

- Executive portfolio posture across delivery, revenue exposure, and intervention demand
- Operational drill-downs for delivery control, strategic orders, escalations, booking, and B2C fulfillment
- Governed KPI definitions with accountable owners, review forums, and thresholds
- A productized interview demo that connects design, product thinking, and frontend execution

## Primary routes

- `/` Executive Overview
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

To enable the global AI guide and the executive brief panel, create `.env.local`
and set:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Production build:

```bash
npm run build
npm run start -- -p 9002
```
