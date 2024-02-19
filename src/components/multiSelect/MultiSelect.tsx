import { useState, ChangeEvent, KeyboardEvent, useRef, useMemo } from 'react';

interface BaseObject {
  id: string;
  name: string;
}

interface MultiSelectProps<T extends BaseObject> {
  options: T[];
}

const MultiSelect = <T extends BaseObject>({
  options,
}: MultiSelectProps<T>) => {
  const [active, setActive] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [userInput, setUserInput] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [indexOfSelectedItems, setIndexOfSelectedItems] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const data = useMemo(() => {
    if (!userInput) {
      return options;
    }

    return options.filter(
      option => option.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );
  }, [options, userInput]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
    setShowSuggestions(true);
  };

  const handleClick = (option: T) => {
    toggleItem(option);
    setUserInput('');
    setActive(-1);

    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleUpDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setShowSuggestions(true);
      setActive(state => (state === 0 ? data.length - 1 : state - 1));
    } else if (e.key === 'ArrowDown') {
      setShowSuggestions(true);
      setActive(state => (data.length - 1 === state ? 0 : state + 1));
    } else {
      setActive(-1);
    }
  };

  const handleLeftRight = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft') {
      setIndexOfSelectedItems(state =>
        state <= 0 ? selectedItems.length - 1 : state - 1,
      );
    } else if (e.key === 'ArrowRight') {
      setIndexOfSelectedItems(state =>
        state >= selectedItems.length ? selectedItems.length : state + 1,
      );

      if (indexOfSelectedItems > selectedItems.length - 1) {
        inputRef.current?.focus();
      }
    } else {
      setIndexOfSelectedItems(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      active > -1 && handleClick(data[active]);
      indexOfSelectedItems > -1 &&
        handleClick(selectedItems[indexOfSelectedItems]);
      return;
    }

    handleLeftRight(e);
    handleUpDown(e);
  };

  const toggleItem = (option: T) => {
    if (!option) {
      return;
    }

    setSelectedItems(state => {
      const isExist = state.some(selectedItem => selectedItem.id === option.id);

      if (isExist) {
        return state.filter(selectedItem => selectedItem.id !== option.id);
      }
      return [...state, option];
    });

    inputRef.current?.focus();
  };

  const isChecked = (option: T) => {
    return selectedItems.some(selectedItem => selectedItem.id === option.id);
  };

  const onCaretClick = () => {
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className={'border rounded-md p-2 mt-5 flex items-center gap-1'}>
        <div className={'flex flex-wrap gap-1 grow'}>
          {selectedItems.map((selectedItem, index) => (
            <div
              key={selectedItem.id}
              className={
                'inline-flex gap-1 p-1 rounded bg-neutral-200 items-center cursor-default'
              }
            >
              <div>{selectedItem.name}</div>

              <div
                onClick={() => toggleItem(selectedItem)}
                className={
                  'bg-neutral-500 w-5 h-5 rounded inline-flex items-center  justify-center text-white  hover:text-red-950 cursor-pointer hover:bg-red-300' +
                  (indexOfSelectedItems === index
                    ? ' bg-red-300 text-red-950'
                    : ' ')
                }
              >
                <span className={' text-sm '}>x</span>
              </div>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            className={
              'bg-transparent min-w-2 focus:ring-0 focus:outline-none flex-1'
            }
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={userInput}
          />
        </div>
        <div className={'cursor-pointer'} onClick={onCaretClick}>
          &#9660;
        </div>
      </div>
      {showSuggestions && (
        <ul className={'list-none divide-y border p-1 rounded-md mt-2'}>
          {data.length === 0 && (
            <li className={'text-center gap-2 px-1 '}>Not found</li>
          )}
          {data.map((option, index) => (
            <li
              key={option.id}
              className={
                'flex items-center gap-2 px-1 hover:bg-gray-200 cursor-pointer ' +
                (active === index ? 'bg-gray-200' : '')
              }
              onClick={() => handleClick(option)}
            >
              <input
                readOnly
                className="form-checkbox h-3 w-3 text-blue-600"
                type="checkbox"
                checked={isChecked(option)}
              />
              <div className={'flex flex-col'}>
                <h1> {option.name}</h1>
                <p> 51 Episodes</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MultiSelect;
