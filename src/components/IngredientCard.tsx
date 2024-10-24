export default function IngredientCard() {
  return (
    <div className="flex flex-col items-center text-center w-full rounded-[20px] p-[14px] gap-[14px] bg-white shadow-[0_12px_30px_0_#D6D6D680]">
      <div className="thumbnail flex shrink-0 w-full aspect-[138.5/100] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img src="/assets/images/thumbnails/thumbnails-ingredients-1.png" className="object-cover w-full h-full" alt="ingredient" />
      </div>
      <div className="text flex flex-col items-center gap-2">
        <h6 className="font-semibold">Beef</h6>
        <p className="text-sm leading-[18px] text-[#FF4C1C]">200mg</p>
      </div>
    </div>
  );
}
