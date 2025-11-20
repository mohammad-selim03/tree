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
            <div>
                <h3 className="mb-4 text-lg font-semibold">Filters</h3>
                <Accordion type="single" collapsible defaultValue="category" className="w-full">
                    <AccordionItem value="category">
                        <AccordionTrigger>Category</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {["Ornamental", "Fruit", "Shade", "Evergreen", "Flowering"].map((category) => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox id={category} />
                                        <Label htmlFor={category}>{category}</Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-2">
                                <Slider
                                    defaultValue={[0, 500]}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                />
                                <div className="flex items-center justify-between text-sm">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="height">
                        <AccordionTrigger>Mature Height</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {["Small (< 15ft)", "Medium (15-40ft)", "Large (> 40ft)"].map((height) => (
                                    <div key={height} className="flex items-center space-x-2">
                                        <Checkbox id={height} />
                                        <Label htmlFor={height}>{height}</Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sun">
                        <AccordionTrigger>Sun Exposure</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {["Full Sun", "Partial Shade", "Full Shade"].map((sun) => (
                                    <div key={sun} className="flex items-center space-x-2">
                                        <Checkbox id={sun} />
                                        <Label htmlFor={sun}>{sun}</Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Button className="w-full" variant="outline">
                Reset Filters
            </Button>
        </div>
    )
}
