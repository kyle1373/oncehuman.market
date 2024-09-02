import { REGIONS_MAP } from "@constants/constants";
import React, { useState, useEffect } from "react";

interface ServerSelectionProps {
  server: string;
  setServer: (server: string) => void;
  region: string;
  setRegion: (region: string) => void;
  disabled: boolean;
}

const ServerSelection: React.FC<ServerSelectionProps> = ({
  server,
  setServer,
  region,
  setRegion,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("PVE");
  const [twoDigitNumber, setTwoDigitNumber] = useState("");
  const [fiveDigitNumber, setFiveDigitNumber] = useState("");

  useEffect(() => {
    if (server) {
      const modePart = server.slice(0, 3);
      const rest = server.slice(3).split("-");
      if (rest.length === 2) {
        setMode(modePart);
        setTwoDigitNumber(rest[0]);
        setFiveDigitNumber(rest[1]);
      }
    }
  }, [server]);

  useEffect(() => {
    if (mounted) {
      setServer(`${mode}${twoDigitNumber}-${fiveDigitNumber}`);
    }
    setMounted(true);
  }, [mode, twoDigitNumber, fiveDigitNumber, setServer]);

  const handleTwoDigitChange = (value: string) => {
    const uppercasedValue = value.toUpperCase();
    if (/^[A-Z0-9]{0,2}$/.test(uppercasedValue)) {
      setTwoDigitNumber(uppercasedValue);
    }
  };

  const handleFiveDigitChange = (value: string) => {
    const uppercasedValue = value.toUpperCase();
    if (/^[A-Z0-9]{0,5}$/.test(uppercasedValue)) {
      setFiveDigitNumber(uppercasedValue);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className={`p-2 h-10 border border-neutral-600 bg-neutral-700 rounded ${
          disabled ? "opacity-80 text-neutral-500 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        {Object.entries(REGIONS_MAP).map(([key, flag]) => (
          <option key={key} value={key}>
            {flag} {key}
          </option>
        ))}
      </select>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className={`p-2 h-10 border border-neutral-600 bg-neutral-700 rounded ${
          disabled ? "opacity-80 text-neutral-500 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <option value="PVE">PVE</option>
        <option value="PVP">PVP</option>
      </select>
      <input
        type="text"
        value={twoDigitNumber}
        onChange={(e) => handleTwoDigitChange(e.target.value)}
        placeholder="01"
        className={`p-2 border h-10 border-neutral-600 bg-neutral-700 rounded w-10 ${
          disabled ? "opacity-80 text-neutral-500 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      />
      <input
        type="text"
        value={fiveDigitNumber}
        onChange={(e) => handleFiveDigitChange(e.target.value)}
        placeholder="00001"
        className={`p-2 border h-10 border-neutral-600 bg-neutral-700 rounded w-[70px] ${
          disabled ? "opacity-80 text-neutral-500 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      />
    </div>
  );
};

export default ServerSelection;
