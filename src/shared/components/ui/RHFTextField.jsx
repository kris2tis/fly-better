export default function RHFTextField({
  register,
  name,
  label,
  type = "string",
  errors,
}) {
  const hasError = errors && errors[name];
  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={`flex flex-col px-2 py-2 border rounded-2xl border-gray-300 text-sm ${hasError && "border-red-400"}`}
      >
        <label htmlFor={name}>{label}</label>
        <input
          className="py-2 border-0 "
          type={type}
          name={name}
          autoComplete="off"
          {...register(name)}
        />
      </div>
      <span className="text-xs text-red-500">
        {hasError && errors[name].message}
      </span>
    </div>
  );
}
