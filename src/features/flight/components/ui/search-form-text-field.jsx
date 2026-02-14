export default function SearchFormTextDield({
  register,
  name,
  label,
  type = "text",
  errors,
  parentClassName=""
}) {
  const hasError = errors && errors[name];

  return (
    <div
      className={`${parentClassName} flex flex-col  justify-between gap-y-1  ${hasError && "h-[86px]"}`}
    >
      <div
        className={`${hasError && "border-red-400"} w-full h-[62px] flex flex-col gap-1 border px-2 py-3 shadow-xs rounded-md pt-1`}
      >
        <label className="text-sm  text-slate-600 px-1">{label}</label>
        <input
          type={type}
          className="px-3 text-sm border-0"
          name={name}
          {...register(name)}
        />
      </div>
      {hasError && (
        <span className="text-red-400 text-xs">{errors[name].message}</span>
      )}
    </div>
  );
}
