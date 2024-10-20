import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";
import { useEffect, useState } from "react";
import { Recipe } from "../types/type";
import axios from "axios";

export default function BrowseFeaturedRecipesWrapper() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://delirecipesbwa.test/api/recipes")
      .then((response) => {
        setRecipes(response.data.data); // Mengisi data recipes
        setLoading(false); // Menghentikan loading
      })
      .catch((error) => {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        setError(message); // Menyimpan pesan error
        setLoading(false);
      });
  }, []);

  // Penanganan ketika masih loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // Penanganan ketika terjadi error
  if (error) {
    return <p>Error loading recipes: {error}</p>;
  }

  // Penanganan ketika tidak ada resep
  if (recipes.length === 0) {
    return <p>No recipes available at the moment.</p>;
  }

  // Render UI ketika data berhasil didapat
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
          {recipes.map((recipe) => (
            <SwiperSlide key={recipe.id} className="!w-fit">
              <FeaturedRecipeCard recipe={recipe} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
