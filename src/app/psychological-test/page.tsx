"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const questions = [
  {
    id: 'q1',
    text: 'When facing a difficult decision, what is your typical first reaction?',
    options: [
      { value: 'analytical', label: 'Analyze all possible outcomes logically.' },
      { value: 'intuitive', label: 'Go with my gut feeling or intuition.' },
      { value: 'avoidant', label: 'Postpone the decision as much as possible.' },
      { value: 'consultative', label: 'Seek advice from others before deciding.' },
    ],
  },
  {
    id: 'q2',
    text: 'How do you typically handle stress or pressure?',
    options: [
        { value: 'action-oriented', label: 'Focus on the task and take action.' },
        { value: 'emotional', label: 'Feel overwhelmed and need to vent.' },
        { value: 'detached', label: 'Detach emotionally to handle the situation.' },
        { value: 'social', label: 'Talk to friends or family to feel better.' },
    ],
  },
  {
    id: 'q3',
    text: 'What motivates you the most in your work or personal projects?',
    options: [
        { value: 'achievement', label: 'Achieving a specific, challenging goal.' },
        { value: 'purpose', label: 'Feeling that my work has a positive impact.' },
        { value: 'security', label: 'Ensuring stability and security for the future.' },
        { value: 'creativity', label: 'The freedom to express myself and innovate.' },
    ],
  },
];

export default function PsychologicalTestPage() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/psychological-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Redirect to a new page or dashboard after the test
      router.push('/');
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Psychological & Neurological Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {questions.map((q) => (
              <div key={q.id}>
                <h3 className="mb-4 font-semibold">{q.text}</h3>
                <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)}>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                        <Label htmlFor={`${q.id}-${opt.value}`}>{opt.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
            <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving Profile...' : 'Complete Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
