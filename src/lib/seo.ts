import type { Metadata } from 'next';

const baseUrl = 'https://gowtham-portfolio.vercel.app';

export const siteConfig = {
    name: 'Gowtham R',
    title: 'Gowtham R | Creative Developer & Full Stack Engineer | Design Agency & Startup Ready',
    description: 'Creative Developer and Full Stack Engineer based in Tamil Nadu, India. Specializing in stunning UI/UX implementations, React, Next.js, Node.js, Python, and cutting-edge AI technologies. Available for work in Coimbatore, Chennai, Bengaluru, and remote positions.',
    url: baseUrl,
    ogImage: `${baseUrl}/og-image.png`,
    phone: '+919944814765',
    location: {
        city: 'Tamil Nadu',
        country: 'India',
        targetCities: ['Coimbatore', 'Chennai', 'Bengaluru', 'Bangalore', 'Hyderabad', 'Mumbai'],
    },
    links: {
        linkedin: 'https://www.linkedin.com/in/gowtham-r-1634251b9',
        github: 'https://github.com/GowthamR7',
        email: 'gowthamramar1372@gmail.com',
        resume: 'https://gowtham-portfolio.vercel.app/Gowtham_Resume_Fullstack.pdf',
    },
    keywords: [
        // Name & Title
        'Gowtham R',
        'Gowtham R Developer',
        'Gowtham Tamil Nadu Developer',

        // Creative & Design Agency Keywords
        'Creative Developer',
        'Creative Technologist',
        'UI Developer',
        'UI Engineer',
        'Frontend Engineer',
        'Design Engineer',
        'Design Technologist',
        'Interactive Developer',
        'Motion Developer',
        'Animation Developer',
        'GSAP Developer',
        'Three.js Developer',
        'WebGL Developer',
        'Creative Coder',
        '3D Web Developer',
        'Immersive Web Developer',

        // Full Stack & Technical
        'Full Stack Developer',
        'Full Stack Engineer',
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'React Developer',
        'React Engineer',
        'Next.js Developer',
        'Next.js Engineer',
        'Node.js Developer',
        'Python Developer',
        'FastAPI Developer',
        'TypeScript Developer',

        // AI & Gen AI
        'AI Engineer',
        'AI Developer',
        'Agentic AI Developer',
        'Agentic AI Engineer',
        'Generative AI Developer',
        'Gen AI Engineer',
        'GenAI Developer',
        'LangChain Developer',
        'LangGraph Developer',
        'RAG Developer',
        'RAG Engineer',
        'AI Chatbot Developer',
        'Conversational AI Developer',
        'Vector Database Developer',
        'OpenAI Developer',
        'LLM Developer',

        // Location-Specific (Your Target Cities)
        'Developer Coimbatore',
        'Software Engineer Coimbatore',
        'Full Stack Developer Coimbatore',
        'Developer Chennai',
        'Software Engineer Chennai',
        'Full Stack Developer Chennai',
        'Developer Bengaluru',
        'Developer Bangalore',
        'Software Engineer Bangalore',
        'Full Stack Developer Bangalore',
        'Web Developer Tamil Nadu',
        'Software Engineer India',
        'Developer South India',

        // Startup & Agency Keywords
        'Startup Developer',
        'Startup Engineer',
        'Design Agency Developer',
        'Agency Developer',
        'Product Developer',
        'Product Engineer',
        'SaaS Developer',
        'SaaS Engineer',
        'Microservices Developer',
        'API Developer',

        // Work Status
        'Hire Developer',
        'Hire Full Stack Developer',
        'Available for Work',
        'Freelance Developer',
        'Remote Developer',
        'Looking for Opportunities',
        'Open to Work',
        'Immediate Joiner',
    ],
    skills: {
        frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'GSAP', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Python', 'FastAPI', 'Express.js', 'GraphQL', 'REST APIs'],
        ai: ['LangChain', 'LangGraph', 'RAG', 'OpenAI', 'Vector Databases', 'Pinecone', 'FAISS'],
        database: ['MongoDB', 'PostgreSQL', 'Redis', 'Supabase'],
        tools: ['Docker', 'AWS', 'Vercel', 'Git', 'Figma'],
    },
    experience: '2+ years',
};

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.links.linkedin }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'profile',
        locale: 'en_IN',
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: `${siteConfig.name} Portfolio`,
        firstName: 'Gowtham',
        lastName: 'R',
        username: 'gowthamr',
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - Creative Developer & Full Stack Engineer`,
                type: 'image/png',
            },
            {
                url: `${baseUrl}/og-image-square.png`,
                width: 600,
                height: 600,
                alt: `${siteConfig.name} - Available for Hire`,
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} | Creative Developer Open to Work`,
        description: 'Creative Developer & Full Stack Engineer | React, Next.js, AI/Gen AI | Available for design agencies & startups in Coimbatore, Chennai, Bengaluru',
        images: [siteConfig.ogImage],
        creator: '@gowthamr',
    },
    verification: {
        google: 'your-google-verification-code',
    },
    alternates: {
        canonical: siteConfig.url,
    },
    category: 'technology',
    classification: 'Portfolio',
    other: {
        // LinkedIn optimization
        'linkedin:profile': siteConfig.links.linkedin,
        'github:profile': siteConfig.links.github,

        // Geo targeting
        'geo.region': 'IN-TN',
        'geo.placename': 'Tamil Nadu, India',
        'geo.position': '11.0168;76.9558',
        'ICBM': '11.0168, 76.9558',

        // Job seeking signals
        'hiring:status': 'available',
        'hiring:role': 'Creative Developer, Full Stack Engineer, AI Engineer',
        'hiring:location': 'Coimbatore, Chennai, Bengaluru, Remote',

        // Apple PWA
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': siteConfig.name,

        // Additional SEO
        'rating': 'General',
        'distribution': 'Global',
        'revisit-after': '7 days',
        'language': 'English',
    },
};

// JSON-LD Structured Data for Person (enhanced for job search)
export const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Gowtham R',
    givenName: 'Gowtham',
    familyName: 'R',
    url: siteConfig.url,
    image: {
        '@type': 'ImageObject',
        url: `${baseUrl}/profile.jpg`,
        width: 400,
        height: 400,
    },
    sameAs: [
        siteConfig.links.linkedin,
        siteConfig.links.github,
    ],
    jobTitle: 'Creative Developer & Full Stack Engineer',
    description: siteConfig.description,
    email: siteConfig.links.email,
    telephone: siteConfig.phone,
    address: {
        '@type': 'PostalAddress',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
    },
    worksFor: {
        '@type': 'Organization',
        name: 'Open to Opportunities - Design Agencies & Startups',
    },
    seeks: {
        '@type': 'Demand',
        name: 'Full-time Position',
        description: 'Seeking creative developer or full stack engineer roles at design agencies and well-funded startups in Coimbatore, Chennai, Bengaluru, or remote.',
    },
    knowsAbout: [
        // Frontend
        'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
        'GSAP Animations', 'Three.js', 'WebGL', 'Framer Motion', 'Tailwind CSS',
        // Backend
        'Node.js', 'Python', 'FastAPI', 'Express.js', 'REST APIs', 'GraphQL',
        // AI/ML
        'Agentic AI', 'Generative AI', 'LangChain', 'LangGraph', 'RAG Systems',
        'Vector Databases', 'OpenAI API', 'LLM Applications',
        // Database
        'MongoDB', 'PostgreSQL', 'Redis', 'Supabase', 'Pinecone',
        // DevOps
        'Docker', 'AWS', 'Vercel', 'CI/CD', 'Git',
        // Design Tools
        'Figma', 'UI/UX Implementation', 'Responsive Design', 'Design Systems',
    ],
    hasCredential: [
        {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Experience',
            name: `${siteConfig.experience} Professional Experience`,
        },
    ],
    nationality: {
        '@type': 'Country',
        name: 'India',
    },
    knowsLanguage: ['English', 'Tamil'],
};

// JSON-LD for Portfolio Website
export const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: `${siteConfig.name} - Creative Developer Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
        '@id': `${siteConfig.url}/#person`,
    },
    publisher: {
        '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: 'en',
    copyrightYear: new Date().getFullYear(),
    keywords: siteConfig.keywords.slice(0, 30).join(', '),
    potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};

// JSON-LD for Professional Service (for startups & agencies)
export const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#service`,
    name: 'Gowtham R - Creative Development & AI Solutions',
    description: 'Professional creative development, full stack engineering, and AI solutions for design agencies and startups. Specializing in stunning UI/UX implementations, React, Next.js, GSAP animations, and Generative AI technologies.',
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.links.email,
    areaServed: [
        { '@type': 'City', name: 'Coimbatore', containedInPlace: { '@type': 'State', name: 'Tamil Nadu' } },
        { '@type': 'City', name: 'Chennai', containedInPlace: { '@type': 'State', name: 'Tamil Nadu' } },
        { '@type': 'City', name: 'Bengaluru', containedInPlace: { '@type': 'State', name: 'Karnataka' } },
        { '@type': 'Place', name: 'Remote / Worldwide' },
    ],
    serviceType: [
        'Creative Web Development',
        'Interactive Website Development',
        'UI/UX Implementation',
        'GSAP & Motion Design',
        '3D Web Development',
        'Full Stack Development',
        'Frontend Development',
        'Backend Development',
        'AI/ML Development',
        'Generative AI Solutions',
        'LangChain Development',
        'RAG System Development',
        'Chatbot Development',
        'SaaS Development',
        'MVP Development for Startups',
    ],
    provider: {
        '@id': `${siteConfig.url}/#person`,
    },
    availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${siteConfig.url}/#contact`,
        servicePhone: siteConfig.phone,
        availableLanguage: ['English', 'Tamil'],
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    paymentAccepted: ['Bank Transfer', 'UPI'],
};

// JSON-LD for CreativeWork (Portfolio)
export const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${siteConfig.url}/#portfolio`,
    name: 'Gowtham R - Creative Developer Portfolio',
    author: {
        '@id': `${siteConfig.url}/#person`,
    },
    description: 'A showcase of creative development projects including SaaS platforms, AI applications, interactive websites, and full-stack solutions for design agencies and startups.',
    url: siteConfig.url,
    thumbnailUrl: siteConfig.ogImage,
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en',
    genre: [
        'Web Development',
        'AI Development',
        'Creative Technology',
        'Interactive Design',
        'SaaS',
    ],
    keywords: 'Creative Developer, Design Agency, Startup, Full Stack, AI, Gen AI, React, Next.js',
    audience: {
        '@type': 'Audience',
        audienceType: 'Design Agencies, Startups, Tech Companies, Recruiters',
    },
};

// JSON-LD for Job Seeking (helps with job search visibility)
export const jobSeekingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#jobseeker`,
    name: 'Gowtham R',
    url: siteConfig.url,
    jobTitle: 'Creative Developer & Full Stack Engineer',
    seeks: {
        '@type': 'Demand',
        name: 'Creative Developer / Full Stack Engineer Position',
        description: 'Actively seeking creative developer or full stack engineer roles at design agencies and well-funded startups.',
        areaServed: [
            { '@type': 'City', name: 'Coimbatore' },
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'City', name: 'Bengaluru' },
            { '@type': 'Place', name: 'Remote' },
        ],
        availableAtOrFrom: {
            '@type': 'Place',
            name: 'Tamil Nadu, India',
        },
    },
    knowsAbout: siteConfig.skills.frontend.concat(siteConfig.skills.backend, siteConfig.skills.ai),
};

// Breadcrumb for better navigation in search results
export const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: `${siteConfig.url}/#about`,
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'Projects',
            item: `${siteConfig.url}/#projects`,
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'Contact',
            item: `${siteConfig.url}/#contact`,
        },
    ],
};

