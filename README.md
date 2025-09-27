# 🔬 Scientific Paper Generator & Detector# 📝 Scientific Paper AI Detection Tool



[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)Built as an **educational prototype**, this project provides a hands-on experience for understanding AI-generated academic content. It features a **generator** to create a fake paper and a **detector** to identify its AI characteristics — all within a single, front-end application.

[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)

[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-blueviolet.svg)](https://getbootstrap.com/)---

[![License](https://img.shields.io/badge/License-Educational-green.svg)](#)

## 🚀 Features

An innovative educational tool designed to demonstrate the capabilities and limitations of AI-generated academic content. This application serves as both a scientific paper generator and an AI detection system, providing users with hands-on experience in understanding artificial intelligence in academic writing.- **AI Paper Generator**: Creates plausible, but fabricated, scientific papers with sections like title, abstract, introduction, and fake dataset metrics.  

- **AI Detection Simulator**: Analyzes text for signs of AI-generated content, providing a probability score, confidence level, and a list of suspicious elements.  

---- **Educational Focus**: Designed to raise awareness about academic fraud and digital literacy, with “detection hints” to guide users on spotting AI-generated text.  

- **Fully Client-Side**: Runs entirely in the browser using simulated JavaScript logic (no backend required).  

## 📋 Table of Contents

- [Introduction](#introduction)---

- [Description](#description)

- [Features](#features)## 🛠️ Tech Stack

- [Tech Stack](#tech-stack)- **Frontend:** React.js (component-based UI)  

- [How to Run](#how-to-run)- **Styling:** Bootstrap 5.3 (responsive design & layout)  

- [Screenshots](#screenshots)- **Icons:** Lucide React (modern icon set)  

- [Project Structure](#project-structure)  - **Logic:** Pure JavaScript (randomized data simulation)  

- [Contributing](#contributing)

- [Disclaimer](#disclaimer)---

- [Built By](#built-by)

## ⚖️ Disclaimer

---This project is **for educational purposes only** and aims to spread awareness about academic fraud.  

It should **never** be used for actual academic submissions.  

## 🌟 Introduction

In today's digital age, the rise of AI-powered content generation has created new challenges in academic integrity. The **Scientific Paper Generator & Detector** is an educational prototype that helps users understand how AI-generated academic content works and how to identify it. This tool provides a safe environment to explore the boundaries between human and artificial intelligence in academic writing.

---

## 📖 Description

This comprehensive web application combines two powerful functionalities:

1. **Paper Generation**: Creates realistic but fabricated scientific papers complete with titles, abstracts, introductions, and dataset information
2. **AI Detection**: Analyzes text content to identify potential AI-generated characteristics and provides detailed feedback

The application runs entirely in the browser using sophisticated JavaScript algorithms and provides an intuitive user interface for educational exploration. It's designed to promote digital literacy and awareness about academic fraud while serving as a practical learning tool for students, educators, and researchers.

---

## 🚀 Features

### 🎯 Core Functionality
- **AI Paper Generator**: Creates plausible, but fabricated, scientific papers with comprehensive sections including:
  - Dynamic title generation
  - Detailed abstracts
  - Structured introductions
  - Fake dataset metrics and statistics
  
- **AI Detection Simulator**: Advanced text analysis providing:
  - Probability scores for AI-generated content
  - Confidence level assessments
  - Detailed list of suspicious textual elements
  - Educational hints for manual detection

### 🎨 User Experience
- **Dark/Light Mode Toggle**: Seamless theme switching for comfortable viewing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive UI**: Modern, intuitive interface with smooth animations
- **File Management**: Advanced file handling capabilities
- **Toast Notifications**: Real-time feedback and status updates

### 🔧 Technical Features
- **Fully Client-Side**: No backend required - runs entirely in the browser
- **Real-time Processing**: Instant text analysis and paper generation
- **Download Functionality**: Export generated papers as text files
- **Educational Focus**: Built-in learning materials and detection guides

---

## 🛠️ Tech Stack

### Frontend Framework
- **React.js 19.1.1** - Modern component-based UI framework
- **Vite 7.1.2** - Fast build tool and development server

### Styling & UI
- **Bootstrap 5.3.8** - Responsive design framework
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Custom CSS** - Enhanced styling and animations

### Icons & Graphics
- **Lucide React 0.544.0** - Beautiful, customizable icon set

### Development Tools
- **ESLint 9.33.0** - Code linting and quality assurance
- **PostCSS 8.5.6** - CSS processing and optimization
- **Autoprefixer 10.4.21** - Automatic CSS vendor prefixing

---

## 🏃‍♂️ How to Run

### Prerequisites
- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prem-Hanchate/Scientific-Paper-Generator-Detector.git
   cd Scientific-Paper-Generator-Detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

To create a production build:
```bash
npm run build
# or using yarn
yarn build
```

To preview the production build:
```bash
npm run preview
# or using yarn
yarn preview
```

### Additional Scripts
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Automatically fix linting issues

---

## 📸 Screenshots

### Paper Generator Interface
<img width="1354" height="602" alt="Paper Generator Interface" src="https://github.com/user-attachments/assets/71b1ef89-6d9b-4d2a-8af3-dcb311bb78d9" />

### AI Detection Analysis
<img width="1351" height="639" alt="AI Detection Analysis" src="https://github.com/user-attachments/assets/88e7649f-389a-4253-9082-1f657c8ed602" />

### Dark Mode Interface
<img width="1347" height="639" alt="Dark Mode Interface" src="https://github.com/user-attachments/assets/080714c3-0af7-465b-b548-de649647389f" />

### Detection Results
<img width="1350" height="638" alt="Detection Results" src="https://github.com/user-attachments/assets/9fec7eca-bca0-473a-81c5-541884e7c9e6" />

---

## 📁 Project Structure

```
Scientific-Paper-Generator-Detector/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AdvancedFileHandler.jsx
│   │   └── ToastContainer.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   └── useAppHooks.js
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! This project is designed for educational purposes and community improvement. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚖️ Disclaimer

**IMPORTANT EDUCATIONAL NOTICE**

This project is created **strictly for educational and awareness purposes only**. It is designed to:

- ✅ Demonstrate how AI-generated content can be identified
- ✅ Promote digital literacy and academic integrity awareness
- ✅ Provide a safe learning environment for understanding AI capabilities
- ✅ Help educators teach about academic fraud prevention

**This tool should NEVER be used for:**
- ❌ Actual academic submissions or coursework
- ❌ Circumventing academic integrity policies
- ❌ Creating content for publication or research
- ❌ Any form of academic dishonesty

The generated papers are intentionally fabricated and contain no real scientific value. Users are responsible for ensuring ethical use of this educational tool.

---

## 👨‍💻 Built By

**[Prem Hanchate](https://github.com/Prem-Hanchate)**

*Passionate developer dedicated to creating educational tools that promote digital literacy and academic integrity.*

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star! ⭐

**Made with ❤️ for educational purposes**

</div>