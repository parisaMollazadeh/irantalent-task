# irantalent-task

irantalent recruitment task

# **Custom Select Box Component**

A reusable and customizable `SelectBox` component built with Next.js, React and TypeScript. The component supports single and multi-selection, search functionality, and dynamic data input.

---

## **Features**

- **Single and Multi-Selection**: The component supports both single and multiple item selection modes.
- **Searchable Dropdown**: Allows users to filter options dynamically using a search bar.
- **Customizable Options**: Accepts options as props, making it reusable with any dataset.
- **Dynamic Behavior**:
  - Selected items are displayed at the top of the dropdown.
  - If multiple items are selected, the count is displayed.
- **TypeScript Integration**: Ensures type safety and better development experience.

---

## **Technologies Used**

- **Next.js** (v15.1.7)
- **React** (v19.0.0): Frontend library for building user interfaces.
- **TypeScript**: Ensures type safety and reliable code.
- **CSS Modules**: For scoped, reusable, and clean styles.
- **HTML/CSS**: For structure and styling of components.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** (v20 or higher)
- **npm** or **yarn**

---

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/parisaMollazadeh/irantalent-task.git
   cd select-box-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## **GitFlow Guide for Component Development**

This project follows a structured GitFlow workflow for feature, component, and hotfix management. Below is a guide on how to handle component branches in this workflow to ensure smooth collaboration and maintainability.

---

### **Component Branches Workflow**

#### **1. Branch Naming Convention**

When working on individual components, the branch name should follow this structure:

```
component/<component-name>
feature/<feature-name>
```

- **Example**: `component/select-box`

#### hooks

The `hooks` directory contains global and shared hooks utilized across the
application.
