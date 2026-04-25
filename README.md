# Portfolio Site Maintenance Guide

This is a lightweight, single-page portfolio built with high-performance Vanilla HTML, CSS, and JS.

## How to Edit Text
1. Open `index.html` in any text editor (like Notepad, VS Code, or Sublime Text).
2. Look for the text you want to change (e.g., your name or bio).
3. Replace the text between the HTML tags (e.g., `<h1>Replace this</h1>`).
4. Save the file and refresh your browser.

## How to Update the Image
1. Find a professional photo of yourself.
2. Rename it to `professional_headshot.png` (or `.jpg`).
3. Replace the existing `professional_headshot.png` file in this folder with your new one.
4. If your new image has a different extension (like `.jpg`), update the `src` attribute in `index.html` (Line 46):
   ```html
   <img src="your_new_image.jpg" ...>
   ```

## How to Change Colors
1. Open `style.css`.
2. Find the `:root` section at the top.
3. Change the hex code for `--accent` (currently indigo `#6366f1`) to any color you prefer.
   - Example for Sage Green: `--accent: #82a3a1;`

## Technologies Used
- **HTML5**: Semantic structure for SEO and accessibility.
- **CSS3**: Custom design system with CSS Variables.
- **JavaScript**: Minimal logic for animations.
- **Lucide Icons**: Crisp SVG icons.
- **Google Fonts**: Outfit (Headings) and Inter (Body).
