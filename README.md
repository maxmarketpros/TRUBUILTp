# TruBuilt Projects Micro-Site

This is a production-ready Projects micro-site for TruBuilt, built with Next.js 14+ (App Router), Tailwind CSS, and Framer Motion. It dynamically reads project data from the filesystem.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Managing Projects

All project data is stored in the `Website Project Pages` folder. Each subfolder represents a single project.

### Adding a New Project
1. Create a new folder inside `Website Project Pages`. The folder name will be used as the project slug (e.g., `Luxury Trex Deck Sedalia`).
2. Add a description document (supported: `.docx`, `.txt`, `.md`).
3. Add project images (supported: `.jpg`, `.jpeg`, `.png`, `.webp`).

### Document Formatting (Recommended Template)
The parser searches for specific keywords. Use the following template for best results:

```text
Title: My Amazing Deck Project
Category: Decking
Type: Custom Build

This is the short description that will appear on the card.

This is the longer body text for the detail page. You can add as much detail as you like here.

Review: TruBuilt did an amazing job! Our deck looks incredible and the team was professional throughout.
Happy Homeowner
```

*Note: The signature line (Happy Homeowner) should immediately follow the "Review:" or "Testimonial:" line.*

### Categorizing Images
The site automatically categorizes images into "Before" and "After" galleries based on:

1. **Subfolders**: Create a folder named `before` and a folder named `after` inside the project folder.
2. **Filenames**: Include the word "before" or "after" in the filename (e.g., `deck-before-shot.jpg`).
3. **Featured Image**: To set a specific image as the main cover, include one of these words in the filename: `cover`, `hero`, `featured`, `finished`.
4. **Default**: If no categorization is found, images are treated as "After" photos.

## Deployment
This app is designed to be deployed to `projects.trubuilt.co`. 
- Ensure the `Website Project Pages` folder is included in the deployment.
- For Vercel or similar platforms, ensure that filesystem access is possible if not using standard static generation. (The current setup uses `generateStaticParams` for SSG compatibility where possible).

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Parser**: Mammoth (for .docx)
