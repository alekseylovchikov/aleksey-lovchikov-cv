import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface AdditionalProps {
  languages: { name: string; level: string }[];
  additionalInfo: string[];
}

export const Additional = ({ languages, additionalInfo }: AdditionalProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{lang.name}:</span>
                <span className="text-muted-foreground">{lang.level}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {additionalInfo.map((info, index) => (
              <li key={index} className="text-muted-foreground text-sm">
                {info}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
