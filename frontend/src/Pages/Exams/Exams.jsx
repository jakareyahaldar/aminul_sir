import ExamList from "./ExamList.jsx"
import BackAndTitle from "../../Components/BackAndTitle.jsx"

export default function Exams(){
  return(
    <>
      <div className="py-20">
        <BackAndTitle path="/" title="Assessment" />
        <ExamList />
      </div>
    </>
    )
}