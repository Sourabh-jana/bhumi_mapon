"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [fromData, setFromData] = useState(0);
  const [toData, setToData] = useState(0);

  const [fromUnit, setFromUnit] = useState("acre");
  const [toUnit, setToUnit] = useState("sqft");

  const handleSourceValueChange = (e: any) => {
    setFromData(() => {
      const currentFromData = e.target.value;

      const sourceInSqft = inSqft({
        fromUnit: fromUnit,
        value: currentFromData,
      });
      const result = fromSqft({ toUnit, value: sourceInSqft });

      // console.log(sourceInSqft, result);

      setToData(result);
      return currentFromData;
    });
  };

  function updateData() {
    const sourceInSqft = inSqft({ fromUnit: fromUnit, value: fromData });
    const result = fromSqft({ toUnit, value: sourceInSqft });

    return result;
  }

  useEffect(() => {
    console.log(fromData, fromUnit);
    const toValue = updateData();
    setToData(toValue);
  }, [fromUnit, fromData]);

  useEffect(() => {
    console.log(toData, toUnit);
    
  }, [toUnit, toData]);

  return (
    <div>
      <h1>Area Converter</h1>
      <div className="from">
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          <option value="bigha">বিঘা</option>
          <option value="acre">একর</option>
          <option value="katha">কাঠা</option>
        </select>
        <input
          type="number"
          value={fromData}
          onChange={(e) => setFromData(Number(e.target.value))}
        />
      </div>
      <div className="to">
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          <option value="bigha">বিঘা</option>
          <option value="katha">কাঠা</option>
          <option value="sqft">বর্গ ফুট</option>
        </select>
        <input
          type="number"
          value={toData}
          onChange={(e) => setToData(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

interface IInSqft {
  fromUnit: string;
  value: number;
}
function inSqft({ fromUnit, value }: IInSqft): number {
  switch (fromUnit) {
    case "acre":
      return value * 43560;
    case "bigha":
      return value * 14400;
    case "katha":
      return value * 720;
  }

  return value;
}

interface IFromSqft {
  toUnit: string;
  value: number;
}
function fromSqft({ toUnit, value }: IFromSqft): number {
  switch (toUnit) {
    case "acre":
      return parseFloat((value * 43560).toFixed(3));
    case "bigha":
      return parseFloat((value / 14400).toFixed(3));
    case "katha":
      return parseFloat((value / 720).toFixed(3));
  }

  return value;
}
