type HighlighterProps = {
  text: string;
  highlight?: string | null;
};

const Highlighter = ({ text, highlight }: HighlighterProps) => {
  const highlightText = () => {
    if (!highlight || !text) {
      return text;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const regExSearch = new RegExp(highlight, 'i');
      if (part.match(regExSearch)) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  return <>{highlightText()}</>;
};

export default Highlighter;
