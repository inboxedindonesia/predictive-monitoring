# Predictive Monitoring CMS

Modular CMS for telemetry monitoring, predictive maintenance, energy cost estimation, asset management, ticketing, user/role management, reporting (Power BI), notifications, and system configuration.

## Getting Started

1. Install dependencies:
```
npm install
```
2. Run dev server:
```
npm run dev
```
3. Build:
```
npm run build
```

## Features
- Telemetry Monitoring: charts, tables, anomaly highlight, per-location dashboard.
- Predictive Maintenance: risk, next maintenance, recommendations.
- Energy & Utility Cost: cost estimation and projections.
- Asset & Machine Management: CRUD-ready scaffolding and lifecycle statuses.
- Maintenance Ticketing: statuses, assignments, history-ready.
- User & Role Management: role-based routes (Admin, Supervisor, Engineer, Viewer).
- Reporting & Analytics: Power BI placeholder, PDF/Excel export utils.
- Notifications: stubs for email/push.
- System Configuration: thresholds, locations, integrations.

## Structure
- `src/router/` routes with meta roles and guards
- `src/components/layout/` layout (sidebar/topbar)
- `src/pages/` module pages
- `src/stores/` Pinia stores (mock)
- `src/services/` API, Azure IoT, Power BI, Notifications (stubs)
- `src/utils/export.ts` PDF/Excel exports

## Notes
- Azure IoT, Power BI, and email/push are stubbed; integrate real endpoints in `src/services/`.
- Configure `VITE_API_BASE_URL` in `.env` for backend API.
