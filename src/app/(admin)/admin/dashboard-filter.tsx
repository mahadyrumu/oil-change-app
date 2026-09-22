"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransition } from "react";

export function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentRange = searchParams.get("range") || "30d";

  const handleRangeChange = (value: string | null) => {
    if (!value) return;
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("range");
      } else {
        params.set("range", value);
      }
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground font-medium">Timeframe:</span>
      <Select value={currentRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Select a timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
          <SelectItem value="90d">Last 90 Days</SelectItem>
          <SelectItem value="1y">Last Year</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
