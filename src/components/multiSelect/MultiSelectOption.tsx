import { ReactNode } from 'react';

import Highlighter from '@Components/multiSelect/Highlighter.tsx';
import { useGetSearchedText } from '@Components/multiSelect/multiSelectContext.ts';

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
    <div className={'flex items-center gap-3'}>
      <img src={image} className={'w-12 h-12 rounded'} />
      <div className={'flex flex-col'}>
        <h1>
          <Highlighter highlight={searchedText} text={title} />
        </h1>
        <h6 style={{ fontSize: '14px' }}>{description}</h6>
      </div>
    </div>
  );
};
export default MultiSelectOption;
