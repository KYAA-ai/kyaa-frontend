import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterTagsProps {
  selectedSkills: string[];
  accuraSearch: boolean;
  onRemoveSkill: (skill: string) => void;
  onRemoveAccuraSearch: () => void;
  isSearchActive?: boolean;
}

export function FilterTags({ 
  selectedSkills, 
  accuraSearch, 
  onRemoveSkill, 
  onRemoveAccuraSearch,
  isSearchActive = false
}: FilterTagsProps) {
  // Only show tags if search is active and there are filters
  if (!isSearchActive || (selectedSkills.length === 0 && !accuraSearch)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 py-2">
             {accuraSearch && (
         <Badge 
           variant="secondary"
           className="hover:bg-secondary/80 py-1"
         >
          <span>Accura Search</span>
                     <button
             onClick={onRemoveAccuraSearch}
             className="ml-2 hover:bg-background/20 rounded-full p-0.5 transition-colors cursor-pointer"
             aria-label="Remove Accura Search filter"
           >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      
             {selectedSkills.map((skill) => (
         <Badge 
           key={skill} 
           variant="secondary"
           className="hover:bg-secondary/80 py-1"
         >
          <span>{skill}</span>
                     <button
             onClick={() => onRemoveSkill(skill)}
             className="ml-2 hover:bg-background/20 rounded-full p-0.5 transition-colors cursor-pointer"
             aria-label={`Remove ${skill} filter`}
           >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
} 