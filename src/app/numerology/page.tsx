"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NumerologyReport {
  motivacao: number;
  impressao: number;
  expressao: number;
  destino: number;
}

export default function NumerologyPage() {
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('/api/numerology', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReport(data.numerologyMap);
      } catch (error) {
        console.error('Error fetching numerology report:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchReport();
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white justify-center items-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Numerology Report</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center">Loading your report...</p>
          ) : report ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Motivation Number:</span>
                <span>{report.motivacao}</span>
              </div>
              <div className="flex justify-between">
                <span>Impression Number:</span>
                <span>{report.impressao}</span>
              </div>
              <div className="flex justify-between">
                <span>Expression Number:</span>
                <span>{report.expressao}</span>
              </div>
              <div className="flex justify-between">
                <span>Destiny Number:</span>
                <span>{report.destino}</span>
              </div>
            </div>
          ) : (
            <p className="text-center">Could not load your report. Please make sure you have completed the onboarding.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
