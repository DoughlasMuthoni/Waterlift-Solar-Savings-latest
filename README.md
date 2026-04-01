# Waterlift Solar Savings — Website Documentation

**A solar energy marketing and lead-capture website built for Kenyan schools.**
Developed by Waterlift Solar Savings, a division of Mugumo Capital Partners Limited.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Website Sections](#4-website-sections)
   - [Hero Section](#41-hero-section)
   - [Trust Bar](#42-trust-bar)
   - [Problem Section](#43-problem-section)
   - [How It Works](#44-how-it-works)
   - [Why Solar Section](#45-why-solar-section)
   - [Plans Section](#46-plans-section)
   - [Savings Calculator](#47-savings-calculator)
   - [Why Waterlift Section](#48-why-waterlift-section)
   - [School Types Section](#49-school-types-section)
   - [Value Props Section](#410-value-props-section)
   - [Monitoring Section](#411-monitoring-section)
   - [Testimonials Section](#412-testimonials-section)
   - [FAQ Section](#413-faq-section)
   - [Contact / Lead Form](#414-contact--lead-form)
   - [Footer](#415-footer)
5. [Savings Calculator — Deep Dive](#5-savings-calculator--deep-dive)
6. [Admin Dashboard](#6-admin-dashboard)
7. [API Reference](#7-api-reference)
8. [Running Locally](#8-running-locally)
9. [Deploying to Truehost](#9-deploying-to-truehost)
10. [Environment Variables](#10-environment-variables)

---

## 1. Project Overview

Waterlift Solar Savings is a lead-generation website targeting Kenyan school principals, directors, and board members. It explains the school solar energy problem, presents Waterlift Solar's two pricing plans, provides an interactive savings calculator, and captures school enquiries through a detailed contact form.

The site is split into two parts:

| Part | Technology | Purpose |
|------|-----------|---------|
| **Frontend** | React 18 + Vite + Bootstrap 5 | Public website + Admin dashboard |
| **Backend** | PHP 8.2 + MySQL | REST API for leads, FAQs, testimonials, packages, settings |

---

## 2. Tech Stack

**Frontend**
- React 18 with React Router v6
- Vite 5 (build tool)
- Bootstrap 5.3 + Bootstrap Icons
- Axios (HTTP client)

**Backend**
- PHP 8.2 (no framework — custom front-controller router)
- MySQL 8+ with PDO
- Manual HS256 JWT authentication
- bcrypt password hashing

---

## 3. Project Structure

```
WaterliftSolarSavings/
├── frontend/                   # React application
│   ├── src/
│   │   ├── admin/              # Admin dashboard pages
│   │   │   ├── AdminApp.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLeads.jsx
│   │   │   ├── AdminPackages.jsx
│   │   │   ├── AdminTestimonials.jsx
│   │   │   ├── AdminFaqs.jsx
│   │   │   └── AdminSettings.jsx
│   │   ├── sections/           # Public website sections
│   │   ├── assets/             # Images and generated PNGs
│   │   ├── context/            # SettingsContext (live site settings)
│   │   ├── hooks/              # useScrollReveal, etc.
│   │   ├── styles/             # Global CSS + animations
│   │   └── utils/              # constants.js, api.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # PHP REST API
│   ├── controllers/            # AuthController, LeadsController, etc.
│   ├── models/                 # Lead, Faq, Testimonial, Package, etc.
│   ├── middleware/             # JWT AuthMiddleware
│   ├── helpers/                # Response, Validator
│   ├── routes/                 # api.php (route table)
│   ├── config/                 # app.php, database.php
│   ├── public/                 # index.php (front controller)
│   ├── db/                     # schema.sql
│   └── .env                    # Environment config
│
├── start-backend.bat           # Start PHP server (Windows)
└── start-frontend.bat          # Start Vite dev server (Windows)
```

---

## 4. Website Sections

The public website is a single-page application. All sections are in `frontend/src/sections/`. They appear in this order on the page:

### 4.1 Hero Section

**File:** `HeroSection.jsx`

Full-screen section with a background image and Ken Burns animation (slow zoom/pan). Contains:
- Brand badge ("Kenya's School Solar Specialists — Est. 2018")
- Main headline and subtext (live-editable from Admin → Site Settings)
- Two CTA buttons: **Get Your Free School Audit** (→ contact form) and **See How It Works** (→ how it works section)
- 7 feature tiles with Bootstrap Icons: No Upfront Costs, Savings Every Month, 24/7 Support, Mobile App to Monitor, All Maintenance Included, Compliance Certificate, Month-to-Month Contract

The headline and subtext are pulled live from the database via `SettingsContext` and can be updated without redeploying the site.

---

### 4.2 Trust Bar

**File:** `TrustBar.jsx`

A slim band of 6 credibility statistics displayed horizontally:
- 60% Average Electricity Savings
- 1,400+ School Installations
- 47 Counties Covered
- Public & Private Schools Served
- Day & Boarding School Types
- Est. 2018

Content is driven by the `TRUST_STATS` constant in `utils/constants.js`.

---

### 4.3 Problem Section

**File:** `ProblemSection.jsx`

Two-column layout. Left: solar panel image with overlaid statistics (KES 90K avg bill, 12hr weekly outages, 3× diesel cost). Right: 6 pain-point cards in a 2×3 grid, each with an icon, bold title, and one-line description.

The 6 problems are:
1. KPLC Bills Consuming School Fee Revenue
2. Kenya Power Outages Disrupting Education
3. Diesel Generators: KSh 80–120 Per Hour
4. Choosing Between Electricity and Education
5. Boarding Schools: Cold Kitchens, Dark Dormitories
6. CBC Digital Literacy Under Threat

---

### 4.4 How It Works

**File:** `HowItWorksSection.jsx`

4-step process displayed in a horizontal card row with a connecting line:

| Step | Title | Description |
|------|-------|-------------|
| 01 | Free Audit & Custom Design | Site visit, load assessment, 12-month bill analysis |
| 02 | Flexible Finance Plan | Choose Rent-to-Own or Rent-Only, pay via M-Pesa |
| 03 | Professional Installation | EPRA-licensed, completed during school holidays |
| 04 | Savings from Day One | System goes live, KPLC bill drops immediately |

Step 02 (Finance) is highlighted with a dark primary card and an accent border to draw attention.

---

### 4.5 Why Solar Section

**File:** `WhySolarSection.jsx`

4 animated image cards arranged in a responsive grid (1 → 2 → 4 columns). Each card has:
- A photograph (from `assets/picture/`)
- A coloured accent bar (gradient)
- Bold heading and description
- "Learn More →" link to the contact form

Cards animate in with stagger on scroll using the `.card-reveal` CSS class.

---

### 4.6 Plans Section

**File:** `PlansSection.jsx`

Displays the available pricing packages fetched live from `/api/packages`. Falls back to the two hardcoded plans in `utils/constants.js` if the API is unavailable.

**Default packages:**

| Plan | Badge | Description |
|------|-------|-------------|
| Rent-to-Own | Most Popular | School owns the system after 36–60 months |
| Rent-Only | Zero Capital | Waterlift maintains the system indefinitely |

Both include: zero upfront cost, full maintenance, M-Pesa payment. The **popular** plan renders with a dark primary gradient card. New packages can be added, edited, or removed from **Admin → Packages**.

---

### 4.7 Savings Calculator

**File:** `SavingsCalculator.jsx`

> See [Section 5](#5-savings-calculator--deep-dive) for the full technical explanation.

An interactive tool that estimates school electricity savings based on three inputs. No server call is needed to compute results — all maths runs in the browser. The savings rate and payback period are fetched from `/api/calculator-settings` (configurable from Admin → Settings).

---

### 4.8 Why Waterlift Section

**File:** `WhyWaterliftSection.jsx`

Dark primary background with 4 differentiator cards in a 2×2 grid:
1. Built for Kenya — All 47 Counties
2. School-Specific Engineering
3. Zero Disruption to Learning
4. EPRA Licensed & Fully Compliant

Content driven by `WHY_WATERLIFT` in `constants.js`.

---

### 4.9 School Types Section

**File:** `SchoolTypesSection.jsx`

4-card grid explaining the solar value proposition for each school type:
- Private Day Schools
- Private Boarding Schools
- Public Day Schools
- Public Boarding Schools

---

### 4.10 Value Props Section

**File:** `ValuePropsSection.jsx`

6 cards explaining why schools choose Waterlift Solar:
1. Zero Upfront Cost
2. 60% Average Savings
3. All Maintenance Included
4. M-Pesa Monthly Payment
5. 24/7 System Monitoring
6. Own Your System in 36–60 Months

Each card shows an icon, title, description, and a highlighted stat callout.

---

### 4.11 Monitoring Section

**File:** `MonitoringSection.jsx`

A live-animated dashboard mockup showing:
- **Solar Output Today:** 87% — animated progress bar with shimmer
- **Battery Level:** 92% — animated progress bar
- **Monthly Savings:** KES 62,400 — animated count-up number

All three values count up from zero when the section scrolls into view, using an ease-out cubic animation driven by `requestAnimationFrame`. This section illustrates the real-time monitoring dashboard that Waterlift provides to school clients.

---

### 4.12 Testimonials Section

**File:** `TestimonialsSection.jsx`

3-column grid of testimonial cards. Each card shows:
- Star rating (1–5)
- Quote text
- Author name, role, and school
- Meta chips: school type, student count, system size

Data is fetched from `/api/testimonials` on load. Falls back to `FALLBACK_TESTIMONIALS` in `constants.js` if the API is unavailable. New testimonials can be added from **Admin → Testimonials**.

---

### 4.13 FAQ Section

**File:** `FaqSection.jsx`

An accordion of frequently asked questions. Questions are fetched from `/api/faqs`. Falls back to `FALLBACK_FAQS` in `constants.js`. New FAQs can be added, edited, and reordered from **Admin → FAQs**.

Includes a "Chat with us on WhatsApp" link at the bottom using the live WhatsApp number from site settings.

---

### 4.14 Contact / Lead Form

**File:** `ContactSection.jsx`

The main lead-capture form. Collects:
- School Name and School Type (required)
- Principal / Contact Name and Phone (required)
- Email Address
- County (dropdown of all 47 Kenyan counties)
- Number of Students
- Monthly KPLC Bill (KES)
- Preferred Plan (Rent-to-Own / Rent-Only / Not Sure)
- Message

On submit, the form POSTs to `/api/leads`. A success screen confirms that a specialist will be in touch within 24 hours.

The sidebar shows the Head Office (Nairobi) and Branch Office (Nanyuki) addresses, plus phone, email, WhatsApp, and response time — all pulled live from site settings.

---

### 4.15 Footer

**File:** `Footer.jsx`

Contains the Waterlift Solar logo, tagline, social links, quick navigation, services list, and contact details. Legal line at the bottom:

> "Waterlift Solar Savings is a division of Mugumo Capital Partners Limited. CEO: Michael Waithaka. Registered in Kenya."

All contact details are pulled live from site settings so they update without a redeploy.

---

## 5. Savings Calculator — Deep Dive

**File:** `frontend/src/sections/SavingsCalculator.jsx`

### How It Works

The calculator is entirely client-side. There is no server calculation. The user enters three values:

| Input | Range | Default |
|-------|-------|---------|
| Monthly KPLC Bill (KES) | 5,000 – 500,000 | 50,000 |
| School Type | Primary / Secondary / Boarding / Polytechnic / University | Secondary |
| Number of Students | 50 – 5,000 | 500 |

### Calculation Formula

```
Monthly Savings   = Monthly Bill × Savings Rate
Annual Savings    = Monthly Savings × 12
5-Year Savings    = Annual Savings × 5
```

**Example** with a KES 85,000 monthly bill and 75% savings rate:

```
Monthly Savings = 85,000 × 0.75 = KES 63,750
Annual Savings  = 63,750 × 12   = KES 765,000
5-Year Savings  = 765,000 × 5   = KES 3,825,000
```

### Settings from the Database

The two configurable values are fetched from `/api/calculator-settings` on page load:

| Setting Key | Default | Description |
|-------------|---------|-------------|
| `savings_percentage` | `0.75` | Fraction of the bill saved (0.75 = 75%) |
| `payback_years` | `4` | Displayed as the estimated payback period |

These are set in **Admin → Settings → Calculator Settings** and stored in the `calculator_settings` MySQL table. If the API is unavailable, the browser falls back to the hardcoded defaults (`savings_percentage: 0.75`, `payback_years: 4`).

> **Note:** The calculator is an estimator only. The "Get My Exact Savings Report" button scrolls to the contact form so a Waterlift engineer can provide a precise, free site assessment.

---

## 6. Admin Dashboard

Access the admin panel at `/admin` (or `/admin/login`).

**Default login:** Username: `Waterliftsolarsavings` — Password: set when `backend/setup_admin.php` was run.

### Admin Sections

| Section | URL | What You Can Do |
|---------|-----|-----------------|
| Dashboard | `/admin/dashboard` | View lead stats, pipeline, quick actions |
| Leads | `/admin/leads` | View all enquiries, update status, WhatsApp/Email directly |
| Packages | `/admin/packages` | Add, edit, delete pricing plans shown on the website |
| Testimonials | `/admin/testimonials` | Add, edit, toggle visibility of school testimonials |
| FAQs | `/admin/faqs` | Add, edit, reorder, toggle visibility of FAQs |
| Settings | `/admin/settings` | Update phone, WhatsApp, email, hero headline, calculator rates |

### Contacting Leads Directly

In **Admin → Leads**, every lead row has three action buttons:

- **WhatsApp** — Opens WhatsApp Web / app with a pre-filled message addressed to the contact by name, referencing their school
- **Email** — Opens your email client with a pre-filled subject and greeting
- **Call** — Opens your phone dialler with the lead's number

The phone number is automatically converted to international format (`254XXXXXXXXX`) for WhatsApp links.

---

## 7. API Reference

### Public Endpoints (no authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit a new school lead |
| GET | `/api/packages` | Fetch active pricing packages |
| GET | `/api/testimonials` | Fetch active testimonials |
| GET | `/api/faqs` | Fetch active FAQs |
| GET | `/api/settings` | Fetch site settings (phone, email, hero text) |
| GET | `/api/calculator-settings` | Fetch calculator configuration |

### Admin Endpoints (Bearer token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/admin/dashboard` | Stats summary |
| GET/PATCH | `/api/admin/leads` | List and update leads |
| GET/POST/PUT/DELETE | `/api/admin/packages` | Manage pricing packages |
| GET/POST/PUT/DELETE | `/api/admin/testimonials` | Manage testimonials |
| GET/POST/PUT/DELETE | `/api/admin/faqs` | Manage FAQs |
| GET/POST | `/api/admin/settings` | View and update all settings |

---

## 8. Running Locally

### Prerequisites

- **PHP 8.2+** with PDO and MySQL extensions
- **MySQL 8.0+**
- **Node.js 18+** and npm
- **Composer** is NOT required (no PHP dependencies)

### Step 1 — Set Up the Database

```sql
-- In MySQL Workbench or the MySQL CLI:
CREATE DATABASE waterlift_solar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then import the schema:

```bash
mysql -u root -p waterlift_solar < backend/db/schema.sql
```

### Step 2 — Create the Admin Account

```bash
php backend/setup_admin.php
```

Follow the prompts to set your admin username and password.

### Step 3 — Configure the Backend

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=waterlift_solar
DB_USER=root
DB_PASS=your_mysql_password
JWT_SECRET=a_long_random_secret_string
APP_ENV=development
APP_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

### Step 4 — Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 5 — Start Both Servers

**Windows** — double-click the batch files in the project root:
- `start-backend.bat` — starts PHP on `http://localhost:8000`
- `start-frontend.bat` — starts Vite on `http://localhost:5173`

**Mac / Linux:**

```bash
# Terminal 1 — backend
php -S localhost:8000 -t backend/public backend/public/index.php

# Terminal 2 — frontend
cd frontend && npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 9. Deploying to Truehost

Truehost Kenya offers shared hosting with cPanel, PHP 8.x, and MySQL. The frontend needs to be **built as static files** and the backend deployed as PHP.

### Step 1 — Build the Frontend

On your local machine:

```bash
cd frontend
npm run build
```

This creates a `frontend/dist/` folder containing the compiled static site (HTML, CSS, JS, images).

### Step 2 — Log In to Truehost cPanel

Go to your Truehost control panel: `https://cpanel.truehost.co.ke` (or the URL in your welcome email).

---

### Step 3 — Create the MySQL Database

1. In cPanel, open **MySQL Databases**
2. Create a new database, e.g. `yourusername_waterlift`
3. Create a new database user with a strong password
4. Add the user to the database with **All Privileges**
5. Note down: database name, username, and password

Then import the schema:
- Open **phpMyAdmin** in cPanel
- Select your new database
- Click **Import** → choose `backend/db/schema.sql` → click **Go**

---

### Step 4 — Upload the Backend

Using **cPanel File Manager** or an FTP client (e.g. FileZilla):

1. Upload the entire `backend/` folder to your hosting root. A clean layout:

```
public_html/
└── api/                    ← create this folder
    ├── config/
    ├── controllers/
    ├── helpers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── public/
    │   └── index.php       ← the PHP front controller
    └── .env                ← your production config
```

> **Recommended:** Place the backend outside `public_html` for security, with only `public/index.php` accessible from the web. If your Truehost plan only provides `public_html`, place everything inside a folder like `public_html/api-backend/` and point your `.htaccess` accordingly.

2. Edit the `.env` file **on the server** with your Truehost database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yourusername_waterlift
DB_USER=yourusername_dbuser
DB_PASS=your_strong_db_password
JWT_SECRET=a_very_long_random_secret_here
APP_ENV=production
APP_URL=https://yourdomain.co.ke
CORS_ORIGIN=https://yourdomain.co.ke
```

---

### Step 5 — Configure the PHP `.htaccess`

In the folder where `index.php` lives, create a `.htaccess` file:

```apache
Options -Indexes
RewriteEngine On

# Route all requests through index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]

# Security headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
```

This replaces the PHP built-in server router. Apache on Truehost will handle routing through `index.php` automatically.

---

### Step 6 — Upload the Frontend

The built frontend in `frontend/dist/` is a static site. Upload its contents to `public_html/`:

```
public_html/
├── index.html              ← from frontend/dist/
├── assets/                 ← from frontend/dist/assets/
└── ...
```

Create a `.htaccess` in `public_html/` to handle React Router (client-side routing):

```apache
Options -Indexes
RewriteEngine On

# React Router — send all non-file requests to index.html
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

### Step 7 — Point the Frontend API URL to the Backend

Before building (`npm run build`), set the API URL in `frontend/.env`:

```env
VITE_API_URL=https://yourdomain.co.ke/api
```

Where `/api` maps to your `backend/public/index.php` on the server.

If the backend is at a subdomain (e.g. `api.yourdomain.co.ke`), update `VITE_API_URL` accordingly and ensure the CORS_ORIGIN in `backend/.env` matches your frontend domain.

Then rebuild:

```bash
cd frontend
npm run build
```

Re-upload the fresh `dist/` contents to `public_html/`.

---

### Step 8 — Create the Admin Account on the Server

Run the setup script once via Truehost's **Terminal** (if available) or cPanel's **PHP Script Runner**:

```bash
php backend/setup_admin.php
```

Alternatively, generate a bcrypt hash locally:

```bash
php -r "echo password_hash('YourAdminPassword', PASSWORD_BCRYPT);"
```

Then insert it directly in phpMyAdmin:

```sql
INSERT INTO admins (username, email, password_hash, full_name)
VALUES ('admin', 'admin@yourdomain.co.ke', '$2y$10$...paste_hash_here...', 'Administrator')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
```

---

### Step 9 — Test Everything

Visit your domain and verify:

- [ ] Home page loads with hero section and all sections
- [ ] Savings calculator computes results
- [ ] Contact form submits successfully (check Admin → Leads)
- [ ] FAQs and Testimonials load from the database
- [ ] `/admin/login` works with your credentials
- [ ] Admin can update site settings and they appear on the frontend
- [ ] WhatsApp and Email buttons in Admin → Leads open correctly

---

### Truehost SSL Certificate

Truehost provides free SSL via Let's Encrypt in cPanel:

1. Go to **SSL/TLS** in cPanel
2. Click **Let's Encrypt SSL**
3. Select your domain and issue the certificate

After SSL is active, update both `.env` files to use `https://`.

---

## 10. Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `waterlift_solar` |
| `DB_USER` | Database username | `root` |
| `DB_PASS` | Database password | `your_password` |
| `JWT_SECRET` | Secret for signing JWTs — keep this private and long | `change_in_production_abc123` |
| `APP_ENV` | `development` or `production` | `production` |
| `APP_URL` | Backend URL | `https://yourdomain.co.ke` |
| `CORS_ORIGIN` | Allowed frontend origin | `https://yourdomain.co.ke` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL (empty = use Vite proxy in dev) | `https://yourdomain.co.ke/api` |
| `VITE_WHATSAPP_NUMBER` | Fallback WhatsApp number | `254700000000` |

> In development, `VITE_API_URL` should be **empty** so Vite proxies `/api/*` requests to `localhost:8000`. In production, set it to your live backend URL.

---

*Documentation last updated: April 2026*
*Waterlift Solar Savings — A division of Mugumo Capital Partners Limited*
