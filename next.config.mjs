const oldEventRoutes = [
  "/event-details/residential-youth-training-camp",
  "/event-details/jygraduates-residentialcamp",
  "/event-details/neighbourhoodseminar",
  "/event-details/ardwick-childrens-festival-1",
  "/event-details/seminar-to-empower-early-adolescents",
  "/event-details/local-junior-youth-camp",
  "/event-details/residential-youth-training-camp-3",
  "/event-details/residential-junior-youth-camp",
  "/event-details/junior-youth-residential-camp",
  "/event-details/residential-junior-youth-camp-1",
  "/event-details/residential-junior-youth-camp-2",
  "/event-details/residential-youth-and-family-training-camp-1",
  "/event-details/national-youth-conference",
  "/event-details/community-conference",
  "/event-details/residential-youth-and-family-training-camp",
  "/event-details/residential-youth-training-camp-2",
  "/event-details/residential-youth-and-family-camp-1/form",
  "/event-details/residential-family-camp",
  "/event-details/youthconference2024",
  "/event-details/local-youth-training-camp",
  "/event-details/youthandfamilycamp",
  "/event-details/north-of-england-conference"
];

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/BICB-redesign";

const redirectsConfig = isGithubPages
  ? {}
  : {
      async redirects() {
        return [
          { source: "/about-us", destination: "/about", permanent: true },
          { source: "/childrens-class-programme", destination: "/programmes/children", permanent: true },
          { source: "/junior-youth-programme", destination: "/programmes/junior-youth", permanent: true },
          { source: "/youth-mentors-and-volunteers", destination: "/get-involved/youth", permanent: true },
          { source: "/adult-volunteers-and-training", destination: "/get-involved/adults", permanent: true },
          { source: "/key-events", destination: "/events", permanent: true },
          { source: "/ardwick-calendar", destination: "/calendar/ardwick", permanent: true },
          { source: "/contact-9", destination: "/contact", permanent: true },
          ...oldEventRoutes.map((source) => ({
            source,
            destination: "/events/archive",
            permanent: true
          }))
        ];
      }
    };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? githubPagesBasePath : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? githubPagesBasePath : ""
  },
  images: {
    unoptimized: isGithubPages
  },
  ...redirectsConfig
};

export default nextConfig;
