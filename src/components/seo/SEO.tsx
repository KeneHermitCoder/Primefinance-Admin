import { Helmet } from "react-helmet-async";
import { toCapitalized } from "../../utils";
import img from "../../assets/icons/logo.png";

interface ISEO {
  url?: string;
  title?: string;
  price?: string;
  image?: string;
  addUrl?: boolean;
  description?: string;
};

export function SEO({
  url,
  title,
  price,
  image,
  description,
  addUrl = true,
}: ISEO) {
  const pageImage = image || img;
  const pageUrl = url || window?.location?.href;

  return (
    <Helmet>
      <title>
        {(title && toCapitalized(title)) ||
          `PrimeFinance | Do More with One App`}
      </title>
      <meta
        name="description"
        content={
          description
            ? `${description}${price ? ` | ${price}` : ""}`
            : `PrimeFinance | Do More with One App`
        }
      />
      {addUrl && <link rel="canonical" href={pageUrl} />}
      <meta
        property="og:title"
        content={
          (title && toCapitalized(title)) ||
          `PrimeFinance | Do More with One App`
        }
      />
      <meta
        property="og:description"
        content={
          description
            ? `${description}${price ? ` | ${price}` : ""}`
            : `PrimeFinance | Do More with One App`
        }
      />
      {addUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:image" content={pageImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
