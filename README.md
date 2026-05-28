# 🍽️ FlavourHub

> Ghana's favourite food delivery platform — built with pure HTML, CSS & JavaScript.

FlavourHub is a multi-page frontend web app that simulates a food delivery service based in Accra, Ghana. It features a browsable menu of Ghanaian and international meals, a working shopping cart, user sign-up, and a contact form — all without any frameworks or backend.

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing/home page with hero section |
| `menu.html` | Browsable food menu with category filters and search |
| `cart.html` | Shopping cart with quantity controls, promo codes & checkout |
| `about.html` | Company story, mission, stats, and team |
| `contact.html` | Contact form + support info |
| `signup.html` | User registration form |

---

## ✨ Features

- **🛒 Shopping Cart** — Add, remove, and adjust item quantities. Cart state persists in `localStorage` across pages.
- **🔍 Search** — Search meals from the nav bar (redirects to menu) or search within the menu page directly with text highlighting.
- **🗂️ Category Filter** — Filter menu items by Ghanaian, Street Food, Seafood, International, and Drinks.
- **🌙 Dark Mode** — Toggle between light and dark themes. Preference is saved in `localStorage`.
- **📱 Responsive Design** — Mobile-friendly with a hamburger menu for smaller screens.
- **🏷️ Promo Code** — Enter `FIRST20` at checkout for a discount.
- **♿ Accessibility** — Semantic HTML, ARIA labels, skip links, and `aria-live` regions throughout.
- **✅ Form Validation** — Sign-up and contact forms validate inputs before submission.

---

## 🗂️ Project Structure

```
flavourhub/
├── index.html
├── menu.html
├── about.html
├── cart.html
├── contact.html
├── signup.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── media/
    ├── bg-video.mp4
    ├── jollof.jpg
    ├── banku.jpg
    ├── fufu.jpg
    └── ... (other food images)
```

---

## 🚀 Getting Started

No installation needed. Just clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/perez-larsey/flavourhub.git
cd flavourhub
```

Then open `index.html` in any modern browser. That's it.

> **Note:** The hero background video (`media/bg-video.mp4`) and food images (`media/`) are not included in this repo. You can add your own or the page will gracefully fall back.

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup and accessibility
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, responsive design
- **Vanilla JavaScript** — No frameworks, no libraries
- **localStorage** — Cart persistence and theme preference

---

## 🍚 Menu Categories

- 🇬🇭 **Ghanaian** — Jollof Rice, Banku & Okro Stew, Fufu & Palm Nut Soup, Kelewele
- 🌯 **Street Food** — Mega Shawarma, Spicy Chicken Wings
- 🐟 **Seafood** — Grilled Tilapia, Peppered Prawns
- 🌍 **International** — Loaded Chicken Pizza, Gourmet Beef Burger
- 🥤 **Drinks** — Sobolo Punch, Tropical Smoothie

---

## 👥 Team (Fictional)

| Name | Role |
|------|------|
| Perez Tsakele-Larsey | CEO & Co-Founder |
| Alvin Amarh | CTO |
| Carl Sowah | Head of Operations |
| Robertson Addo-Appiah | Head of Design |

---

## 📄 License

This project was built for educational purposes as part of a web development learning journey.

---

*Built with 🤍 in Accra, Ghana.*
