
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProcessedBillData } from '@/hooks/useBillProcessing';

interface BillEditFormProps {
  processedData: ProcessedBillData;
  onFieldChange: (field: keyof ProcessedBillData, value: any) => void;
  onSaveBill: () => void;
  onCancel: () => void;
}

const BillEditForm: React.FC<BillEditFormProps> = ({
  processedData,
  onFieldChange,
  onSaveBill,
  onCancel,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Bill Name</Label>
          <Input
            id="name"
            value={processedData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            className="min-h-[44px]"
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={processedData.amount}
            onChange={(e) => onFieldChange('amount', parseFloat(e.target.value) || 0)}
            className="min-h-[44px]"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={processedData.category} 
            onValueChange={(value) => onFieldChange('category', value)}
          >
            <SelectTrigger className="min-h-[44px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            value={processedData.due_date}
            onChange={(e) => onFieldChange('due_date', e.target.value)}
            className="min-h-[44px]"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={processedData.description || ''}
          onChange={(e) => onFieldChange('description', e.target.value)}
          rows={3}
          className="min-h-[88px]"
        />
      </div>

      {processedData.confidence && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>AI Confidence:</strong> {processedData.confidence}%
          </p>
          <p className="text-sm text-blue-700 mt-1">
            {processedData.reasoning}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={onSaveBill}
          className="flex-1 bg-green-600 hover:bg-green-700 min-h-[44px]"
        >
          <Check className="h-4 w-4 mr-2" />
          Save Bill
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="min-h-[44px] min-w-[100px]"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BillEditForm;
