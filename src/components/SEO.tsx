import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, PAGE_DESCRIPTIONS } from '../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  twitterHandle?: string;
}

export const SEO = ({
  title = `${SEO_CONFIG.siteName}`,
  description = PAGE_DESCRIPTIONS.hero,
  image = SEO_CONFIG.og.image,
  url = SEO_CONFIG.siteUrl,
  type = 'website',
  twitterHandle = 'No_lolade',
}: SEOProps) => {
  const fullTitle = title.includes('|') ? title : `${title} | ${SEO_CONFIG.siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(SEO_CONFIG.og.imageWidth)} />
      <meta property="og:image:height" content={String(SEO_CONFIG.og.imageHeight)} />
      <meta property="og:image:alt" content={SEO_CONFIG.og.imageAlt} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={`@${twitterHandle}`} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0D0D0D" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: SEO_CONFIG.author,
          url: SEO_CONFIG.siteUrl,
          image: image,
          jobTitle: 'Full Stack Developer',
          email: SEO_CONFIG.email,
          sameAs: Object.values(SEO_CONFIG.social),
          location: {
            '@type': 'Place',
            name: SEO_CONFIG.location,
          },
        })}
      </script>

      {/* JSON-LD for WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.siteUrl,
          description: PAGE_DESCRIPTIONS.hero,
          creator: {
            '@type': 'Person',
            name: SEO_CONFIG.author,
          },
        })}
      </script>
    </Helmet>
  );
};
