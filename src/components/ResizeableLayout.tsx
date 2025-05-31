"use client";

import React, { ReactNode } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

type ResizeableLayoutProps = {
  leftTop: ReactNode;    // input panel
  leftBottom: ReactNode; // hasil output bawah input
  right: ReactNode;      // output chart panel
};

export default function ResizeableLayout({
  leftTop,
  leftBottom,
  right,
}: ResizeableLayoutProps) {
  // Warna gelap panel, margin putih di sekitar panel biar ada celah
  const panelClass =
    "m-4 p-6 rounded-lg shadow-lg overflow-auto bg-gray-900 text-white";

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-6xl h-[700px] rounded-xl border border-gray-200 shadow-lg bg-white flex">
        <ResizablePanelGroup direction="horizontal" className="flex w-full rounded-xl overflow-hidden">
          {/* LEFT PANEL: vertical split */}
          <ResizablePanel defaultSize={40} minSize={25} className="flex flex-col overflow-hidden">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={60} minSize={30} className={panelClass}>
                {leftTop}
              </ResizablePanel>

              <ResizableHandle className="bg-gray-200 hover:bg-gray-400 cursor-row-resize" />

              <ResizablePanel defaultSize={40} minSize={20} className={panelClass}>
                {leftBottom}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="bg-gray-200 hover:bg-gray-400 cursor-col-resize" />

          {/* RIGHT PANEL */}
          <ResizablePanel defaultSize={60} minSize={35} className={panelClass}>
            {right}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
