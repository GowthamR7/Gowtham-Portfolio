import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://gowtham-portfolio.vercel.app';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/static/'],
            },
            // Allow AI crawlers for better visibility
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'Anthropic-AI',
                allow: '/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
            },
            {
                userAgent: 'CCBot',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'Bytespider',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
