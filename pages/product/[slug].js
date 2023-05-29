import React from "react";
import Wrapper from "@/components/Wrapper";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({ product, products }) => {

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const p = product?.data?.[0]?.attributes;

  const notify = () => {
    toast.success('Added to cart successfully!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  return (
    <div className="w-full md:py-10">
      <ToastContainer />
      <Wrapper>
        <section className="text-black body-font overflow-hidden">
          <div className="container px-5 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={p.name}
                className="lg:w-1/2 w-full h-full object-cover object-center rounded"
                src={p?.thumbnail?.data?.attributes?.url}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-black tracking-widest">
                  {p?.subtitle}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {p?.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                </div>
                <div className="markdown leading-relaxed">
                  <ReactMarkdown>
                    {p?.description}
                  </ReactMarkdown>
                </div>
                {/* Color Selection Start */}
                <div className="flex mt-6 items-center pb-5 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                </div>
                {/* Color Selection End */}
                {/* Size Heading and Range Start */}
                <div className="flex flex-col w-full mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex w-full justify-between mb-2">
                    <div className="text-md font-semibold">Select Size</div>
                    <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                      Select Guide
                    </div>
                  </div>
                    {/* Size Selection Start */}
                    <div id="sizesGrid" className="grid grid-cols-3 gap-2 w-full">

                      {p?.size?.data?.map((item, index) => (
                        <div key={index}
                        className={`border rounded-md text-center py-3 font-medium transition-all duration-200 
                        ${item?.enabled ? 'hover:border-black cursor-pointer':'cursor-not-allowed opacity-50 bg-black/[0.1]'}
                        ${selectedSize === item.size ? 'border-black':''}`}

                        onClick={()=> {
                          setSelectedSize(item.size);
                          setShowError(false);
                        }}
                      >
                        {item.size}
                      </div>
                      ))}
                    {/* Size Selection End */}
                  </div>

                  {/* Selection Error Start */}
                  {showError && <div className="text-red-500 mt-1">
                    Size selection is required
                  </div>}
                  {/* Selection Error End */}
                </div>
                {/* Size Heading and Range End */}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${p?.price}
                  </span>
                  <span className="pt-1 pl-1 text-md font-medium text-black/[0.5]">
                    {`(incl of taxes)`}
                  </span>
                  <button
                    className="flex ml-auto font-semibold text-white bg-gray-500
                  border-0 py-2 px-6 focus:outline-none hover:bg-black rounded transition-all duration-200"
                  onClick={() => {
                    if(!selectedSize) {
                      setShowError(true);
                      document.getElementById("sizesGrid").scrollIntoView({block: "center", behavior: "smooth"})
                    } else {
                      dispatch(addToCart({
                        ...product?.data?.[0],
                        selectedSize,
                        priceForOneItem: p.price,
                      }));
                      notify();
                    }
                  }}
                  >
                    Add to cart
                  </button>
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center
                  justify-center text-gray-500 ml-4 hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;


export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  /*Query and fetch data of specific objects by filters 
    Only data related to the provided slug will be returned.*/
  const product = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$eq]=${slug}`
  );

  const products =
    await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);

  return {
    props: {
      product,
      products
    },
  };
}