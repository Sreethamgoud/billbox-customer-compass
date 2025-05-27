
import React from 'react';
import { Plus, BarChart3, Bell, Zap } from 'lucide-react';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';

const QuickActionsSection: React.FC = () => {
  const quickActionButtons = [
    { label: "Add Bill", icon: Plus },
    { label: "View Reports", icon: BarChart3 },
    { label: "Set Budget", icon: Bell },
    { label: "Connect Bank", icon: Zap }
  ];

  return (
    <ChartCard title="Quick Actions">
      <ButtonGroup
        buttons={quickActionButtons}
        activeIndex={null}
        onButtonClick={() => {}}
        variant="pills"
      />
    </ChartCard>
  );
};

export default QuickActionsSection;
