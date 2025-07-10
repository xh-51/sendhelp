# Portfolio Website Structure

- `html/` — HTML files (one per page, e.g., index.html, about.html, projects.html)
- `css/` — CSS files (e.g., style.css)
- `js/` — JavaScript files (e.g., main.js)

## Adding New Pages
1. Create a new HTML file in the `html/` folder (e.g., about.html).
2. Link to the shared CSS and JS files using:
   ```html
   <link rel="stylesheet" href="../css/style.css">
   <script src="../js/main.js"></script>
   ```
3. Add navigation links between pages as needed. 
