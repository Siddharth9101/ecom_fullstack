import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <img
        src="/loading.gif"
        alt="loading"
        className="size-56"
        loading="lazy"
      />
    </div>
  );
};

export default Loading;
