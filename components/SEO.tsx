import { SEO_METADATA } from "@/constants/constants";
import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isImageBig?: boolean;
  makeDescriptionBlank?: boolean;
}

const SEO: React.FC<MetaProps> = ({
  title,
  description,
  imageUrl,
  isImageBig = true,
  makeDescriptionBlank = false,
}) => {
  const metadata = {
    title: title ? `${title} | oncehuman.market` : SEO_METADATA.title,
    description: description ? description : SEO_METADATA.description,
    imageUrl: imageUrl ? imageUrl : SEO_METADATA.image,
  };
  return (
    <Head>
      <title>{metadata.title}</title>
      {!makeDescriptionBlank && (
        <meta name="description" content={metadata.description} />
      )}
      <meta property="og:title" content={metadata.title} />
      {!makeDescriptionBlank && (
        <meta property="og:description" content={metadata.description} />
      )}
      {metadata.imageUrl && <meta property="og:image" content={metadata.imageUrl} />}
      <meta property="og:type" content="website" />
      {isImageBig && metadata.imageUrl && <meta name="twitter:card" content="summary_large_image" />}
      <meta name="twitter:title" content={metadata.title} />
      {!makeDescriptionBlank && (
        <meta name="twitter:description" content={metadata.description} />
      )}
      {metadata.imageUrl && <meta name="twitter:image" content={metadata.imageUrl} />}
    </Head>
  );
};

export default SEO;