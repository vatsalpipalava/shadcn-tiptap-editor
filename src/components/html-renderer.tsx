import React from "react";

interface Props {
  content: string; // The HTML content as a string
}

const HtmlRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div
      className="max-w-3xl mx-auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlRenderer;
