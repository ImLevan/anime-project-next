export default function sitemap() {
    return [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/signup`,
            lastModified: new Date(), 
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/home`,
            lastModified: new Date(),
        }

    ]
}