import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { type EducationItem } from "@/entities/cv/model/types";

interface EducationProps {
  education: EducationItem[];
}

export const Education = ({ education }: EducationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {education.map((item, index) => (
            <div key={index} className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold text-lg">{item.degree}</h3>
              <p className="text-muted-foreground font-medium">
                {item.institution}
              </p>
              <p className="text-sm text-muted-foreground">
                Major: {item.major}
              </p>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
