import { useGetSearchedText } from '@Components/multiSelect/multiSelectContext.ts';
import Highlighter from '@Components/multiSelect/Highlighter.tsx';

type MultiSelectOptionType = {
  image: string;
  title: string;
  description: string;
};

const MultiSelectOption = ({
  image,
  title,
  description,
}: MultiSelectOptionType) => {
  const searchedText = useGetSearchedText();

  return (
    <>
      <div className={'flex items-center gap-3'}>
        <img src={image} className={'w-12 h-12 rounded'} />
        <div className={'flex flex-col'}>
          <h1>
            <Highlighter highlight={searchedText} text={title} />
          </h1>
          <h6 style={{ fontSize: '14px' }}>{description}</h6>
        </div>
      </div>
    </>
  );
};
export default MultiSelectOption;
