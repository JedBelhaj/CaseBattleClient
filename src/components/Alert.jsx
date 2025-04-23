function Alert({ content }) {
  return (
    <div className="absolute h-full w-full flex items-center justify-center flex-col z-[99999] bg-white/10 backdrop-blur-lg">
      <div className="bg-black/70 p-10 rounded-xl">{content}</div>
    </div>
  );
}

export default Alert;
