import type { Post } from "@/types/blog";

interface StructuredDataProps {
  type: "article" | "website" | "organization" | "breadcrumb";
  data?: {
    article?: {
      title: string;
      description: string;
      image?: string;
      datePublished: string;
      dateModified: string;
      author: string;
      url: string;
    };
    website?: {
      name: string;
      url: string;
      description: string;
    };
    organization?: {
      name: string;
      url: string;
      logo?: string;
    };
    breadcrumb?: {
      items: Array<{ name: string; url: string }>;
    };
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  if (!data) return null;

  let jsonLd: object = {};

  switch (type) {
    case "article":
      if (data.article) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.article.title,
          description: data.article.description,
          image: data.article.image,
          datePublished: data.article.datePublished,
          dateModified: data.article.dateModified,
          author: {
            "@type": "Person",
            name: data.article.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Hiền Tensai Blog",
            logo: {
              "@type": "ImageObject",
              url: data.article.image || `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com"}/og-image.jpg`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.article.url,
          },
          url: data.article.url,
        };
      }
      break;

    case "website":
      if (data.website) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.website.name,
          url: data.website.url,
          description: data.website.description,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${data.website.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };
      }
      break;

    case "organization":
      if (data.organization) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: data.organization.name,
          url: data.organization.url,
          logo: data.organization.logo,
        };
      }
      break;

    case "breadcrumb":
      if (data.breadcrumb) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.breadcrumb.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
      }
      break;
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
