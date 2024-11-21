Certainly! Below is the **`Style.md`** file that outlines the styles and guidelines for creating a **dark-themed Address Book web app**. The design will resemble the sleek, minimal UI of ChatGPT with added features like a landing page, loading page animations, and the ability to view/hide the contact list.

---

# **Style.md - Address Book Web App**

## **General Design Principles**
- **Theme**: Dark mode first, with high contrast for readability.
- **Typography**: Clean, sans-serif fonts for modern and professional aesthetics.
- **Colors**: Neutral dark background with vibrant highlights for interactivity.
- **Animations**: Smooth transitions, with micro-interactions for a dynamic experience.

---

## **Color Palette**
| Element              | Color (Hex) |
|----------------------|-------------|
| Background           | #121212     |
| Card/Panel Background| #1E1E1E     |
| Primary Text         | #FFFFFF     |
| Secondary Text       | #BBBBBB     |
| Accent (Button/Link) | #00AAFF     |
| Hover (Accent)       | #0088CC     |
| Border               | #333333     |
| Error/Warning        | #FF5252     |
| Success              | #4CAF50     |

---

## **Typography**
- **Primary Font**: `Inter`, `Roboto`, or `Helvetica Neue` (Sans-serif).
- **Font Sizes**:
  - **Heading**: `24px` (bold).
  - **Subheading**: `18px` (medium).
  - **Body**: `16px` (regular).
  - **Caption**: `14px` (light).

---

## **Layout and Spacing**
- **Grid System**: 
  - 12-column responsive grid.
  - 16px gap between grid columns.
- **Padding and Margins**:
  - Section padding: `24px` (default), `16px` (compact).
  - Button padding: `12px 20px`.
- **Card Radius**: `8px`.

---

## **Landing Page**
- **Hero Section**: Centered text with a short tagline and a "Get Started" button.
  - **Animation**: Text zooms in and slides to the left when loading.
- **Background**: Subtle gradient (top-left to bottom-right):
  - From: #121212
  - To: #1E1E1E
- **Button Hover**:
  - Scale-up effect (`1.05` scale).
  - Color changes to accent hover color (#0088CC).

---

## **Loading Page**
- **Animation**: 
  - **Text Animation**: Use a loading spinner or pulsating dots below text.
  - **Page Transition**: Smooth page swap with a horizontal sliding animation (`ease-in-out`).
- **Font Style**: Large bold text, centered on the screen.
  - Example: `Loading... Please wait`.

---

## **Main Interface (Address Book)**
1. **Contact List Section**:
   - **Toggle**: 
     - Button/icon to show/hide the contact list.
     - Smooth sliding animation for the list.
   - **List Item Style**:
     - Avatar, name, and primary contact details.
     - Hover Effect: Slight elevation (box-shadow: `0 4px 8px rgba(0, 0, 0, 0.3)`).
   - **Empty State**:
     - Show a message like *"No contacts available. Add a new one!"* with a call-to-action button.

2. **Contact Details Section**:
   - **Card Layout**: Expandable/collapsible for each contact.
   - **Accent Line**: Vibrant accent line on the left of the expanded card.

3. **Add New Contact Button**:
   - Fixed position at the bottom right.
   - Circular floating button with an **Add** icon.
   - Hover effect: Glowing border.

---

## **Animations**
- **Page Load**:
  - Text zoom in (scale: 0.8 → 1) and slide left (`transform: translateX(-50%)`).
- **Contact List View**:
  - Smooth slide-in/out (`transform: translateX(0)` or `translateX(-100%)`).
  - Use `ease-in-out` for a polished effect.
- **Button Clicks**:
  - Ripple effect for tactile feedback.

---

## **Icons**
- Use a consistent icon pack like [Material Icons](https://fonts.google.com/icons).
- Examples:
  - Toggle Button: `menu` / `close`.
  - Add Contact: `add_circle`.

---

## **CSS Code Snippets**
Below are some quick examples of CSS implementations for the design principles.

### Dark Theme Base
```css
body {
  background-color: #121212;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scroll during animations */
}
```

### Buttons
```css
button {
  background-color: #00AAFF;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}
button:hover {
  background-color: #0088CC;
  transform: scale(1.05);
}
```

### Toggle Animation (Contact List)
```css
.contact-list {
  transform: translateX(-100%);
  transition: transform 0.4s ease-in-out;
}
.contact-list.open {
  transform: translateX(0);
}
```

### Loading Page Animation
```css
@keyframes zoomSlide {
  0% {
    transform: scale(0.8) translateX(50%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
}
.loading-text {
  animation: zoomSlide 1s ease-in-out;
  font-size: 24px;
  text-align: center;
}
```

---

## **Example Component Structure**
1. **Landing Page**:
   - Hero Section: Header, tagline, CTA button.
2. **Loading Page**:
   - Centered text with animation.
3. **Main Interface**:
   - Header with navigation.
   - Toggleable contact list.
   - Main content area for contact details.

---

Feel free to adapt this style guide to your framework of choice! Let me know if you need code samples in a specific technology like React, Vue, or vanilla HTML/CSS/JS.