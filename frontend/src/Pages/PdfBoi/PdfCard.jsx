export default function PdfCard(props) {
  const { _id, title, level, category, image, size } = props
  return(
    <div key={_id} className="flex gap-2 items-center shadow-2xl px-3 py-1 rounded-2xl border-[1px] hover:border-black transition-[1s]">
      {/*pdf||book Image*/}
      <div className="relative w-20 h-20">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      <span className="absolute bottom-1 right-1 p-1 rounded-md bg-black text-white text-xs">{size}</span>
    </div>
    {/*Details*/}
    <div>
      <p className="text-xs font-bold text-[#287b68]">
        {level}
      </p>
      <div className="mt-2">
        <p className="font-bold text-sm">
          {title}
        </p>
        <p className="text-xs text-[#287b68]">
          {category}
        </p>
      </div>
    </div>
  </div>
)
}