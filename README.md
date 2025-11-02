# Hiền Tensai Blog

A modern Next.js blog powered by MySQL database and Prisma ORM, migrated from WordPress. This blog focuses on sharing stories about life, learning, and travel in Vietnamese.

## 📖 About

**Hiền Tensai Blog** is a personal blog platform that showcases articles about daily life, educational content, and travel experiences. Built with Next.js 16 App Router and optimized for Vietnamese content, the blog features a clean, Substack-inspired design with excellent performance and SEO capabilities.

### Blog Content Focus

- **Cuộc sống (Life)** - Personal stories and reflections
- **Học tập (Learning)** - Educational articles and tutorials
- **Du lịch (Travel)** - Travel experiences and guides

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development

### Database & ORM

- **MySQL** - Relational database
- **Prisma 6.18.0** - Type-safe ORM
- **mysql2** - MySQL driver

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **@tailwindcss/typography** - Typography plugin for blog content
- **shadcn/ui** - Reusable component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **tailwindcss-animate** - Animation utilities

### Development Tools

- **ESLint** - Code linting
- **Turbopack** - Fast bundler (built into Next.js 16)

## 🏗️ System Architecture

### Architecture Overview

The blog follows a modern full-stack architecture pattern:

1. **Frontend Layer** - Next.js App Router with Server Components for optimal performance
2. **API Layer** - Server-side data fetching with Prisma queries
3. **Database Layer** - MySQL database managed through Prisma ORM
4. **Static Generation** - Pages are pre-rendered at build time for maximum performance

### Rendering Strategy

- **Static Site Generation (SSG)** - All posts, pages, and category/tag listings are statically generated
- **Incremental Static Regeneration (ISR)** - Content can be updated without full rebuilds
- **Server Components** - Default rendering approach for better performance and SEO

## 📁 Project Structure

```
hientensai-blog/
├── app/                          # Next.js App Router (pages and routing)
│   ├── archive/                  # Archive page (monthly/yearly archives)
│   ├── author/                   # Author pages
│   │   └── [slug]/               # Individual author profiles
│   ├── category/                 # Category listings
│   │   └── [slug]/               # Category pages with posts
│   ├── feed/                     # RSS feed routes
│   ├── feed.xml/                 # RSS feed XML endpoint
│   ├── pages/                    # Static pages (About, Contact, etc.)
│   │   └── [slug]/               # Individual page routes
│   ├── posts/                    # Blog posts section
│   │   ├── [slug]/               # Individual post pages
│   │   ├── page.tsx              # Posts listing page
│   │   ├── loading.tsx             # Loading UI for posts
│   │   └── error.tsx              # Error boundary for posts
│   ├── search/                   # Search functionality
│   ├── tag/                      # Tag listings
│   │   └── [slug]/               # Tag pages with posts
│   ├── layout.tsx                # Root layout (Header, Footer)
│   ├── page.tsx                  # Homepage
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Global error boundary
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # XML sitemap generation
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── badge.tsx             # Badge component
│   │   ├── button.tsx            # Button component
│   │   └── card.tsx              # Card component
│   ├── Breadcrumbs.tsx           # Navigation breadcrumbs
│   ├── Footer.tsx                # Site footer
│   ├── Header.tsx                # Site header/navigation
│   ├── MobileMenu.tsx            # Mobile navigation menu
│   ├── Pagination.tsx            # Post pagination
│   ├── PostCard.tsx             # Post preview card
│   ├── PostCardSkeleton.tsx     # Loading skeleton for post cards
│   ├── PostContent.tsx          # Post content renderer
│   ├── PostContentSkeleton.tsx  # Loading skeleton for post content
│   ├── PostImage.tsx            # Optimized image component
│   ├── PostListSkeleton.tsx     # Loading skeleton for post lists
│   ├── RelatedPosts.tsx         # Related posts widget
│   ├── SocialShare.tsx          # Social sharing buttons
│   ├── StructuredData.tsx       # JSON-LD structured data
│   ├── TableOfContents.tsx      # Post table of contents (desktop)
│   └── TableOfContentsMobile.tsx # Table of contents (mobile)
│
├── lib/                          # Utility functions and data access
│   ├── prisma.ts                # Prisma client instance
│   ├── posts.ts                # Post queries and utilities
│   ├── pages.ts                # Page queries
│   ├── authors.ts               # Author queries
│   ├── search.ts                # Search functionality
│   └── utils.ts                 # General utility functions
│
├── prisma/                       # Prisma configuration
│   └── schema.prisma            # Database schema definition
│
├── types/                        # TypeScript type definitions
│   └── blog.ts                  # Blog-related type definitions
│
├── public/                       # Static assets
│   └── uploads/                  # Media files (images, videos, documents)
│
├── components.json               # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── prisma.config.ts             # Prisma configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🗄️ Database Schema

The blog uses a MySQL database with the following main models:

### Core Models

#### **Author**

- User/author information (name, email, bio, avatar)
- One-to-many relationship with posts and pages

#### **Post**

- Main blog post content
- Includes: title, content, excerpt, featured image
- Metadata: publish date, modified date, status, comment status
- Relationships: belongs to Author, many-to-many with Categories and Tags
- Supports featured images and multiple images per post

#### **Page**

- Static pages (About, Contact, etc.)
- Supports hierarchical structure (parent/child pages)
- Similar metadata structure to posts

#### **Category**

- Content categorization with hierarchical support
- Many-to-many relationship with posts
- Supports parent/child categories

#### **Tag**

- Content tagging system
- Many-to-many relationship with posts
- Non-hierarchical flat structure

#### **Media**

- Media file management (images, videos, documents)
- Stores file metadata (size, dimensions, mime type)
- Linked to posts and pages through PostImage and PageImage

### Relationship Models

- **PostCategory** - Junction table for posts and categories
- **PostTag** - Junction table for posts and tags
- **PostImage** - Links posts to images with metadata
- **PageImage** - Links pages to images with metadata

## 🛣️ Website Structure & Routes

### Public Routes

#### **Homepage** (`/`)

- Featured post showcase
- Recent posts grid
- Blog statistics and quick links

#### **Posts**

- `/posts` - All posts listing with pagination
- `/posts/[slug]` - Individual post page with:
  - Full content rendering
  - Table of contents
  - Related posts
  - Social sharing
  - Category and tag navigation

#### **Categories**

- `/category/[slug]` - Posts filtered by category
- Supports hierarchical category navigation

#### **Tags**

- `/tag/[slug]` - Posts filtered by tag
- Tag-based content discovery

#### **Archives**

- `/archive` - Time-based post archives
- Monthly and yearly groupings

#### **Authors**

- `/author/[slug]` - Author profile pages
- Lists all posts by specific author

#### **Pages**

- `/pages/[slug]` - Static pages (About, Contact, etc.)
- Supports hierarchical page structure

#### **Search**

- `/search` - Full-text search functionality
- Query posts by title, content, excerpt

### System Routes

- `/feed` or `/feed.xml` - RSS feed for subscribers
- `/sitemap.xml` - Auto-generated XML sitemap
- `/robots.txt` - Search engine crawler instructions

## 🧩 Component Architecture

### Layout Components

#### **Header** (`components/Header.tsx`)

- Main navigation menu
- Logo and branding
- Mobile-responsive menu toggle
- Category and tag navigation links

#### **Footer** (`components/Footer.tsx`)

- Site footer with links
- Copyright information
- Social media links

#### **MobileMenu** (`components/MobileMenu.tsx`)

- Mobile-optimized navigation
- Slide-out menu for small screens

### Post Components

#### **PostCard** (`components/PostCard.tsx`)

- Post preview card for listings
- Displays: featured image, title, excerpt, metadata
- Used in: homepage, category pages, tag pages

#### **PostContent** (`components/PostContent.tsx`)

- Main post content renderer
- Handles HTML content rendering
- Image optimization and formatting

#### **PostImage** (`components/PostImage.tsx`)

- Optimized image component
- Uses Next.js Image component
- Supports lazy loading and responsive images

#### **RelatedPosts** (`components/RelatedPosts.tsx`)

- Displays related posts based on categories/tags
- Shown on individual post pages

### Navigation Components

#### **Breadcrumbs** (`components/Breadcrumbs.tsx`)

- Navigation breadcrumb trail
- Shows current location in site hierarchy

#### **Pagination** (`components/Pagination.tsx`)

- Post listing pagination
- Previous/Next navigation
- Page number navigation

#### **TableOfContents** (`components/TableOfContents.tsx`)

- Auto-generated table of contents
- Desktop version with sidebar positioning

#### **TableOfContentsMobile** (`components/TableOfContentsMobile.tsx`)

- Mobile-optimized table of contents
- Collapsible section for better UX

### Utility Components

#### **SocialShare** (`components/SocialShare.tsx`)

- Social media sharing buttons
- Supports: Facebook, Twitter, LinkedIn, etc.

#### **StructuredData** (`components/StructuredData.tsx`)

- JSON-LD structured data generation
- SEO optimization for search engines
- Supports: Article, Website, Organization, BreadcrumbList

### Loading States

- **PostCardSkeleton** - Loading placeholder for post cards
- **PostContentSkeleton** - Loading placeholder for post content
- **PostListSkeleton** - Loading placeholder for post lists

All loading components use skeleton UI patterns for better perceived performance.

## ✨ Features

### Content Management

- ✅ **MySQL Database** - All content stored in MySQL with Prisma ORM
- ✅ **Rich Content Support** - Posts and pages with HTML content
- ✅ **Media Management** - Featured images and multiple images per post
- ✅ **Hierarchical Categories** - Parent/child category relationships
- ✅ **Tag System** - Flexible tagging for content organization
- ✅ **Static Pages** - Custom pages with hierarchical structure
- ✅ **Author Profiles** - Multiple authors with bios and avatars

### Performance & SEO

- ✅ **Static Site Generation (SSG)** - Fast, pre-rendered pages at build time
- ✅ **SEO Optimized** - Comprehensive meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data (JSON-LD)** - Rich snippets for search engines
- ✅ **Auto-generated Sitemap** - XML sitemap at `/sitemap.xml`
- ✅ **RSS Feed** - Subscribe at `/feed` or `/feed.xml`
- ✅ **Robots.txt** - Search engine crawler directives
- ✅ **Image Optimization** - Automatic image optimization and lazy loading
- ✅ **Reading Time** - Calculated reading time for each post

### User Experience

- ✅ **Responsive Design** - Mobile-first, works beautifully on all devices
- ✅ **Loading States** - Skeleton UI for smooth loading experience
- ✅ **Table of Contents** - Auto-generated TOC for long posts
- ✅ **Related Posts** - Smart related content suggestions
- ✅ **Social Sharing** - Easy sharing to social media platforms
- ✅ **Breadcrumb Navigation** - Clear site hierarchy navigation
- ✅ **Pagination** - Efficient post listing pagination
- ✅ **Search Functionality** - Full-text search across posts

### Technical

- ✅ **TypeScript** - Full type safety across the application
- ✅ **Server Components** - Optimal performance with React Server Components
- ✅ **Tailwind CSS + shadcn/ui** - Modern, clean Substack-inspired design
- ✅ **Vietnamese Language** - Optimized for Vietnamese content and typography
- ✅ **Category & Tag Navigation** - Browse posts by category and tags
- ✅ **Archive System** - Time-based post archives (monthly/yearly)
- ✅ **Error Handling** - Comprehensive error boundaries and 404 pages

## 🔌 Data Access Layer (`lib/`)

The `lib/` directory contains all data access functions using Prisma:

### **prisma.ts**

- Prisma client singleton instance
- Ensures single connection pool in development
- Handles connection pooling efficiently

### **posts.ts**

- `getRecentPosts(limit)` - Get most recent posts
- `getAllPosts()` - Get all published posts
- `getPostBySlug(slug)` - Get single post by slug
- `getPostsByCategory(slug, page, perPage)` - Get posts by category
- `getPostsByTag(slug, page, perPage)` - Get posts by tag
- `getPostsByAuthor(slug, page, perPage)` - Get posts by author
- `getRelatedPosts(postId, limit)` - Get related posts
- `formatDate(date)` - Format dates for display
- `calculateReadingTime(content)` - Calculate reading time

### **pages.ts**

- `getAllPages()` - Get all published pages
- `getPageBySlug(slug)` - Get single page by slug
- Page hierarchy and navigation helpers

### **authors.ts**

- `getAllAuthors()` - Get all authors
- `getAuthorBySlug(slug)` - Get author by slug
- Author profile and post listing queries

### **search.ts**

- `searchPosts(query)` - Full-text search across posts
- Searches: title, content, excerpt

### **utils.ts**

- General utility functions
- String manipulation, formatting helpers

## 🗄️ Database Management

### Useful Commands

- `npm run db:generate` - Generate Prisma Client from schema
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and apply migrations (production)
- `npm run db:studio` - Open Prisma Studio (visual database editor)

### Database Workflow

1. **Update Schema** - Edit `prisma/schema.prisma`
2. **Generate Client** - Run `npm run db:generate`
3. **Apply Changes** - Run `npm run db:push` (dev) or `npm run db:migrate` (prod)

## 📝 Content Management

All content (posts, pages, categories, tags) is stored in the MySQL database. The WordPress migration has been completed and all data has been imported.

### Content Types

- **Posts** - Blog articles with full HTML content
- **Pages** - Static pages (About, Contact, etc.)
- **Categories** - Hierarchical content organization
- **Tags** - Flexible content tagging
- **Authors** - User/author profiles
- **Media** - Image and file management
