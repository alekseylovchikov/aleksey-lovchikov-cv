import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { type SkillCategory } from "@/entities/cv/model/types";

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills = ({ skills }: SkillsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
