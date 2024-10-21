import { useParams } from "react-router-dom";
import RecipeCardResult from "../components/RecipeCardResult";
import axios from "axios";
import { useState, useEffect } from "react";
import { Category } from "../types/type";

export default function CategoryLatestRecipesWrapper() {
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
    <section id="LatestRecipes" className="px-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Latest Recipes</h2>
      </div>
      <div className="flex flex-col gap-[18px] mt-[18px]">
        {category.recipes.length > 0 ? category.recipes.map((recipe) => <RecipeCardResult key={recipe.id} recipe={recipe}></RecipeCardResult>) : <p>Belum ada data terkait</p>}
      </div>
    </section>
  );
}
