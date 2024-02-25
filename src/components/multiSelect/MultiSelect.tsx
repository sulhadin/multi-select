import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  ReactNode,
  useEffect,
} from 'react';

import clsx from 'clsx';

import useFilter from '@/libs/useFilter.ts';
import MultiSelectOption from '@Components/multiSelect/MultiSelectOption.tsx';
import { SearchContext } from '@Components/multiSelect/multiSelectContext.ts';

/**
 * BaseObject serves as a base interface for objects with a numeric or string id and possibly
 * other properties of unknown type.
 */
interface BaseObject {
  id: number | string;
  [key: string]: unknown;
}

/**
 * MultiSelectProps is an interface for the MultiSelect component's properties. The component uses
 * these properties to perform render and filtering operations.
 */
interface MultiSelectProps<T extends BaseObject> {
  options: T[];
  filterField: keyof T & string;
  render: (option: T, index: number) => ReactNode;
  placeholder?: string;
  empty?: ReactNode;
}

/**
 * Function Component MultiSelect
 *
 * MultiSelect is used to render a selection box with multiple choices for the user.
 *
 * @component
 * @param {Object} props - The properties object for the MultiSelect component.
 * @param {Array} props.options - The array of options to show in the drop-down list in the format specified by the BaseObject interface.
 * @param {string} props.filterField - The name of the field in the options objects to filter results.
 * @param {Function} props.render - A callback function to customize how each option should be rendered.
 * This function should return valid JSX and it will be passed two arguments:
 *    1. the option object
 *    2. the index of the option object within the options array
 * @param {string} [props.placeholder] - A string that displays as placeholder in the input text.
 * @param {JSX.Element} [props.empty] - JSX Element to return when no items found on filtering.
 *
 * @returns {JSX.Element} A formatted multi select box.
 *
 * @example
 * <MultiSelect
 *    placeholder={"Search for some surprise"}
 *    filterField={"name"}
 *    options={[
 *      {
 *        id: 1,
 *        name: 'Option 1',
 *        image: 'url-to-image-1',
 *        description: "Lorem ipsum",
 *      }
 *    ]}
 *    render={(option) => (
 *      <MultiSelect.Option
 *        image={option.image}
 *        title={option.name}
 *        description={option.description}
 *      />
 *    )}
 * />
 */
const MultiSelect = <T extends BaseObject>({
  options,
  filterField,
  render,
  placeholder,
  empty,
}: MultiSelectProps<T>): ReactNode => {
  const [active, setActive] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [indexOfSelectedItems, setIndexOfSelectedItems] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedItem = document.querySelector(
      '.multi-select .options-panel .options-item.item-active',
    );
    selectedItem?.scrollIntoView();
  }, [active]);

  const filter = (item: T, search: string) => {
    const value = item[filterField];

    if (typeof value === 'string') {
      const regExSearch = new RegExp(search, 'i');
      return value.match(regExSearch) || value.match(regExSearch);
    } else {
      throw new Error(
        `Type of "${filterField}" is "${typeof value}" which cannot be filtered. Make sure the value is "string".`,
      );
    }
  };

  const {
    onSearch,
    searchText,
    filteredData = [],
  } = useFilter({ predicate: filter, data: options, initialData: options });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.currentTarget.value);
    setShowSuggestions(true);
  };

  const resetState = () => {
    onSearch('');
    setActive(-1);

    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleClick = (option: T) => {
    toggleItem(option);
    resetState();
  };

  const handleUpDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setShowSuggestions(true);
      setActive(state => (state === 0 ? filteredData.length - 1 : state - 1));
    } else if (e.key === 'ArrowDown') {
      setShowSuggestions(true);
      setActive(state => (filteredData.length - 1 === state ? 0 : state + 1));
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
  const handleEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      resetState();
    }
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setSelectedItems(state => {
        if (state.length === 0) {
          return state;
        }

        const updatedSelectedItems = [...state];
        updatedSelectedItems.pop();

        return updatedSelectedItems;
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const option =
        filteredData[active] || selectedItems[indexOfSelectedItems];
      handleClick(option);
      return;
    }

    handleLeftRight(e);
    handleUpDown(e);
    handleBackspace(e);
    handleEscape(e);
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
    <SearchContext.Provider value={searchText}>
      <div className={'multi-select'}>
        <div className={'search-area'}>
          <div className={'input-container'}>
            {selectedItems.map((selectedItem, index) => (
              <div key={selectedItem.id} className={'selected-items'}>
                <div>{selectedItem[filterField] as string}</div>

                <div
                  onClick={() => toggleItem(selectedItem)}
                  className={clsx('remove-selected-item', {
                    'button-active': indexOfSelectedItems === index,
                  })}
                >
                  <span>x</span>
                </div>
              </div>
            ))}
            <input
              placeholder={placeholder}
              ref={inputRef}
              type="text"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={searchText}
            />
          </div>
          <div
            className={clsx('chevron', {
              'chevron-rotate': showSuggestions,
            })}
            onClick={onCaretClick}
          >
            &#9660;
          </div>
        </div>
        {showSuggestions && (
          <ul className={'options-panel'}>
            {filteredData.length === 0 && (
              <li className={'empty-item'}>{empty || 'Not found'}</li>
            )}

            {filteredData.map((option, index) => (
              <li
                key={option.id}
                className={clsx('options-item', {
                  'item-active': active === index,
                })}
                onClick={() => handleClick(option)}
              >
                <input
                  readOnly
                  className="check"
                  type="checkbox"
                  checked={isChecked(option)}
                />
                <div>{render(option, index)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SearchContext.Provider>
  );
};

MultiSelect.Option = MultiSelectOption;

export default MultiSelect;
