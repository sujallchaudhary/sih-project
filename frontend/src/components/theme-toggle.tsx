"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="relative">
      <motion.div
        className="flex items-center bg-background/50 backdrop-blur-md border border-border rounded-full p-1 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {themeOptions.map((option) => {
          const IconComponent = option.icon;
          const isActive = theme === option.value;
          
          return (
            <motion.div key={option.value} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(option.value)}
                className={`relative w-10 h-10 rounded-full p-0 transition-all duration-300 ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30 
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
