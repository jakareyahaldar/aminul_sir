import Seba from "./Seba.jsx"


const app_config = [
  {
    label: "PDF বই ও শীট",
    icon: "fa-solid fa-file-pdf",
    path: "/pdf-books"
  },
  {
    label: "আবেদন ও এনরোলমেন্ট",
    icon: "fa-solid fa-user",
    path: "https://apromis.app/trainee"
  },
  {
    label: "ভিডিও টিউটোরিয়াল",
    icon: "fa-solid fa-video",
    path: "/videos"
  },
  {
    label: "অ্যাসেসমেন্ট",
    icon: "fa-solid fa-calendar",
    path: "/assessment"
  },
  {
    label: "রক্তদাতা",
    icon: "fas fa-heart",
    path: "/blod"
  },
  {
    label: "নোটিশ",
    icon: "fa-solid fa-message",
    path: "/notice"
  },
  ]


export default function AmaderSeba() {
  return(
    <div className="my-1 p-5">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-bold">আমাদের সেবা</h3>
        <div className="h-[5px] w-20 bg-blue-700 rounded-3xl"></div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 justify-items-center items-center">
        {app_config.map(app => <Seba key={app.label} label={app.label} icon={app.icon} path={app.path} />)}
      </div>
    </div>
  )
}