
import React from 'react';
import { Plus, BarChart3, Bell, Download, Check, MessageCircle } from 'lucide-react';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { useBillMutations } from '@/hooks/useBillMutations';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';

const QuickActionsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useSupabaseData();
  const { updateBill } = useBillMutations();
  const { toast } = useToast();
  const bills = data?.bills || [];
  
  const quickActionButtons = [
    { label: "Add Bill", icon: Plus },
    { label: "View Reports", icon: BarChart3 },
    { label: "Set Budget", icon: Bell },
    { label: "Export CSV", icon: Download },
    { label: "AI Assistant", icon: MessageCircle }
  ];

  const handleQuickAction = (index: number) => {
    const actions = [
      // Add Bill
      () => navigate('/bills'),
      
      // View Reports
      () => navigate('/reports'),
      
      // Set Budget
      () => navigate('/budgets'),
      
      // Export CSV
      () => {
        if (bills.length === 0) {
          toast({
            title: "No bills to export",
            description: "Add some bills first before exporting",
            variant: "destructive"
          });
          return;
        }

        try {
          // Prepare CSV content
          const headers = ["Name", "Amount", "Due Date", "Status", "Category"];
          const csvContent = bills.map(bill => 
            [
              bill.name, 
              bill.amount, 
              new Date(bill.due_date).toLocaleDateString(), 
              bill.status, 
              bill.category
            ].join(',')
          );

          // Create CSV data and download
          const csv = [headers.join(','), ...csvContent].join('\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', `bills-export-${new Date().toISOString().split('T')[0]}.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Export successful",
            description: "Your bills have been exported as CSV"
          });
        } catch (error) {
          console.error('Export error:', error);
          toast({
            title: "Export failed",
            description: "Could not export bills to CSV",
            variant: "destructive"
          });
        }
      },
      
      // AI Assistant
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

  const markAllAsPaid = () => {
    const unpaidBills = bills.filter(bill => bill.status !== 'paid');
    
    if (unpaidBills.length === 0) {
      toast({
        title: "No bills to mark as paid",
        description: "All bills are already marked as paid",
      });
      return;
    }
    
    // Create an array of promises for all bill updates
    const updatePromises = unpaidBills.map(bill => 
      updateBill.mutateAsync({ id: bill.id, status: 'paid' })
    );
    
    // Use Promise.all to handle all updates
    Promise.all(updatePromises)
      .then(() => {
        toast({
          title: "Success",
          description: `${unpaidBills.length} bill${unpaidBills.length > 1 ? 's' : ''} marked as paid`,
        });
      })
      .catch(error => {
        console.error('Error marking bills as paid:', error);
        toast({
          title: "Error",
          description: "Failed to update some bills",
          variant: "destructive",
        });
      });
  };

  return (
    <ChartCard title="Quick Actions">
      <div className="space-y-4">
        <ButtonGroup
          buttons={quickActionButtons}
          activeIndex={null}
          onButtonClick={handleQuickAction}
          variant="pills"
        />
        
        <button 
          className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors"
          onClick={markAllAsPaid}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark All as Paid
        </button>
      </div>
    </ChartCard>
  );
};

export default QuickActionsSection;
