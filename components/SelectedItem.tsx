import React, { useState } from "react";

type ItemProps = {
  entry: {
    id: number;
    name: string;
    amount: number;
    image: string;
  };
  className?: string;
  onChangeAmount: (numItems: number, itemID: number) => void;
  onClickX: (itemID: number) => void;
};

const SelectedItem: React.FC<ItemProps> = ({
  entry,
  onChangeAmount,
  onClickX,
  className,
}) => {
  const [inputValue, setInputValue] = useState(entry.amount.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setInputValue("");
      return;
    }

    let num = parseInt(value, 10);
    if (isNaN(num)) {
      num = 1;
    } else if (num < 1) {
      num = 1;
    } else if (num > 9999) {
      num = 9999;
    }
    setInputValue(num.toString());
    onChangeAmount(num, entry.id);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setInputValue("1");
      onChangeAmount(1, entry.id);
    }
  };

  const handleRemoveClick = () => {
    onClickX(entry.id);
  };

  return (
    <div
      className={
        "flex rounded-md bg-slate-600 border border-slate-500 p-2 items-center " +
        className
      }
      key={entry.id}
    >
      <img
        src={entry.image}
        alt={entry.name}
        className="rounded-sm border-slate-500 border mr-3 h-[60px] w-[60px]"
      />
      <div className="flex flex-col justify-between">
        <h2 className="font-bold mb-1">{entry.name}</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm items-center">
            Amount:
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              min="0"
              max="9999"
              className="ml-2 p-1 rounded bg-slate-800 border-slate-500 border h-7"
            />
          </label>
          <button
            onClick={handleRemoveClick}
            className={
              "bg-red-700 hover:bg-red-600 text-white px-4 rounded text-xs h-7 ml-1"
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedItem;
