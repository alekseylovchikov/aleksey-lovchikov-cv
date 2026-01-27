import { Header } from "@/widgets/header/ui/Header";
import { About } from "@/widgets/about/ui/About";
import { Skills } from "@/widgets/skills/ui/Skills";
import { Experience } from "@/widgets/experience/ui/Experience";
import { Education } from "@/widgets/education/ui/Education";
import { Additional } from "@/widgets/additional/ui/Additional";
import { cvData } from "@/entities/cv/model/data";

export const CVPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Header
          data={{
            name: cvData.name,
            title: cvData.title,
            contacts: cvData.contacts,
          }}
        />
        <div className="space-y-6">
          <About content={cvData.about} />
          <Skills skills={cvData.skills} />
          <Experience experience={cvData.experience} />
          <Education education={cvData.education} />
          <Additional
            languages={cvData.languages}
            additionalInfo={cvData.additionalInfo}
          />
        </div>
      </div>
    </div>
  );
};
