"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell
} from "recharts";
import { format, parseISO, startOfDay } from "date-fns";

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function DashboardCharts({ appointments }: { appointments: any[] }) {
  // Process data for Revenue Over Time
  const revenueData = useMemo(() => {
    const dailyRevenue: Record<string, number> = {};
    
    // Only count completed appointments for revenue
    const completed = appointments.filter(a => a.status === 'COMPLETED');
    
    completed.forEach(apt => {
      const dateStr = format(new Date(apt.date), 'yyyy-MM-dd');
      if (!dailyRevenue[dateStr]) dailyRevenue[dateStr] = 0;
      dailyRevenue[dateStr] += apt.service.price;
    });

    return Object.entries(dailyRevenue)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(item => ({
        ...item,
        displayDate: format(parseISO(item.date), 'MMM dd')
      }));
  }, [appointments]);

  // Process data for Service Popularity
  const serviceData = useMemo(() => {
    const serviceCounts: Record<string, number> = {};
    
    appointments.forEach(apt => {
      const name = apt.service.name;
      if (!serviceCounts[name]) serviceCounts[name] = 0;
      serviceCounts[name] += 1;
    });

    return Object.entries(serviceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // descending
  }, [appointments]);

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {revenueData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No revenue data for this period
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} vertical={false} />
                  <XAxis dataKey="displayDate" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#22c55e' }}
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appointments by Service</CardTitle>
        </CardHeader>
        <CardContent>
          {serviceData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No service data for this period
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} vertical={false} />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
