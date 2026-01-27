import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { type ExperienceItem } from "@/entities/cv/model/types";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience = ({ experience }: ExperienceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {experience.map((item, index) => (
            <div key={index} className="border-l-2 border-primary pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">{item.position}</h3>
                <p className="text-muted-foreground font-medium">
                  {item.company}, {item.location}
                </p>
                <p className="text-sm text-muted-foreground">{item.period}</p>
              </div>
              <ul className="list-disc list-inside space-y-1 mt-3">
                {item.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-muted-foreground text-sm">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
