######### Last Updated: 03 April 2026, 5:46 PM #########


PORTFOLIO CONFIGURATION GUIDE
(Simple step-by-step instructions to change anything on your website)


==========================================================
📁 YOUR FILES
==========================================================

index.html    → Main homepage (all sections)
about.html    → About Me page
styles.css    → All colors, fonts, sizing
script.js     → Animations and interactions
Images/       → Your project images
  designing/  → Graphic design images
  photography/→ Photography images
  Videos/     → Video thumbnails


==========================================================
🖼️ CHANGE PROJECT IMAGES
==========================================================

Step 1: Open the folder → Images/designing/ or Images/photography/
Step 2: Rename your image to match one of these names:

   GRAPHIC DESIGN (put in Images/designing/):
   grey_porsche_poster1.webp   → "Event Poster Design" card
   the_g_wagon_pink2.webp      → "Restaurant Menu" card
   the_martian4.webp           → "Brand Identity" card (1st)
   yellow_porsche3.webp        → "Brand Identity" card (2nd)

   PHOTOGRAPHY (put in Images/photography/):
   p_golden_hour.webp          → "Golden Hour Landscapes" card
   p_portrait_series.webp      → "Portrait Series" card
   p_urban_stories.webp        → "Urban Stories" card

Step 3: Drop the renamed file into the correct folder
Step 4: Refresh the website — done!

TIP: Use .webp format for best quality and small file size.


==========================================================
🎬 CHANGE VIDEO LINKS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: video-card
Step 3: You will see 3 video cards. Each has either:

   FOR YOUTUBE SHORTS (opens in new tab):
   data-video-url="https://youtube.com/shorts/EHhlIfNR8KQ"
   → Just paste the full YouTube Shorts link

   FOR REGULAR YOUTUBE VIDEOS (plays in popup on your site):
   data-video-id="dQw4w9WgXcQ"
   → Paste only the video ID (the part after v= in the URL)

   HOW TO GET VIDEO ID:
   → youtube.com/watch?v=ABC123 → ID is ABC123
   → youtube.com/shorts/ABC123  → use full URL with data-video-url

NOTE: YouTube Shorts usually can't play inside your website
      (embedding blocked). Use data-video-url for Shorts so
      they open on YouTube directly.


==========================================================
🖼️ CHANGE VIDEO THUMBNAILS
==========================================================

Step 1: Put your thumbnail image in → Images/Videos/
Step 2: Open index.html
Step 3: Press Ctrl+F and search for: project-thumbnail placeholder-gradient
Step 4: Inside the video card, find the <img> tag:

   <img src="Images/Videos/The Om jari nylon video thumbnail.webp" alt="OM NYLON" loading="lazy">

Step 5: Change the filename to your new thumbnail

Current thumbnails:
   1st video → Images/Videos/The Om jari nylon video thumbnail.webp
   2nd video → no thumbnail yet (shows gradient background)
   3rd video → no thumbnail yet (shows gradient background)


==========================================================
✏️ CHANGE PROJECT TITLES & DESCRIPTIONS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: project-title
Step 3: You will see lines like:

   <h3 class="project-title">OM NYLON Promotional Video Edit</h3>
   <p class="project-desc">Promotional video edit for OM NYLON brand.</p>

Step 4: Change the text between > and < to your new title/description


==========================================================
🔗 CHANGE SOCIAL MEDIA LINKS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: social-link
Step 3: You will see 4 links. Change the URL inside href="...":

   Instagram → currently: https://www.instagram.com/dipendra00800/
   YouTube   → currently: #  (replace # with your YouTube link)
   LinkedIn  → currently: https://www.linkedin.com/in/dipendra-singh-a421a8315
   X/Twitter → currently: https://x.com/Dipendraa_Singh


==========================================================
📧 CHANGE YOUR EMAIL
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: mailto:
Step 3: You will see:

   <a href="mailto:dipendraclick08@gmail.com">dipendraclick08@gmail.com</a>

Step 4: Replace BOTH places with your new email


==========================================================
🎨 CHANGE COLORS
==========================================================

Step 1: Open styles.css
Step 2: Look at the top (line 6-16), you will see:

   --accent: #C0F062           → 🟢 Green accent color
   --accent-hover: #d4ff7a     → 🟢 Green on hover
   --bg-dark: #0A0A0A          → ⬛ Page background
   --bg-card: #1A1A1A          → ⬛ Card background
   --text-light: #F5F5F5       → ⬜ Main text
   --text-muted: #888888       → 🔘 Faded text

Step 3: Change any color code (e.g. #C0F062) to your new color
        This updates the ENTIRE website at once!


==========================================================
🅰️ CHANGE THE BIG BACKGROUND NAME
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: bg-name-left
Step 3: You will see:

   <span class="bg-name-left">Dipendra</span>
   <span class="bg-name-right">Singh</span>

Step 4: Change "Dipendra" and "Singh" to whatever you want

TO CHANGE SIZE:
Step 1: Open styles.css
Step 2: Search for: bg-name-left
Step 3: Find: font-size: clamp(120px, 18vw, 250px)
Step 4: Change 250px to make it bigger or smaller


==========================================================
🏷️ CHANGE THE TOP-LEFT NAME (GREEN TEXT)
==========================================================

Step 1: Open index.html
Step 2: Look at line 33-38, you will see:

   <a href="index.html" class="nav-brand ml11">
       <span class="letters">Dipendra Singh</span>
   </a>

Step 3: Change "Dipendra Singh" to your name
NOTE: Clicking this name reloads the homepage.


==========================================================
💼 CHANGE RESUME / EXPERIENCE
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: timeline-item
Step 3: Each experience looks like this:

   <span class="timeline-date">2024 — Present</span>
   <h4 class="timeline-role">Freelance Editor & Designer</h4>
   <p class="timeline-desc">Creating visual content for clients.</p>

Step 4: Change the date, role, and description

TO ADD MORE: Copy the entire timeline-item block and paste below it.


==========================================================
📊 CHANGE SKILL BARS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: tool-name
Step 3: Each skill looks like this:

   <span class="tool-name">Adobe Premiere Pro</span>
   <div class="tool-fill" style="width: 90%"></div>

Step 4: Change the tool name and the width %
        90% = almost full bar, 50% = half bar

TO ADD MORE: Copy a full tool-item block and paste below it.


==========================================================
📸 CHANGE YOUR PORTRAIT IMAGE
==========================================================

Step 1: Name your new photo as portrait.webp
Step 2: Drop it in the main project folder (replace the old one)
Step 3: Refresh — done!

OR if you want a different filename:
Step 1: Open index.html
Step 2: Search for: portrait.webp
Step 3: Change it to your new filename


==========================================================
➕ ADD MORE PROJECT CARDS
==========================================================

Step 1: Open index.html
Step 2: Search for: project-card
Step 3: Copy one full project-card block
Step 4: Paste it inside the project-grid section
Step 5: Set the right category in the opening tag:

   data-category="graphic-design"  → shows in Graphic Design tab
   data-category="photography"     → shows in Photography tab
   data-category="video"           → shows in Video Editing tab


==========================================================
✨ CHANGE CARD EFFECTS
==========================================================

GREEN ANIMATED BORDER:
→ Open styles.css, search for: snake-border
→ Change animation speed: currently 4s (smaller = faster)

GREEN GLOW:
→ Open styles.css, search for: drop-shadow
→ Change the number to make glow bigger/smaller

3D TILT EFFECT:
→ Open script.js, look near the top for: maxRotation
→ Change 20 to a higher number = more tilt


==========================================================
🔲 CHANGE THE GRID VIGNETTE
==========================================================

The background grid fades at the edges (vignette effect).

Step 1: Open styles.css
Step 2: Search for: grid-overlay
Step 3: Find the line with mask-image:

   mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);

   70% 60% = size of visible grid (bigger = more grid shows)
   30%     = center clear area (bigger = bigger clear center)

TO REMOVE VIGNETTE: Delete the mask-image and -webkit-mask-image lines.


==========================================================
📝 CHANGE CONTACT FORM INPUT LOOK
==========================================================

Step 1: Open styles.css
Step 2: Search for: .form-group input
Step 3: You will see:

   background: #1A1A1A;     → input color (normal)
   background: #1f1f1f;     → input color (when typing)

Step 4: Change the color code to make inputs lighter/darker
TIP: Use solid colors (like #1A1A1A) so the grid doesn't show through.


==========================================================
🔗 CHANGE GLASS DOCK LINKS & TOOLTIPS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: id="glassDock"
Step 3: You will see lines like:

   <a href="https://instagram.com/..." class="dock-item" data-title="Instagram">

Step 4: Change the href="..." to your new link.
Step 5: Change the data-title="..." to change the text that appears in the tooltip.


==========================================================
✨ CHANGE LIGHT LINES BACKGROUND
==========================================================

TO CHANGE COLORS & OPACITY:
Step 1: Open index.html
Step 2: Press Ctrl+F and search for: lightLinesContainer
Step 3: You will see two groups:
   ll-lines  → The static vertical lines (currently style="opacity: 0")
   ll-lights → The moving green trails (currently style="opacity: 0.3")
Step 4: Change style="fill: #ffffff" (for lines) or style="fill: #00ff88" (for lights) to your new color code.
Step 5: Change the opacity number (0 to 1) to make them more or less visible.

TO CHANGE SPEED:
Step 1: Open script.js
==========================================================
🎨 CHANGE COLORS
==========================================================

Step 1: Open styles.css
Step 2: Look at the top (line 6-16), you will see:

   --accent: #C0F062           → 🟢 Green accent color
   --accent-hover: #d4ff7a     → 🟢 Green on hover
   --bg-dark: #0A0A0A          → ⬛ Page background
   --bg-card: #1A1A1A          → ⬛ Card background
   --text-light: #F5F5F5       → ⬜ Main text
   --text-muted: #888888       → 🔘 Faded text

Step 3: Change any color code (e.g. #C0F062) to your new color
        This updates the ENTIRE website at once!


==========================================================
🅰️ CHANGE THE BIG BACKGROUND NAME
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: bg-name-left
Step 3: You will see:

   <span class="bg-name-left">Dipendra</span>
   <span class="bg-name-right">Singh</span>

Step 4: Change "Dipendra" and "Singh" to whatever you want

TO CHANGE SIZE:
Step 1: Open styles.css
Step 2: Search for: bg-name-left
Step 3: Find: font-size: clamp(120px, 18vw, 250px)
Step 4: Change 250px to make it bigger or smaller


==========================================================
🏷️ CHANGE THE TOP-LEFT NAME (GREEN TEXT)
==========================================================

Step 1: Open index.html
Step 2: Look at line 33-38, you will see:

   <a href="index.html" class="nav-brand ml11">
       <span class="letters">Dipendra Singh</span>
   </a>

Step 3: Change "Dipendra Singh" to your name
NOTE: Clicking this name reloads the homepage.


==========================================================
💼 CHANGE RESUME / EXPERIENCE
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: timeline-item
Step 3: Each experience looks like this:

   <span class="timeline-date">2024 — Present</span>
   <h4 class="timeline-role">Freelance Editor & Designer</h4>
   <p class="timeline-desc">Creating visual content for clients.</p>

Step 4: Change the date, role, and description

TO ADD MORE: Copy the entire timeline-item block and paste below it.


==========================================================
📊 CHANGE SKILL BARS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: tool-name
Step 3: Each skill looks like this:

   <span class="tool-name">Adobe Premiere Pro</span>
   <div class="tool-fill" style="width: 90%"></div>

Step 4: Change the tool name and the width %
        90% = almost full bar, 50% = half bar

TO ADD MORE: Copy a full tool-item block and paste below it.


==========================================================
📸 CHANGE YOUR PORTRAIT IMAGE
==========================================================

Step 1: Name your new photo as portrait.webp
Step 2: Drop it in the main project folder (replace the old one)
Step 3: Refresh — done!

OR if you want a different filename:
Step 1: Open index.html
Step 2: Search for: portrait.webp
Step 3: Change it to your new filename


==========================================================
➕ ADD MORE PROJECT CARDS
==========================================================

Step 1: Open index.html
Step 2: Search for: project-card
Step 3: Copy one full project-card block
Step 4: Paste it inside the project-grid section
Step 5: Set the right category in the opening tag:

   data-category="graphic-design"  → shows in Graphic Design tab
   data-category="photography"     → shows in Photography tab
   data-category="video"           → shows in Video Editing tab


==========================================================
✨ CHANGE CARD EFFECTS
==========================================================

GREEN ANIMATED BORDER:
→ Open styles.css, search for: snake-border
→ Change animation speed: currently 4s (smaller = faster)

GREEN GLOW:
→ Open styles.css, search for: drop-shadow
→ Change the number to make glow bigger/smaller

3D TILT EFFECT:
→ Open script.js, look near the top for: maxRotation
→ Change 20 to a higher number = more tilt


==========================================================
🔲 CHANGE THE GRID VIGNETTE
==========================================================

The background grid fades at the edges (vignette effect).

Step 1: Open styles.css
Step 2: Search for: grid-overlay
Step 3: Find the line with mask-image:

   mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);

   70% 60% = size of visible grid (bigger = more grid shows)
   30%     = center clear area (bigger = bigger clear center)

TO REMOVE VIGNETTE: Delete the mask-image and -webkit-mask-image lines.


==========================================================
📝 CHANGE CONTACT FORM INPUT LOOK
==========================================================

Step 1: Open styles.css
Step 2: Search for: .form-group input
Step 3: You will see:

   background: #1A1A1A;     → input color (normal)
   background: #1f1f1f;     → input color (when typing)

Step 4: Change the color code to make inputs lighter/darker
TIP: Use solid colors (like #1A1A1A) so the grid doesn't show through.


==========================================================
🔗 CHANGE GLASS DOCK LINKS & TOOLTIPS
==========================================================

Step 1: Open index.html
Step 2: Press Ctrl+F and search for: id="glassDock"
Step 3: You will see lines like:

   <a href="https://instagram.com/..." class="dock-item" data-title="Instagram">

Step 4: Change the href="..." to your new link.
Step 5: Change the data-title="..." to change the text that appears in the tooltip.


==========================================================
✨ CHANGE LIGHT LINES BACKGROUND
==========================================================

TO CHANGE COLORS & OPACITY:
Step 1: Open index.html
Step 2: Press Ctrl+F and search for: lightLinesContainer
Step 3: You will see two groups:
   ll-lines  → The static vertical lines (currently style="opacity: 0")
   ll-lights → The moving green trails (currently style="opacity: 0.3")
Step 4: Change style="fill: #ffffff" (for lines) or style="fill: #00ff88" (for lights) to your new color code.
Step 5: Change the opacity number (0 to 1) to make them more or less visible.

TO CHANGE SPEED:
Step 1: Open script.js
Step 2: Press Ctrl+F and search for: duration
Step 3: Look for the line inside Animated Light Lines section:
   const duration = (Math.floor(Math.random() * 59) + 2) * 0.5 + 0.5;
Step 4: Decrease numbers (e.g., * 30 instead of * 59) to make them move faster.

TO CHANGE WHERE THE ANIMATION STOPS:
Step 1: Open script.js
Step 2: Press Ctrl+F and search for: projectsSection
Step 3: The animation currently stops at the bottom of your projects. 
        To change this, replace 'projects' with the ID of another section.


==========================================================
🔎 IMAGE LIGHTBOX (DOUBLE-CLICK TO ENLARGE)
==========================================================

When you double-click any regular project card, it opens in a large Image Lightbox.
This works automatically! The lightbox uses the image, title, and description from the card you double-clicked.

HOW TO CHANGE THE LIGHTBOX OVERLAY COLOR:
Step 1: Open styles.css
Step 2: Press Ctrl+F and search for: .lightbox-modal
Step 3: Find: background: rgba(0, 0, 0, 0.8);
Step 4: Change 0.8 to a higher number (e.g., 0.95 or 1) for a darker background, or lower (e.g., 0.5) for a lighter background.

HOW IT WORKS WITH DIFFERENT TYPES OF CARDS:
- Graphic Design & Photography cards: They open in the typical Image Lightbox.
- Video cards: Because they have class="video-card", they ignore the Image Lightbox and open the Video Player instead.
