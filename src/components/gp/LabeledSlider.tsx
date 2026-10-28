import { useId } from 'react';

export function LabeledSlider({
    label,
    value,
    onChange,
    min,
    max,
    step = 0.01,
    format = (v: number) => v.toFixed(2)
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step?: number;
    format?: (v: number) => string;
}) {
    const id = useId();
    return (
        <div className="slider">
            <label htmlFor={id}>
                <span>{label}</span>
                <output htmlFor={id}>{format(value)}</output>
            </label>
            <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        </div>
    );
}
