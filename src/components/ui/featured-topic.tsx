"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeaturedTopicProps {
  title: string;
  image: string;
  color: string;
  onClick: () => void;
}

export function FeaturedTopic({ title, image, color, onClick }: FeaturedTopicProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        color
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Click to explore</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 