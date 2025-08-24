import dynamic from "next/dynamic";
const GrrowQuiz = dynamic(() => import("./GrrowQuiz"), { ssr: false });

export default function Page() {
  return <GrrowQuiz />;
}
