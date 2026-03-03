import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/tools';
import { ChevronRight } from 'lucide-react';

interface RecommendedToolsProps {
  currentToolId: string;
}

export const RecommendedTools: React.FC<RecommendedToolsProps> = ({ currentToolId }) => {
  // Find the category of the current tool
  const category = CATEGORIES.find(cat => 
    cat.tools.some(tool => tool.id === currentToolId)
  );

  if (!category) return null;

  // Get other tools in the same category
  const otherTools = category.tools
    .filter(tool => tool.id !== currentToolId)
    .slice(0, 3); // Show up to 3 recommended tools

  if (otherTools.length === 0) return null;

  return (
    <div className="mt-16 border-t border-zinc-200 pt-12">
      <h3 className="text-2xl font-bold text-zinc-900 mb-8">Recommended Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherTools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group p-6 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-900 transition-all shadow-sm hover:shadow-md"
          >
            <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <tool.icon className={`w-6 h-6 ${tool.color}`} />
            </div>
            <h4 className="font-bold text-zinc-900 mb-2 flex items-center justify-between">
              {tool.name}
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </h4>
            <p className="text-sm text-zinc-500 line-clamp-2">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
