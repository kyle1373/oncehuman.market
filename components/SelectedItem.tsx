import React, { useState } from "react";

type ItemProps = {
  entry: {
    id: number;
    name: string;
    amount: number;
    totalStock?: number; // Add totalStock to the entry type
    image: string;
  };
  className?: string;
  onChangeAmount: (numItems: number, itemID: number) => void;
  onChangeTotalStock?: (totalStock: number, itemID: number) => void;
  onClickX: (itemID: number) => void;
};

const SelectedItem: React.FC<ItemProps> = ({
  entry,
  onChangeAmount,
  onChangeTotalStock = null,
  onClickX,
  className,
}) => {
  const [inputValue, setInputValue] = useState(entry.amount.toString());
  const [totalStockValue, setTotalStockValue] = useState(
    entry.totalStock?.toString() || "1"
  );

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

  const handleTotalStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setTotalStockValue("");
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
    setTotalStockValue(num.toString());
    if (onChangeTotalStock) {
      onChangeTotalStock(num, entry.id);
    }
  };

  const handleTotalStockBlur = () => {
    if (totalStockValue === "") {
      setTotalStockValue("1");
      if (onChangeTotalStock) {
        onChangeTotalStock(1, entry.id);
      }
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
      <div className="flex flex-col justify-between flex-grow">
        <h2 className="font-bold mb-1">{entry.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap">
            <label className="mr-2 text-xs items-center">
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
            {onChangeTotalStock && (
              <label className="mr-2 text-xs items-center">
                Total Stock:
                <input
                  type="number"
                  value={totalStockValue}
                  onChange={handleTotalStockChange}
                  onBlur={handleTotalStockBlur}
                  min="0"
                  max="9999"
                  className="ml-2 p-1 rounded bg-slate-800 border-slate-500 border h-7"
                />
              </label>
            )}
          </div>
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
