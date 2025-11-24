"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Droplets,
  Sun,
  Scissors,
  Sprout,
  AlertTriangle,
  Calendar,
  Download,
  Sparkles,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface CarePlan {
  summary: string
  watering: {
    frequency: string
    amount: string
    tips: string[]
  }
  sunlight: {
    requirement: string
    hours: string
    tips: string[]
  }
  soil: {
    type: string
    ph: string
    tips: string[]
  }
  fertilizing: {
    frequency: string
    type: string
    tips: string[]
  }
  pruning: {
    frequency: string
    season: string
    tips: string[]
  }
  seasonalCare: {
    spring: string[]
    summer: string[]
    fall: string[]
    winter: string[]
  }
  commonIssues: {
    issue: string
    solution: string
  }[]
  quickTips: string[]
}

interface CarePlanDisplayProps {
  speciesId: string
  speciesName: string
  scientificName: string
}

export function CarePlanDisplay({ speciesId, speciesName, scientificName }: CarePlanDisplayProps) {
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/v1/care-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speciesId }),
      })

      const data = await res.json()
      if (data.success) {
        setCarePlan(data.data.carePlan)
        toast.success('Care plan generated!')
      } else {
        toast.error(data.error || 'Failed to generate care plan')
      }
    } catch (error) {
      toast.error('Failed to generate care plan')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (!carePlan) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Sparkles className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Get Personalized Care Tips</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Our AI will generate a comprehensive care guide tailored specifically for your {speciesName}
          </p>
          <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Care Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">🌱 Care Guide for {speciesName}</CardTitle>
              <CardDescription className="italic">{scientificName}</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{carePlan.summary}</p>
        </CardContent>
      </Card>

      {/* Quick Care Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Watering */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-blue-600">
              <Droplets className="h-5 w-5" />
              <CardTitle className="text-sm">Watering</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{carePlan.watering.frequency}</p>
            <p className="text-sm text-muted-foreground">{carePlan.watering.amount}</p>
          </CardContent>
        </Card>

        {/* Sunlight */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-orange-600">
              <Sun className="h-5 w-5" />
              <CardTitle className="text-sm">Sunlight</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{carePlan.sunlight.requirement}</p>
            <p className="text-sm text-muted-foreground">{carePlan.sunlight.hours}</p>
          </CardContent>
        </Card>

        {/* Fertilizing */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-green-600">
              <Sprout className="h-5 w-5" />
              <CardTitle className="text-sm">Fertilizing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{carePlan.fertilizing.frequency}</p>
            <p className="text-sm text-muted-foreground">{carePlan.fertilizing.type}</p>
          </CardContent>
        </Card>

        {/* Pruning */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-purple-600">
              <Scissors className="h-5 w-5" />
              <CardTitle className="text-sm">Pruning</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{carePlan.pruning.frequency}</p>
            <p className="text-sm text-muted-foreground">{carePlan.pruning.season}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="seasonal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seasonal">
            <Calendar className="h-4 w-4 mr-2" />
            Seasonal Care
          </TabsTrigger>
          <TabsTrigger value="issues">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Common Issues
          </TabsTrigger>
          <TabsTrigger value="tips">
            <Sparkles className="h-4 w-4 mr-2" />
            Quick Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seasonal" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(carePlan.seasonalCare).map(([season, tasks]) => (
              <Card key={season}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {season === 'spring' && '🌸'}
                    {season === 'summer' && '☀️'}
                    {season === 'fall' && '🍂'}
                    {season === 'winter' && '❄️'}
                    {season}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-3 mt-4">
          {carePlan.commonIssues.map((item, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  {item.issue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tips" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {carePlan.quickTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 shrink-0">
                      {i + 1}
                    </Badge>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Regenerate Button */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Regenerating...
            </>
          ) : (
            'Regenerate Care Plan'
          )}
        </Button>
      </div>
    </div>
  )
}
