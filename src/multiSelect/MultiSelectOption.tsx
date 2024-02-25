import { ReactNode } from 'react';

import Highlighter from '@/multiSelect/Highlighter.tsx';
import { useGetSearchedText } from '@/multiSelect/multiSelectContext.ts';

type MultiSelectOptionType = {
  /** URL of the option image.*/
  image: string;
  /** Title of the option.*/
  title: string;
  /** Description of the option.*/
  description: string;
};

/**
 * The MultiSelectOption component displays an option in a multi-select box.
 *
 * @component
 * @example
 * <MultiSelectOption
 *   image="http://example.com/image.jpg"
 *   title="Option 1"
 *   description="This is option 1"
 * />
 *
 * @param {MultiSelectOptionType} props The props for the MultiSelectOption component.
 * @returns {ReactNode}
 */
const MultiSelectOption = ({
  image,
  title,
  description,
}: MultiSelectOptionType): ReactNode => {
  const searchedText = useGetSearchedText();

  return (
    <div className={'inner-item'}>
      <img src={image} />
      <div className={'container'}>
        <h1>
          <Highlighter highlight={searchedText} text={title} />
        </h1>
        <h6>{description}</h6>
      </div>
    </div>
  );
};
export default MultiSelectOption;
