const variants = {
  primary: "bg-brand text-white rounded-full",
  secondary: "border border-gray-300 rounded-md",
};

export default function Button({className="", children, variant="secondary", ...rest }) {
  const styles = variants[variant];
  return (
    <button className={`${className} px-3 py-2 ${styles}`} {...rest}>
      {children}
    </button>
  );
}
