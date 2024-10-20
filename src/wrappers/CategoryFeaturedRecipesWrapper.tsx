import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";
import { useEffect, useState } from "react";
import { Category } from "../types/type";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoryFeaturedRecipesWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://delirecipesbwa.test/api/category/${slug}`)
      .then((response) => {
        setCategory(response.data.data); // Mengisi data kategori
        setLoading(false); // Menghentikan loading
      })
      .catch((error) => {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        setError(message); // Menyimpan pesan error
        setLoading(false); // Menghentikan loading
      });
  }, [slug]);

  // Menampilkan pesan loading saat data belum selesai diambil
  if (loading) {
    return <p>Loading...</p>;
  }

  // Menampilkan pesan error jika terjadi error
  if (error) {
    return <p>Error loading category: {error}</p>;
  }

  // Menampilkan pesan jika kategori tidak ditemukan
  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <section id="MadeByPeople">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
        <a href="#" className="font-semibold text-sm leading-[21px] text-[#FF4C1C]">
          Explore All
        </a>
      </div>
      <div className="swiper w-full mt-3">
        <Swiper className="w-full mt-3" direction="horizontal" spaceBetween={16} slidesPerView="auto" slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {category.recipes && category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="!w-fit">
                <FeaturedRecipeCard recipe={recipe} />
              </SwiperSlide>
            ))
          ) : (
            <p>Belum ada data recipe dari kategori ini</p>
          )}
        </Swiper>
      </div>
    </section>
  );
}
