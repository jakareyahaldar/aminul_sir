import MenuOption from "./MenuOption.jsx"
import { HomeSVG, BookSVG, FormSVG, VideoSVG, CalendarSVG, HeartSVG,ChatSVG, GlobeSVG, LockSVG } from "./SvgIcons.jsx"

const Sidebar = ({close}) => {
  const menuData = [
    { label: 'হোম', path: '/', icon: <HomeSVG /> },
    { label: 'PDF বই ও শীট', path: '/pdf-books', icon: <BookSVG /> },
    { label: 'আবেদন ও এনরোলমেন্ট', path: '/apply', icon: <FormSVG /> },
    { label: 'ভিডিও টিউটোরিয়াল', path: '/video', icon: <VideoSVG /> },
    { label: 'ক্যালেন্ডার', path: '/calendar', icon: <CalendarSVG /> },
    { label: 'রক্তদাতা', path: '/blood', icon: <HeartSVG /> },
    { label: 'BTSC নিউজ পোর্টাল', path: '/news', icon: <ChatSVG /> },
    { label: 'প্রবাসী সেবা', path: '/abroad', icon: <GlobeSVG /> },
  ];

  return (
    <div onClick={close} className="on w-full fixed md:absolute top-0 left-0 z-50">
      <div className=" w-80 h-full bg-white shadow-xl flex flex-col">
      {/* Profile Section from your Screenshot */}
      <div className="p-6 text-center border-b border-gray-100 bg-gray-50/50">
        <div className="relative inline-block">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC97jYvYSQrPi2YTrpQ9TCdjECz-zngpqr0pObvvcdBQ&s=10" className="w-24 h-24 rounded-full border-4 border-white shadow-md" alt="profile" />
          <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <h2 className="mt-3 font-bold text-slate-800">মোঃ আমিনুল সরদার </h2>
        <p className="text-teal-600 text-xs font-bold">প্রধান প্রশাসক</p>
        <div className="mt-4 pt-4 border-t border-dashed">
             <h3 className="font-bold text-slate-700">BTSC</h3>
             <p className="text-teal-600 text-[10px] font-bold">মেনু ও সেটিংস</p>
        </div>
      </div>

      {/* Dynamic Menu List */}
      <div className="flex-1 py-2 overflow-y-auto">
        {menuData.map((item, index) => (
          <MenuOption key={index} {...item} />
        ))}
      </div>

      {/* Footer Admin Button */}
      <div className="p-4">
        <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all hover:bg-slate-200">
           <LockSVG /> অ্যাডমিন লগইন
        </button>
      </div>
    </div>
    </div>
  );
};


export default Sidebar