const Button = ({ name }) => {
  return (
    <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm whitespace-nowrap hover:bg-gray-200">
      {name}
    </button>
  );
};

export default Button;
