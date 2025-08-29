"use client";

import {ArrowUpRight} from "lucide-react"
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function Step1Contact({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  return (
    <div className="w-full">
      <div className="flex flex-col pt-5 pb-20 items-center justify-center text-center gap-10">
        <Label className="text-4xl"> Join <span className="text-coral-600">Blume Health</span></Label>
        <h2 className="text-2xl font-bold mb-6">One Stop Marketing platform for independent providers</h2>
        <span>With network of 500+ providers to super charge for independent private practice</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-5">
        <Button  onClick={() => onNext()} className="bg-coral-600 h-15 w-30 text-2xl rounded-4xl">Start<ArrowUpRight className="h-14 w-14" /></Button>
      </div>
    </div>
  );
}
