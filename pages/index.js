import Hero from "@/components/Hero"
import Collection from "@/components/Collection"

import { fetchDataFromApi } from "@/utils/api";

export default function Home({ data }) {

  return (
    <main>
      <Hero />
      {/* //pass the fethced products data as props */}
      <Collection products={data} />
    </main>
  )
}

export async function getStaticProps(){
  const data = await fetchDataFromApi('/api/products?populate=*')

  return{
    props: {data}
  }
}