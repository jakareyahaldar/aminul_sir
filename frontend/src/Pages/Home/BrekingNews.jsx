export default function BrekingNews(){
  return(
    <div className="flex w-full" >
        <div className=" font-bold text-sm px-3 py-2 bg-[#437143] text-white shrink-0 flex items-center gap-1">
          <div className="h-3 w-3 bg-white animate-pulse rounded-full"></div>
          ব্রেকিং নিউজ
        </div>
        <div className="bg-amber-200 overflow-hidden flex items-center w-full">
          <p className="breakingAnimate whitespace-nowrap">
            যথাযোগ্য মর্যাদা ও ভাবগাম্ভীর্যের মধ্য দিয়ে আজ সারাদেশে পালিত হচ্ছে মহান শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস। 
          </p>
        </div>
      </div>
    )
}