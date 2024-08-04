import React, { useState } from "react";

type ItemProps = {
  entry: {
    id: number;
    name: string;
    amount: number;
    image: string;
  };
  onChangeAmount: (numItems: number, itemID: number) => void;
  onClickX: (itemID: number) => void;
};

const SelectedItem: React.FC<ItemProps> = ({
  entry,
  onChangeAmount,
  onClickX,
}) => {
  const [inputValue, setInputValue] = useState(entry.amount.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setInputValue("0");
      onChangeAmount(0, entry.id);
      return;
    }

    let num = parseInt(value, 10);
    if (isNaN(num)) {
      num = 0;
    } else if (num < 0) {
      num = 0;
    } else if (num > 9999) {
      num = 9999;
    }
    setInputValue(num.toString());
    onChangeAmount(num, entry.id);
  };

  const handleRemoveClick = () => {
    onClickX(entry.id);
  };

  return (
    <div
      className="flex rounded-sm bg-slate-600 border border-slate-800 p-2"
      key={entry.id}
    >
      <img
        src={entry.image}
        alt={entry.name}
        className="rounded-sm border-slade-800 border mr-2"
      />
      <div>
        <h2>{entry.name}</h2>
        <label>
          Amount:
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="0"
            max="9999"
            className="ml-2 p-1 border rounded"
          />
        </label>
        <button onClick={handleRemoveClick} className="ml-2 p-1 border rounded">
          X
        </button>
      </div>
    </div>
  );
};

export default SelectedItem;
