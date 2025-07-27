function ButtonPr({ value, action, disabled = false, ...props }) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`bg-yellow-500 text-black p-3 pb-[.8rem] flex items-center justify-center rounded-xl transition-transform m-4 duration-200 ${
        disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:scale-110"
      }`}
      {...props}
    >
      {value}
    </button>
  );
}

export default ButtonPr;
