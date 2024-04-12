/* eslint-disable react/prop-types */
const NoDataFound = ({ message }) => {
  return (
    <div className="flex flex-col gap-14 justify-center items-center">
      <img src="/magnifying-glass.png" className="w-[200px]" />

      <h1 className="text-3xl font-bold text-gray-700">{message}</h1>
    </div>
  );
};

export default NoDataFound;
