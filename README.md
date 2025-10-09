# School Management System (MIMS)

A comprehensive school management system built with React, Vite, Tailwind CSS, and Supabase. This system provides complete management capabilities for schools including student management, academic records, financial tracking, and communication features.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - Role-based access control (Admin, Teacher, Bursar, Student)
- **Student Management** - Complete student registration, profiles, and clearance workflows
- **Academic Management** - Class management, subject tracking, and results upload
- **Financial Management** - Fee structure, payment tracking, and financial reports
- **Messaging System** - Bulk SMS capabilities and announcement management
- **Admin & Approval System** - System configuration and approval workflows

### User Roles
- **Admin**: Full system access, user management, approval workflows
- **Teacher**: Class management, results upload, student records
- **Bursar**: Fee management, payment tracking, financial reports
- **Student**: View own records and results (future integration)

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: Custom components with Lucide React icons
- **Routing**: React Router v6
- **State Management**: React Context API
- **Charts**: Recharts (ready for implementation)

## 📁 Project Structure

```
misms/
├── .env                           # Environment variables
├── database_schema.sql            # Complete database schema
├── package.json
├── tailwind.config.js
├── vite.config.js
│
└── src/
    ├── main.jsx                   # Application entry point
    ├── App.jsx                    # Main app component with routing
    │
    ├── lib/                       # Core services
    │   ├── supabaseClient.js      # Supabase configuration
    │   ├── auth.js                # Authentication services
    │   ├── api.js                 # API service layer
    │   └── helpers.js             # Utility functions
    │
    ├── context/                   # React Context providers
    │   ├── AuthContext.jsx        # Authentication state
    │   ├── RoleContext.jsx        # Role-based permissions
    │   └── ThemeContext.jsx       # Theme management
    │
    ├── components/                # Reusable UI components
    │   ├── common/                # Common components
    │   └── charts/                # Chart components
    │
    ├── layouts/                   # Layout components
    │   ├── AdminLayout.jsx        # Main admin layout
    │   ├── AuthLayout.jsx         # Authentication layout
    │   └── BlankLayout.jsx        # Minimal layout
    │
    ├── routes/                    # Route protection
    │   ├── ProtectedRoute.jsx     # Authentication guard
    │   └── RoleBasedAccess.jsx    # Role-based access control
    │
    ├── pages/                     # Page components
    │   ├── dashboard/             # Dashboard pages
    │   ├── auth/                  # Authentication pages
    │   ├── students/              # Student management
    │   ├── staff/                 # Staff management
    │   ├── academics/             # Academic management
    │   ├── finance/               # Financial management
    │   ├── messaging/             # Communication features
    │   ├── system/                # System administration
    │   └── errors/                # Error pages
    │
    └── assets/                    # Static assets
        ├── images/
        ├── icons/
        └── styles/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd misms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `database_schema.sql` in your Supabase SQL editor
   - Get your project URL and anon key from Supabase settings

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎨 Design System

### Color Theme
- **Primary Color**: #2563EB (Blue)
- **Secondary Colors**: Gray scale palette
- **Status Colors**: Green (success), Red (error), Yellow (warning)

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Forms**: Input, Select, Textarea with validation
- **Tables**: Sortable, filterable, paginated data tables
- **Cards**: Stat cards, info cards, content cards
- **Modals**: Confirmation dialogs and form modals

## 🔐 Authentication & Authorization

### User Roles & Permissions
- **Admin**: Full system access
- **Teacher**: Academic management, student records
- **Bursar**: Financial management, payment processing
- **Student**: View own records (future feature)

### Security Features
- Row Level Security (RLS) in Supabase
- Role-based route protection
- Permission-based component rendering
- Secure authentication with Supabase Auth

## 📊 Database Schema

The system uses a comprehensive PostgreSQL schema with the following main entities:

- **Users**: Authentication and profile data
- **Students**: Student information and academic records
- **Staff**: Staff information and employment details
- **Classes**: Academic classes and sections
- **Subjects**: Curriculum subjects
- **Results**: Academic results and grades
- **Fees**: Fee structure and student fees
- **Payments**: Payment records and tracking
- **Messages**: Communication and announcements
- **System Logs**: Audit trail and activity logs

## 🚧 Development Status

### ✅ Completed
- Project setup and configuration
- Authentication system with role-based access
- Core UI components and layouts
- Database schema design
- Basic routing and navigation
- Dashboard with mock data

### 🚧 In Progress
- Student management features
- Academic management system
- Financial management tools
- Messaging system
- Admin panel features

### 📋 TODO
- Chart implementations with Recharts
- SMS integration for messaging
- File upload capabilities
- Advanced reporting features
- Mobile responsiveness optimization
- Testing implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Backend powered by Supabase
- Icons by Lucide React

