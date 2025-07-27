function FormInput({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  maxLength, 
  minLength,
  ...props 
}) {
  return (
    <div className="w-full">
      <p className="mt-2 text-left">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        className={`h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-2 text-center text-white focus:outline-none transition-colors ${
          error 
            ? "border-red-500 focus:border-red-400" 
            : "border-zinc-700 focus:border-yellow-500"
        }`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1 mx-4">{error}</p>}
    </div>
  );
}

export default FormInput;
