import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { useBills } from '@/hooks/useSupabaseData';
import { useBillMutations } from '@/hooks/useBillMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BillUploadForm from '@/components/BillUploadForm';

const Bills = () => {
  const { data: bills, isLoading } = useBills();
  const { createBill, updateBill, deleteBill } = useBillMutations();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    due_date: '',
    status: 'upcoming' as const,
    category: '',
    description: '',
    recurring: false,
    recurring_frequency: undefined as string | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBill.mutate({
      name: formData.name,
      amount: parseFloat(formData.amount),
      due_date: formData.due_date,
      status: formData.status,
      category: formData.category,
      description: formData.description || undefined,
      recurring: formData.recurring,
      recurring_frequency: formData.recurring_frequency as any,
    }, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData({
          name: '',
          amount: '',
          due_date: '',
          status: 'upcoming',
          category: '',
          description: '',
          recurring: false,
          recurring_frequency: undefined,
        });
      }
    });
  };

  const markAsPaid = (billId: string) => {
    updateBill.mutate({ id: billId, status: 'paid' });
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bills Management</h1>
            <p className="text-gray-600 mt-2">Upload bills with AI categorization or add manually</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Manually
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Bill</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Bill Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="due">Due</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <Button type="submit" disabled={createBill.isPending}>
                    {createBill.isPending ? 'Creating...' : 'Create Bill'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload & AI Process
            </TabsTrigger>
            <TabsTrigger value="manage">
              <Plus className="h-4 w-4 mr-2" />
              Manage Bills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <BillUploadForm />
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            {bills?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bills yet</h3>
                <p className="text-gray-500 mb-4">Get started by uploading a bill or creating one manually</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manually
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bills?.map((bill) => (
                  <Card key={bill.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{bill.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                          bill.status === 'due' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {bill.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-gray-900">${bill.amount}</p>
                        <p className="text-sm text-gray-500">Due: {new Date(bill.due_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Category: {bill.category}</p>
                        {bill.description && (
                          <p className="text-sm text-gray-600">{bill.description}</p>
                        )}
                        {bill.file_url && (
                          <div className="mt-2">
                            <a 
                              href={bill.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              View uploaded file →
                            </a>
                          </div>
                        )}
                        {bill.status !== 'paid' && (
                          <Button 
                            onClick={() => markAsPaid(bill.id)}
                            className="w-full mt-4"
                            disabled={updateBill.isPending}
                          >
                            Mark as Paid
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bills;
