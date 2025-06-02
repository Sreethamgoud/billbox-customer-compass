
import React from 'react';
import { Plus, BarChart3, Bell, Zap, MessageCircle } from 'lucide-react';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';

const QuickActionsSection: React.FC = () => {
  const quickActionButtons = [
    { label: "Add Bill", icon: Plus },
    { label: "View Reports", icon: BarChart3 },
    { label: "Set Budget", icon: Bell },
    { label: "Connect Bank", icon: Zap },
    { label: "AI Assistant", icon: MessageCircle }
  ];

  const handleQuickAction = (index: number) => {
    const actions = [
      () => console.log('Add Bill clicked'),
      () => console.log('View Reports clicked'),
      () => console.log('Set Budget clicked'),
      () => console.log('Connect Bank clicked'),
      () => {
        // Scroll to AI Assistant section if it exists
        const aiSection = document.getElementById('ai-assistant');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    ];
    
    actions[index]?.();
  };

  return (
    <ChartCard title="Quick Actions">
      <ButtonGroup
        buttons={quickActionButtons}
        activeIndex={null}
        onButtonClick={handleQuickAction}
        variant="pills"
      />
    </ChartCard>
  );
};

export default QuickActionsSection;
