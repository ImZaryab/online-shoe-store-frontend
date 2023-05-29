import React from "react";
import { getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard = ({ product: { attributes: p, id } }) => {
  return (
    <a href={`/product/${p.slug}`} className="group block overflow-hidden">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
        />

        <img
          src={p?.image?.data?.[0]?.attributes?.url}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-lg text-gray-700 font-bold group-hover:underline group-hover:underline-offset-4">
          {p.name}
        </h3>
        <h3 className="text-sm text-gray-700">
          {p.subtitle}
        </h3>

        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${p.price}</p>
          {p.original_price && (
            <>
              <p className="text-base font-medium line-through ml-auto">
                ${p.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(p?.original_price, p?.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
