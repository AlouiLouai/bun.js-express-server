'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Uploader from '@/components/Uploader';
import SideBar from './side-bar';

export default function SidebarDemo() {
  return (
    <div
      className={cn(
        'w-screen h-screen', // Ensures the container fills the entire viewport
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden'
      )}
    >
      <SideBar />
      <Dashboard />
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2 flex-1">
          <Uploader />
        </div>
      </div>
    </div>
  );
};
