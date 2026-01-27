export default function RHFTextField({
  register,
  name,
  label,
  type = "string",
}) {
  return (
    <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} {...register(name)} />
    </div>
  );
}
