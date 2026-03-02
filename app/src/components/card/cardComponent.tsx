import React, { type FC } from "react";
import { Button } from "../ui/button";

export interface CardComponentInputs {
  title: string;
  description?: string;
  image?: string;
  tag?: string;
  buttonText?: string;
  x?: any;
  click?: () => void;
}

const CardComponent: FC<CardComponentInputs> = ({
  title,
  description,
  image,
  tag,
  click,
  buttonText,
}) => {
  return (
    <div className="flex flex-col h-full rounded overflow-hidden shadow-lg w-full">
      {image ? (
        <img
          className="w-full h-auto"
          height={300}
          src={image}
          alt="image"
        />
      ) : (
        <div className="w-full bg-gray-200 flex items-center justify-center" style={{ height: 300 }} />
      )}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-xl">{title}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {tag}
          </span>
        </div>

        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {click && <Button onClick={click}>{buttonText}</Button>}
      </div>
    </div>
  );
};
export default CardComponent;
