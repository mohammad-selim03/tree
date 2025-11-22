"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function ProductFilters() {
    const [priceRange, setPriceRange] = useState([0, 500])

    return (
        <div className="space-y-6">
            <Accordion type="single" collapsible defaultValue="category" className="w-full">
                <AccordionItem value="category" className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-green-300 transition-colors">
                        Category
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {["Ornamental", "Fruit", "Shade", "Evergreen", "Flowering"].map((category) => (
                                <div key={category} className="flex items-center space-x-3 group">
                                    <Checkbox
                                        id={category}
                                        className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                    />
                                    <Label
                                        htmlFor={category}
                                        className="text-white/70 group-hover:text-white cursor-pointer transition-colors"
                                    >
                                        {category}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price" className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-green-300 transition-colors">
                        Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <Slider
                                defaultValue={[0, 500]}
                                max={1000}
                                step={10}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-400"
                            />
                            <div className="flex items-center justify-between text-sm">
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-white font-medium">
                                    ${priceRange[0]}
                                </span>
                                <span className="text-white/40">-</span>
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-white font-medium">
                                    ${priceRange[1]}
                                </span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="height" className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-green-300 transition-colors">
                        Mature Height
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {["Small (< 15ft)", "Medium (15-40ft)", "Large (> 40ft)"].map((height) => (
                                <div key={height} className="flex items-center space-x-3 group">
                                    <Checkbox
                                        id={height}
                                        className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                    />
                                    <Label
                                        htmlFor={height}
                                        className="text-white/70 group-hover:text-white cursor-pointer transition-colors"
                                    >
                                        {height}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sun" className="border-white/10">
                    <AccordionTrigger className="text-white hover:text-green-300 transition-colors">
                        Sun Exposure
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {["Full Sun", "Partial Shade", "Full Shade"].map((sun) => (
                                <div key={sun} className="flex items-center space-x-3 group">
                                    <Checkbox
                                        id={sun}
                                        className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                    />
                                    <Label
                                        htmlFor={sun}
                                        className="text-white/70 group-hover:text-white cursor-pointer transition-colors"
                                    >
                                        {sun}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white hover:text-green-300 transition-all"
                variant="outline"
            >
                Reset Filters
            </Button>
        </div>
    )
}
