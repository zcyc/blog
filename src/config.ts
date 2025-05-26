export const SITE = {
  website: "https://blog.d8s.fun/", // replace this with your deployed domain
  author: "Charles",
  profile: "https://blog.d8s.fun/about",
  desc: "My thoughts, ideas, and experiences.",
  title: "Charles",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit",
    url: "https://github.com/zcyc/blog/edit/main",
  },
  dynamicOgImage: true,
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
