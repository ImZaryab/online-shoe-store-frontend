import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import ProductGrid from "@/components/ProductGrid";
import { useState } from "react";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";

const maxItemsOnPage = 6;

const Category = ({ category, products, slug }) => {
  //   const router = useRouter();
  //   const { slug } = router.query;
  const {query} = useRouter();

  //reset pagination Index to 1 every time {query} changes (here query is being extracted from router so it is the slug).
  //thus, it will trigger every time the category is changed from the menu
  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const [pageIndex, setPageIndex] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxItemsOnPage}`,
    fetchDataFromApi,
    {
      fallbackData: products,
    }
  );

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        <ProductGrid products={data} />

        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxItemsOnPage && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const category = await fetchDataFromApi("/api/categories?populate=*");
  const paths = category?.data?.map((c) => ({
    params: {
      slug: c.attributes.slug,
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
  const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${slug}`
  );

  const products =
    await fetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1
                                          &pagination[pageSize]=${maxItemsOnPage}`);

  return {
    props: {
      category,
      products,
      slug,
    },
  };
}
