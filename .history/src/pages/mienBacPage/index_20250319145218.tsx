import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import BasicStatistics from "../HomePgae/Statistics";
import Metadata from "@/components/molecules/Metadata";

export default function MienBac() {
  return (
    <>
      <Metadata 
        title="Du lịch Miền Bắc Việt Nam | Khám phá Sapa, Hạ Long, Hà Giang" 
        description="Khám phá vẻ đẹp hùng vĩ của miền Bắc Việt Nam với những điểm đến nổi tiếng như Vịnh Hạ Long, Sapa, Hà Giang, Ninh Bình và nhiều hơn nữa."
      
      />
      <ScrollAnimation delay={0.3}>
        <BasicStatistics />
      </ScrollAnimation>
    </>
  );
}
