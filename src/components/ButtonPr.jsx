function ButtonPr({ value, action }) {
  return (
    <button
      onClick={action}
      className="bg-yellow-500 text-black p-3 pb-[.8rem] flex items-center justify-center rounded-xl hover:scale-110 transition-transform m-4 duration-200"
    >
      {value}
    </button>
  );
}

export default ButtonPr;
