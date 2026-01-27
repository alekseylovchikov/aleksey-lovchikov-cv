import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface AboutProps {
  content: string;
}

export const About = ({ content }: AboutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};
