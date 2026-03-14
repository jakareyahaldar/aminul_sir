
import PdfCard from "./PdfCard.jsx"


const books_config = [
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d1",
    level: "লেভেল-৩ CO_TOOLS",
    title: "NSDA CO_Tools No-1 (MS Word Mastery)",
    category: "কম্পিউটার অপারেশন",
    size: "2.5 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d2",
    level: "লেভেল-৩ CO_TOOLS",
    title: "NSDA CO_Tools No-2 (Advanced Excel)",
    category: "কম্পিউটার অপারেশন",
    size: "4.1 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d3",
    level: "লেভেল-৩ CO_TOOLS",
    title: "NSDA CO_Tools No-3 (Master Slide)",
    category: "কম্পিউটার অপারেশন",
    size: "1 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d4",
    level: "লেভেল-৩ CO_TOOLS",
    title: "NSDA CO_Tools No-4 (Turbain-2)",
    category: "কম্পিউটার অপারেশন",
    size: "N/A",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d5",
    level: "লেভেল-৩ Graphic_Design",
    title: "Vector Illustration Basics",
    category: "গ্রাফিক ডিজাইন",
    size: "12 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d6",
    level: "লেভেল-৪ IT_Support",
    title: "Hardware Troubleshooting Guide",
    category: "আইটি সাপোর্ট",
    size: "8.5 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d7",
    level: "লেভেল-৩ CO_TOOLS",
    title: "Database Management Basics",
    category: "কম্পিউটার অপারেশন",
    size: "3.2 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d8",
    level: "লেভেল-২ English_Comm",
    title: "Professional Communication",
    category: "সফট স্কিলস",
    size: "1.8 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c3d9",
    level: "লেভেল-৩ CO_TOOLS",
    title: "Cyber Security Awareness",
    category: "কম্পিউটার অপারেশন",
    size: "5.0 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  },
  {
    _id: "65f1a2b3c4d5e6f7a1b2c310",
    level: "লেভেল-৩ Digital_Marketing",
    title: "Social Media Strategy 101",
    category: "ডিজিটাল মার্কেটিং",
    size: "2.1 MB",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ezf6unOWwVR1yK-LK6jbxC-ZbTNpiqrjIWLrtYi9yg&s=10"
  }
];


export default function PdfList(){
  return(
    <div className="p-5">
      <div className="my-5">
        <h3 className="text-xl font-bold">বই ও শীট সংগ্রহ</h3>
        <p className="text-sm">মোট {books_config.length} টি ফাইল</p>
      </div>
      
      {books_config.length === 0 && <EmptyCase />}
      
      <div className="grid md:grid-cols-2 gap-3">
        
        {
          books_config.map((book)=>{
            return <PdfCard 
            _id={book._id} 
            title={book.title} 
            level={book.level} 
            category={book.category} 
            image={book.image}
            size={book.size} />
          })
        }
        
      </div>
      
    </div>
    )
}



function EmptyCase(){
  return(
    <div className="p-5 border-[1px] border-black rounded-xl shadow-2xl">
        <p className="text-center">কোনো ফাইল নাই</p>
      </div>
    )
}