import React from "react";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  valueLabels?: { [key: number]: string };
  startLabel?: string;
  endLabel?: string;
  progressColor?: string; // np. "#8aa978"
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  valueLabels,
  startLabel,
  endLabel,
}) => {

  const progressColor = "#8aa978";

  const getProgressPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}: {valueLabels?.[value] ?? value}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
        className="w-full range-slider"
        style={{
          background: `linear-gradient(to right, ${progressColor} ${getProgressPercent(
            value
          )}%, #d1d5db ${getProgressPercent(value)}%)`,
        }}
      />

      {(startLabel || endLabel) && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  );
};
