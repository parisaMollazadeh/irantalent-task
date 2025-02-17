# irantalent-task

This project is a **custom Select Box component** built with **Next.js, React, and TypeScript**. It supports **single and multi-selection, search functionality**, and **dynamic data input**.

---

## **Features**

- **Single and Multi-Selection**: The component supports both selection modes.
- **Searchable Dropdown**: Users can filter options dynamically.
- **Customizable Options**: The component accepts props, making it reusable with any dataset.
- **Dynamic Behavior**:
  - Selected items appear at the top of the dropdown.
  - If multiple items are selected, the count is displayed.
- **TypeScript Integration**: Ensures type safety and better development experience.

---

## **Technologies Used**

- **Next.js** (v15.1.7)
- **React** (v19.0.0)
- **TypeScript**
- **CSS Modules**
- **HTML/CSS**

---

## **Getting Started**

### **Prerequisites**
Ensure you have installed:
- **Node.js** (v22 or higher)
- **npm** or **yarn**

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/parisaMollazadeh/irantalent-task.git
   cd select-box-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Branching Strategy (Git Flow)**

This project follows a structured **GitFlow** workflow.

### **Branching Naming Convention**

| Branch Type  | Naming Convention             | Example |
|-------------|-------------------------------|---------|
| **Main**   | `main` (final stable branch)   | `main`  |
| **Feature** | `feature/<feature-name>`      | `feature/search-box` |
| **Component** | `component/<component-name>` | `component/select-box` |
| **Fix** | `fix/<fix-name>` | `fix/input-bug` |

### **Merging Strategy**
- **`feature/*` → `develop`** (via Pull Request)
- **`develop` → `main`** (only stable releases)
- **Bugfixes (`fix/*`) merge into `develop` and `main`**

---

## **Prettier Configuration**

### **What is Prettier?**
Prettier is a **code formatter** that enforces a consistent style in your project.

### **Installation**
Install Prettier as a development dependency:
```bash
npm install --save-dev prettier
```

### **Configuration (`.prettierrc`)**
Create a `.prettierrc` file with the following rules:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### **Run Prettier in `package.json`**
Modify your `package.json` scripts:
```json
"scripts": {
  "format": "prettier --write \"**/*.{js,ts,tsx,json,css,md}\""
}
```

Run the formatter:
```bash
npm run format
```

---


## **Interfaces Folder (`interfaces/`)
The `interfaces/` folder contains **TypeScript type definitions** for reusability.

Example: `interfaces/SelectOption.ts`
```ts
export interface SelectOption {
  id: string;
  name: string;
}
```

---

## **Utils Folder (`utils/`)
The `utils/` folder contains **helper functions** used across components.

Example: `utils/array.ts`
```ts
export function filterArrayWithStringField<T>(
  array: T[], searchTerm: string, field: keyof T
): T[] {
  return array.filter((item) =>
    String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
  );
}
```

---

## **Final Notes**
- The **`main` branch** is the final branch, only stable code is merged.
- Follow **GitFlow** to manage features, fixes, and releases.
- Use **Prettier** for consistent code formatting.
- Maintain **interfaces** and **utils** for reusable and scalable code.
