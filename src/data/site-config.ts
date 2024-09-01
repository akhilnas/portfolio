export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Dante',
    subtitle: 'Minimal Astro.js theme',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: import.meta.env.BASE_URL + '/'
        },
        {
            text: 'Projects',
            href: import.meta.env.BASE_URL + '/projects'
        },
        {
            text: 'Blog',
            href: import.meta.env.BASE_URL + '/blog'
        },
        {
            text: 'Tags',
            href: import.meta.env.BASE_URL + '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: import.meta.env.BASE_URL + '/about'
        },
        {
            text: 'Contact',
            href: import.meta.env.BASE_URL + '/contact'
        }
        // {
        //     text: 'Terms',
        //     href: '/terms'
        // },
        // {
        //     text: 'Download theme',
        //     href: 'https://github.com/JustGoodUI/dante-astro-theme'
        // }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/akhil-nasser/'
        },
        {
            text: 'Github',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Medium',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://x.com/'
        }
    ],
    hero: {
        title: 'Hi There & Welcome to My Personal Homepage!',
        text: "I'm **Akhil Nasser**, a Data Scientist at Amazing Studio, dedicated to the realms of collaboration and artificial intelligence. My approach involves embracing intuition, conducting just enough research, and leveraging aesthetics as a catalyst for exceptional products. I have a profound appreciation for top-notch software, visual design, and the principles of product-led growth. Feel free to explore some of my coding endeavors on <a href='https://github.com/JustGoodUI/dante-astro-theme'>GitHub</a> or follow me on <a href='https://twitter.com/justgoodui'>Twitter/X</a>.",
        image: {
            src: '/portfolio/hero.jpeg',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/portfolio/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
