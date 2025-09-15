# 🛒 PcWala - Premium PC Components E-commerce Platform

<div align="center">

![PcWala Logo](https://img.shields.io/badge/PcWala-PC%20Parts%20%26%20Components-blue?style=for-the-badge&logo=computer&logoColor=white)

**Build Your Dream Gaming PC with Premium Components**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-success?style=for-the-badge)](https://ecommerce-project-b5iz.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/📁%20Repository-View%20Code-black?style=for-the-badge&logo=github)](https://github.com/Tigmanshukumar/ecommerce_project)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [🔧 Installation](#-installation)
- [💻 Usage](#-usage)
- [👨‍💼 Admin Panel](#-admin-panel)
- [📱 Screenshots](#-screenshots)
- [🌟 Key Highlights](#-key-highlights)
- [🔮 Future Enhancements](#-future-enhancements)
- [👤 Author](#-author)
- [📄 License](#-license)

---

## ✨ Features

### 🛍️ **Customer Features**
- **User Authentication** - Secure registration and login system
- **Product Catalog** - Browse premium PC components with detailed specifications
- **Advanced Search & Filtering** - Find products by category, price range, and specifications
- **Shopping Cart** - Add/remove items with real-time price calculations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Product Categories** - Organized sections for CPUs, GPUs, RAM, Storage, and more
- **Price Management** - Dynamic pricing with discount calculations

### 👨‍💼 **Admin Panel Features**
- **Product Management** - Create, edit, and delete products
- **Inventory Control** - Track stock levels and manage availability
- **Order Management** - View and process customer orders
- **User Management** - Monitor user accounts and activities
- **Analytics Dashboard** - Sales reports and performance metrics
- **Category Management** - Organize products into relevant categories
- **Bulk Operations** - Efficient management of multiple products

### 🔒 **Security & Performance**
- Secure authentication system
- Data validation and sanitization
- Optimized database queries
- Responsive and fast loading interface

---

## 🚀 Demo

🌐 **Live Website:** [https://ecommerce-project-b5iz.onrender.com/](https://ecommerce-project-b5iz.onrender.com/)

### Demo Credentials
```
Customer Account:
- Register your own account or browse as guest

Admin Panel:
- Access through /admin route
- Demo admin credentials available on request
```

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 🏗️ Project Architecture

```
ecommerce_project/
├── 📁 public/
│   ├── 🎨 css/
│   ├── 📜 js/
│   └── 🖼️ images/
├── 📁 views/
│   ├── 🏠 pages/
│   ├── 🧩 partials/
│   └── 👨‍💼 admin/
├── 📁 models/
│   ├── 👤 User.js
│   ├── 🛍️ Product.js
│   └── 🛒 Order.js
├── 📁 routes/
│   ├── 🔐 auth.js
│   ├── 🛍️ products.js
│   └── 👨‍💼 admin.js
├── 📁 middleware/
├── 📁 config/
└── 🚀 app.js
```

---

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Tigmanshukumar/ecommerce_project.git
cd ecommerce_project
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Create .env file in root directory
touch .env

# Add the following variables:
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
```

4. **Database Setup**
```bash
# Make sure MongoDB is running
# The application will create necessary collections automatically
```

5. **Start the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. **Access the application**
```
🌐 Website: http://localhost:3000
👨‍💼 Admin Panel: http://localhost:3000/admin
```

---

## 💻 Usage

### For Customers:
1. **Browse Products** - Explore various PC components
2. **Register Account** - Create an account for personalized experience
3. **Add to Cart** - Select desired products and quantities
4. **Checkout Process** - Complete purchase with secure payment
5. **Order Tracking** - Monitor order status and delivery

### For Administrators:
1. **Access Admin Panel** - Login with admin credentials
2. **Manage Products** - Add new products with images and specifications
3. **Process Orders** - Review and fulfill customer orders
4. **Monitor Analytics** - Track sales performance and inventory
5. **User Management** - Handle customer accounts and support

---

## 👨‍💼 Admin Panel

<div align="center">

### Key Admin Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Overview of sales, orders, and inventory |
| 🛍️ **Product Management** | Add, edit, delete products with rich details |
| 📦 **Inventory Control** | Track stock levels and availability |
| 👥 **User Management** | Monitor and manage customer accounts |
| 📈 **Sales Analytics** | Detailed reports and performance metrics |
| 🎨 **Customization** | Modify product display and categorization |

</div>

---

## 📱 Screenshots

<div align="center">

### 🏠 Homepage & Authentication
![Homepage](https://i.postimg.cc/L6kwXpFH/ecommerce-project-b5iz-onrender-com.png)

*Clean and professional homepage with user authentication*

### 🛍️ Product Catalog
![Product Catalog](https://i.postimg.cc/rFy3KHVx/ecommerce-project-b5iz-onrender-com-shop.png)

*Comprehensive product listing with advanced filtering*

### 👨‍💼 Admin Dashboard
![Admin Dashboard](https://i.postimg.cc/kMk4FWHj/ecommerce-project-b5iz-onrender-com-owners-products.png)
*Powerful admin panel for complete store management*

### 📝 Product Management
![Product Management](https://i.postimg.cc/3JPqnxjC/ecommerce-project-b5iz-onrender-com-owners-admin.png)
*Easy-to-use product creation and management interface*

</div>

---

## 🌟 Key Highlights

### 🎯 **Business Impact**
- **Complete E-commerce Solution** - End-to-end shopping experience
- **Scalable Architecture** - Built for growth and expansion
- **Mobile-First Design** - Optimized for all device types
- **SEO Friendly** - Structured for search engine visibility

### 💡 **Technical Excellence**
- **Clean Code Architecture** - Maintainable and organized codebase
- **Security Best Practices** - Secure authentication and data handling
- **Performance Optimized** - Fast loading and responsive interface
- **Database Optimization** - Efficient queries and data management

### 🔧 **Development Features**
- **Modular Structure** - Easy to extend and maintain
- **Error Handling** - Comprehensive error management
- **Input Validation** - Secure data processing
- **Responsive Design** - Cross-platform compatibility

---

## 🔮 Future Enhancements

### 🚀 Planned Features
- [ ] **Payment Integration** - Stripe, PayPal, Razorpay
- [ ] **Real-time Chat** - Customer support system
- [ ] **Wishlist Feature** - Save products for later
- [ ] **Reviews & Ratings** - Product feedback system
- [ ] **Advanced Analytics** - Detailed business insights
- [ ] **Multi-vendor Support** - Marketplace functionality
- [ ] **Mobile App** - React Native mobile application
- [ ] **AI Recommendations** - Personalized product suggestions

### 🛠️ Technical Improvements
- [ ] **Redis Caching** - Enhanced performance
- [ ] **GraphQL API** - More efficient data fetching
- [ ] **Microservices** - Scalable architecture
- [ ] **Docker Deployment** - Containerized application
- [ ] **Progressive Web App** - Offline functionality
- [ ] **Advanced Search** - Elasticsearch integration

---

## 🤝 Contributing

We welcome contributions to make PcWala even better!

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 👤 Author

<div align="center">

### **Tigmanshu Kumar**
*Full Stack Developer | MERN Stack Specialist*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](YOUR_LINKEDIN_URL)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tigmanshukumar)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tigmanshukumar5@gmail.com)

📍 **Location:** Muzaffarpur, Bihar, India  
💼 **Current Role:** Frontend Developer @ Alpha Web & App Solutions  
🎓 **Education:** BCA Student at IGNOU

</div>

---

## 📊 Project Statistics

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/Tigmanshukumar/ecommerce_project?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Tigmanshukumar/ecommerce_project?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/Tigmanshukumar/ecommerce_project?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Tigmanshukumar/ecommerce_project?style=for-the-badge)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Inspiration:** Modern e-commerce platforms
- **Design:** Clean and professional UI/UX principles
- **Community:** Open source contributors and developers
- **Learning:** Continuous improvement and best practices

---

<div align="center">

### 🌟 **Star this repository if you found it helpful!** 🌟

**Made with ❤️ by [Tigmanshu Kumar](https://github.com/Tigmanshukumar)**

[![GitHub stars](https://img.shields.io/github/stars/Tigmanshukumar/ecommerce_project?style=social)](https://github.com/Tigmanshukumar/ecommerce_project/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Tigmanshukumar/ecommerce_project?style=social)](https://github.com/Tigmanshukumar/ecommerce_project/network)

---

*© 2025 PcWala. All rights reserved.*

</div>
