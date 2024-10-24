import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import IngredientCard from "../components/IngredientCard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../types/type";

export default function RecipeDetails() {
  const [activeTab, setActiveTab] = useState("ingredients");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://delirecipesbwa.test/api/recipe/${slug}`)
      .then((response) => {
        setRecipe(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe: {error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  const baseURL = "http://delirecipesbwa.test/storage";

  return (
    <>
      <nav className="absolute top-0 flex w-full max-w-[640px] items-center justify-between px-5 mt-[30px] z-20">
        <Link to={"/"}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
            <img src="/assets/images/icons/arrow-left.svg" className="w-5 h-5 object-contain" alt="icon" />
          </div>
        </Link>
        <button className="appearance-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
            <img src="/assets/images/icons/heart.svg" className="w-5 h-5 object-contain" alt="icon" />
          </div>
        </button>
      </nav>
      <header id="Gallery" className="relative w-full h-[520px] flex shrink-0 rounded-b-[40px] bg-black overflow-hidden">
        <div className="swiper">
          <div className="swiper-wrapper">
            <Swiper className="w-full" direction="horizontal" slidesPerView="auto">
              <SwiperSlide>
                <div className="relative w-full h-full flex shrink-0">
                  <div className="gradient-filter absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)40.47%,#000000_81.6%)] z-10"></div>
                  <img src={`${baseURL}/${recipe.thumbnail}`} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
              </SwiperSlide>
              {recipe.photos.map((photo) => (
                <SwiperSlide>
                  <div className="relative w-full h-full flex shrink-0">
                    <div className="gradient-filter absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)40.47%,#000000_81.6%)] z-10"></div>
                    <img src={`${baseURL}/${photo.photo}`} className="w-full h-full object-cover" alt="thumbnail" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="absolute bottom-0 w-full flex flex-col gap-5 z-20">
          <div className="swiper-pagination !-top-5 *:!bg-white"></div>
          <div className="flex justify-between p-5 pb-[23px] gap-3">
            <div className="flex flex-col gap-[6px]">
              <p className="font-semibold text-[#FF4C1C]">Top {recipe.category.name}</p>
              <h1 className="font-bold text-[34px] leading-[46px] text-white">{recipe.name}</h1>
            </div>
            <div className="flex shrink-0 items-center w-fit h-fit rounded-full py-1 px-2 bg-white/20 backdrop-blur">
              <img src="/assets/images/icons/Star 1.svg" className="w-4 h-4" alt="star" />
              <span className="font-semibold text-xs leading-[18px] text-white">4.3</span>
            </div>
          </div>
        </div>
      </header>

      <section id="Description" className="flex flex-col gap-4 px-5 mt-[30px]">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">About</h2>
          <p className="leading-8">{recipe.about}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden">
              <img src={`${baseURL}/${recipe.author.photo}`} className="w-full h-full object-cover" alt="avatar" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold">{recipe.author.name}</p>
              <p className="text-sm leading-[21px] text-[#848486]">Author</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src="/assets/images/icons/Star 1.svg" className="w-[18px] h-[18px]" alt="star" />
            <img src="/assets/images/icons/Star 1.svg" className="w-[18px] h-[18px]" alt="star" />
            <img src="/assets/images/icons/Star 1.svg" className="w-[18px] h-[18px]" alt="star" />
            <img src="/assets/images/icons/Star 1.svg" className="w-[18px] h-[18px]" alt="star" />
            <img src="/assets/images/icons/Star 1.svg" className="w-[18px] h-[18px]" alt="star" />
          </div>
        </div>
      </section>

      <section id="Details" className="mt-[30px]">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-bold">Details</h2>
        </div>
        <div className="swiper-tabs w-full overflow-hidden mt-3">
          <div className="swiper-wrapper" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist" data-tabs-active-classes="shadow-[0_10px_20px_0_#FF4C1C80] !bg-[#FF4C1C]" data-tabs-inactive-classes="!bg-black">
            <Swiper className="w-full" direction="horizontal" spaceBetween={16} slidesPerView="auto" slidesOffsetBefore={20} slidesOffsetAfter={20}>
              <SwiperSlide className="swiper-slide !w-fit pb-[26px]">
                <button
                  className="flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold !text-white bg-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]"
                  id="ingredients-tab"
                  data-tabs-target="#ingredients"
                  type="button"
                  role="tab"
                  aria-controls="ingredients"
                  aria-selected="true"
                  onClick={() => handleTabClick("ingredients")}
                >
                  <img src="/assets/images/icons/coffee-white.svg" className="w-[22px] h-[22px]" alt="icon" />
                  <h3>Ingredients</h3>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide !w-fit pb-[26px]">
                <button
                  className="flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold !text-white bg-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]"
                  id="tutorials-tab"
                  data-tabs-target="#tutorials"
                  type="button"
                  role="tab"
                  aria-controls="tutorials"
                  aria-selected="false"
                  onClick={() => handleTabClick("tutorials")}
                >
                  <img src="/assets/images/icons/note-favorite-white.svg" className="w-[22px] h-[22px]" alt="icon" />
                  <h3>Tutorials</h3>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide !w-fit pb-[26px]">
                <button
                  className="flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold !text-white bg-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]"
                  id="reviews-tab"
                  data-tabs-target="#reviews"
                  type="button"
                  role="tab"
                  aria-controls="reviews"
                  aria-selected="false"
                  onClick={() => handleTabClick("reviews")}
                >
                  <img src="/assets/images/icons/star-white.svg" className="w-[22px] h-[22px]" alt="icon" />
                  <h3>Reviews</h3>
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div id="default-tab-content">
          {activeTab === "ingredients" && (
            <div className="px-5" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
              <div className="grid grid-cols-2 gap-5">
                <IngredientCard></IngredientCard>
                <IngredientCard></IngredientCard>
                <IngredientCard></IngredientCard>
              </div>
            </div>
          )}

          {activeTab === "tutorials" && (
            <div className="px-5" id="tutorials" role="tabpanel" aria-labelledby="tutorials-tab">
              <p>Tutorial content will go here...</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="px-5" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
              <p>Review content will go here...</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
