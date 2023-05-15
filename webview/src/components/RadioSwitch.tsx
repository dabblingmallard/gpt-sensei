type Props = {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
};

export const RadioSwitch = ({ label, value, setValue }: Props) => {
    return (
        <div className="py-1">
            <label className="relative inline-flex items-center justify-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setValue(!value)}
                />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </span>
            </label>
        </div>
    );
};