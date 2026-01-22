interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
