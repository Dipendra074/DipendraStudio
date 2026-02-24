######### Last Updated: 12 February 2026, 5:35 PM #########


PORTFOLIO CONFIGURATION GUIDE
Simple guide to customise your portfolio website.


==========================================================
WEBSITE STRUCTURE
==========================================================

Your website has these pages and sections:

📄 index.html - Main homepage
   - Hero section (big name + card)
   - Projects section (your work)
   - Resume section (experience + skills)
   - Contact section (form + social links)
   - Footer

📄 about.html - About Me page

🎨 styles.css - All styling and design

⚙️ script.js - All animations and interactions

📁 Images/ - Project images (drop-and-rename system)
   📁 designing/  - Graphic design work
   📁 photography/ - Photography work


==========================================================
HOW TO ADD YOUR PROJECT IMAGES (Drop & Rename)
==========================================================

Works just like the icons/ folder — drop your image, rename it, done!

📁 Folder structure:
   Images/
   ├── designing/    ← for Graphic Design cards
   └── photography/  ← for Photography cards

🎨 GRAPHIC DESIGN (Images/designing/):
   g_event_poster.webp      →  Card: "Event Poster Design"
   g_restaurant_menu.webp   →  Card: "Restaurant Menu"
   g_brand_identity.webp    →  Card: "Brand Identity"

📷 PHOTOGRAPHY (Images/photography/):
   p_golden_hour.webp       →  Card: "Golden Hour Landscapes"
   p_portrait_series.webp   →  Card: "Portrait Series"
   p_urban_stories.webp     →  Card: "Urban Stories"

HOW TO USE:
1. Take your image file
2. Rename it to match the slot (e.g. g_event_poster.webp or p_golden_hour.webp)
3. Drop it into the correct subfolder
4. Refresh the website — your image appears!

NOTE: The default format is .jpg — if you use .png or .webp,
      update the file extension in index.html to match.


==========================================================
HOW TO ADD YOUR VIDEOS
==========================================================

Video cards use YouTube embed. To add your real video:

1. Go to your YouTube video
2. Copy the video ID from the URL
   Example: youtube.com/watch?v=ABC123 -> the ID is ABC123

3. Open index.html and find the video card
4. Change data-video-id="dQw4w9WgXcQ" to your real video ID

   <div class="project-card video-card" data-category="video" data-video-id="YOUR_VIDEO_ID">


==========================================================
HOW TO CHANGE PROJECT TITLES AND DESCRIPTIONS
==========================================================

Each project card has this inside it:

   <span class="project-category">Graphic Design</span>
   <h3 class="project-title">Event Poster Design</h3>
   <p class="project-desc">Bold typography meets vibrant visuals.</p>

Just change the text between the tags to whatever you want.


==========================================================
HOW TO UPDATE YOUR SOCIAL LINKS
==========================================================

In index.html, search for "social-link" to find the social icons.
Each one looks like this:

   <a href="#" class="social-link" aria-label="Instagram">

Change the # to your real profile URL, for example:

   <a href="https://instagram.com/yourusername" class="social-link" aria-label="Instagram">


==========================================================
HOW TO CHANGE YOUR EMAIL
==========================================================

In index.html, search for "mailto:" to find the email link.
Change it to your real email:

   <a href="mailto:youremail@example.com">youremail@example.com</a>


==========================================================
HOW TO CHANGE COLORS
==========================================================

Open styles.css and look at the top (around line 6).
You will see these color settings:

   --accent: #C0F062           -> 🟢 Main green accent color
   --accent-hover: #d4ff7a     -> 🟢 Green on hover
   --bg-dark: #0A0A0A          -> ⬛ Background color
   --bg-card: #1A1A1A          -> ⬛ Card background
   --text-light: #F5F5F5       -> ⬜ Main text color
   --text-muted: #888888       -> 🔘 Faded text color

Change any hex color code to update the entire website theme.


==========================================================
HOW TO CHANGE THE BIG BACKGROUND TEXT
==========================================================

The large "Dipendra" and "Singh" text in the hero:

Open index.html, around line 40-41:

   <span class="bg-name-left">Dipendra</span>
   <span class="bg-name-right">Singh</span>

To change the size, open styles.css and search for bg-name-left.
Change the font-size value. Current: clamp(120px, 18vw, 250px)
   The last number (250px) is the max size


==========================================================
HOW TO UPDATE RESUME / EXPERIENCE
==========================================================

In index.html, search for "timeline-item" to find experience entries.
Each one has:

   <span class="timeline-date">2024 - Present</span>
   <h4 class="timeline-role">Freelance Editor</h4>
   <p class="timeline-desc">Description of what you did.</p>

Change the text to match your real experience.
Copy/paste the whole timeline-item div to add more entries.


==========================================================
HOW TO UPDATE SKILLS / TOOL BARS
==========================================================

In index.html, search for "tool-item" to find skill bars.
Each one has:

   <span class="tool-name">Adobe Premiere Pro</span>
   <div class="tool-bar"><div class="tool-fill" style="width: 90%"></div></div>

Change the tool name and the width percentage.
   90% = almost full bar
   50% = half bar

Add or remove tool-item divs to change the number of skills shown.


==========================================================
HOW TO ADD MORE PROJECT CARDS
==========================================================

Copy one of the existing project-card divs in index.html and paste
it inside the project-grid div. Make sure to set the right category:

   data-category="graphic-design"   -> shows under Graphic Design tab
   data-category="photography"      -> shows under Photography tab
   data-category="video"            -> shows under Video Editing tab


==========================================================
HOW TO CHANGE CARD EFFECTS
==========================================================

🟢 The animated green border on the ID card:
   In styles.css, search for snake-border
   Animation speed is set with animation duration (currently 4s)

🟢 The green glow around the card:
   In styles.css, search for drop-shadow
   Change the blur and opacity numbers

🟢 The 3D tilt effect:
   In script.js, look for the CONFIG object near the top
   maxTilt: 8 -> how much it tilts (higher = more tilt)
   perspective: 1200 -> depth effect


==========================================================
HOW TO CHANGE THE PORTRAIT IMAGE
==========================================================

Replace the file "portrait.png" in the project folder with your
own image. Keep the same filename or update it in index.html:

   <img src="portrait.webp" alt="Portrait" class="card-image">

Change "portrait.webp" to your new filename.


==========================================================
QUICK TIPS
==========================================================

🖼️ For images use .webp format (smallest size, best quality)
🎥 For videos always use YouTube/Vimeo embed, never host directly
📱 The site is already responsive for mobile
⚡ Use loading="lazy" on all images below the hero section
