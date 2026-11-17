# MIVA Open University — COS 106 Term Project
## Responsive Student Academic Portfolio & Management Website

**Course:** COS 106 – Introduction to Web Technologies  
**Institution:** MIVA Open University, Abuja, Nigeria  
**Student Name:** Deborah Tvishede  
**Faculty:** Faculty of Computing  
**Department:** Department of Computer Science  
**Total Marks:** 20 Marks  

---

## 🌟 Project Overview

This project is a multi-page, responsive academic portfolio and student management web platform engineered to demonstrate advanced proficiency in **HTML5**, **CSS3**, and **JavaScript (ES6+)** while adhering strictly to modern web design principles, semantic markup, and accessibility standards.

The platform provides a comprehensive digital hub for a university student to showcase their academic profile, skills, projects, and manage ongoing academic deliverables.

---

## 🚀 Key Pages & Features

### 1. Homepage (`index.html`)
- **Student Profile & Photograph:** Professional high-resolution vector avatar representation with student credentials.
- **Hero & Welcome Section:** Engaging welcome message, brief biography, and quick academic statistics (CGPA, Course Units, Project count).
- **Navigation Bar:** Fixed responsive navigation bar with active state indicator and mobile hamburger slide-down menu.
- **HTML5 Audio Feature:** Embedded `<audio controls>` player featuring an introductory chime showcasing multimedia integration.
- **Academic Focus Pillars:** Highlighting Semantic HTML, Responsive CSS Architecture, and Dynamic Client-Side Logic.

### 2. About Me Page (`about.html`)
- **Educational Background Table:** A semantic HTML `<table>` featuring `<caption>`, `<thead>`, `<tbody>`, and `<tfoot>` tracking registered courses, credit units, and academic standing (4.82 / 5.00 CGPA).
- **Educational Milestones:** Structured chronological list (`<ol>`) of educational accomplishments.
- **Technical Skills Matrix:** Categorized competencies (Frontend, Programming & Logic, Developer Tools) with proficiency progress indicators.
- **Career Aspirations:** Structured career roadmap in Full-Stack Engineering, Cloud Architecture, and EdTech Innovation.
- **Hobbies & Interests:** Interactive cards and lists illustrating logical sports (chess), tech literature, and athletic pursuits.
- **HTML5 Video Showcase:** Embedded `<video controls poster="...">` with native controls and accessible fallback messaging.

### 3. Projects Page (`projects.html`)
- **Minimum of 3+ Projects Displayed (4 Total):**
  1. *Student CGPA Calculator & Academic Forecaster* (5.0 Scale Nigerian University Grading System)
  2. *MIVA Course Platform & Resource Hub* (Distance learning course management portal)
  3. *Study Group & Campus Event Scheduler* (Collaborative academic calendar)
  4. *Student Smart Budget & Expense Manager* (Campus living allowance tracker)
- **Visual Mockups & Screenshots:** Crisp vector UI mockups illustrating each application interface.
- **Real & Simulated Links:** Direct links to GitHub repositories and interactive **Simulated Live Demo** modals powered by JavaScript.
- **Dynamic Category Filtering:** Filter buttons (*All Projects*, *Academic Tools*, *Productivity*, *Web Applications*) dynamically updating the DOM.

### 4. Academic Planner Page (`planner.html`)
- **Interactive Task Management System:** Fully interactive single-page application component built with pure Vanilla JavaScript.
- **Add Tasks:** Comprehensive input form supporting Task Title, Course Code, Target Due Date, and Priority levels (High, Medium, Low).
- **Mark Tasks Completed:** Interactive checkboxes toggling task completion status, visual strikethrough, and statistical recalculations.
- **Delete Tasks:** Confirmation-protected deletion of academic tasks with real-time DOM removal.
- **Live Statistical Dashboard:** Real-time metrics tracking Total Tasks, Completed, Pending, and Percentage Completion Rate.
- **Persistent Storage:** Integrated `localStorage` synchronization ensuring student schedules persist across browser sessions.
- **Filter Tabs:** Filter between All Tasks, Pending, and Completed.

### 5. Contact Page (`contact.html`)
- **Validated Contact Form:**
  - Full Name
  - Email Address
  - Phone Number
  - Message Textarea
- **Strict JavaScript Validation Rules:**
  - Ensures **no field is empty**.
  - Validates **standard RFC email address formatting** via regular expressions.
  - Enforces that the **phone number contains strictly numeric digits only** (`/^\d+$/`).
  - Displays instant inline feedback (`.has-error`, `.is-valid`) and custom error messages under each input.
  - Dispatches a verified success banner upon valid submission and clears input fields.
- **Alternative Contact Channels:** University student email, telephone, faculty office hours, and physical campus location in Abuja.

---

## 📂 Project Directory Structure

```text
COS106/
├── index.html                   # Homepage (Profile, Bio, Audio Chime, Academic Pillars)
├── about.html                   # About Me (Education Table, Skills, Video, Aspirations)
├── projects.html                # Projects Page (4 Showcase Projects, Filters, Demo Modal)
├── planner.html                 # Academic Planner (Interactive Task Management System)
├── contact.html                 # Contact Page (Strict Form Validation & Campus Channels)
├── README.md                    # Project Documentation & Hosting Instructions
├── css/
│   └── style.css                # External CSS3 stylesheet (Responsive Design System)
├── js/
│   ├── main.js                  # Mobile navigation, modal previews, dynamic footer
│   ├── planner.js               # Interactive task manager & localStorage logic
│   └── contact.js               # Form validation logic (empty, email, digits-only phone)
└── assets/
    ├── images/
    │   ├── miva-logo.svg        # MIVA Open University brand vector logo
    │   ├── deborah.jpg          # High-resolution student portrait
    │   ├── project-gpa.svg      # CGPA Calculator project mockup
    │   ├── project-portal.svg   # MIVA Student Portal mockup
    │   ├── project-events.svg   # Study Scheduler mockup
    │   ├── project-budget.svg   # Student Budget Manager mockup
    │   └── video-poster.svg     # Video preview poster image
    └── media/
        ├── welcome-audio.wav    # HTML5 audio feature chime
        └── student-intro.mp4    # HTML5 video feature clip
```
---