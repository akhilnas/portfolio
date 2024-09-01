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
    title: '',
    subtitle: '',
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
        text: "I'm **Akhil Nasser**, a Data Scientist at Innoplexus, with comprehensive experience in managing the entire lifecycle of Data Science projects, with a strong focus on solution design and implementation. Feel free to explore some of my coding endeavors on <a href='https://github.com/akhilnas/'>GitHub</a>.",
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
