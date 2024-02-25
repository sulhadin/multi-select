import { ReactNode } from 'react';

type HighlighterProps = {
  /**  The entire text to be highlighted.*/
  text: string;
  /** The text to highlight within the text property value.*/
  highlight?: string | null;
};

/**
 * The Highlighter component subcomponent of MultiSelectOption.
 * It highlights the searched text within provided text.
 *
 * @example
 * <Highlighter text="Option 1" highlight="1"/>
 *
 * @param {HighlighterProps} props The props for the Highlighter component.
 * @returns {ReactNode} The Highlighter component.
 */
const Highlighter = ({ text, highlight }: HighlighterProps): ReactNode => {
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
