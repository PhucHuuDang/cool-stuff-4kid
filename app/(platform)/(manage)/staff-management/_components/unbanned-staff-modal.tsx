import React, { useState } from 'react';
import { UserCheck } from "lucide-react";
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UnbanStaffButtonProps } from '@/interface';



const UnbanStaffButton: React.FC<UnbanStaffButtonProps> = ({ userId, userName, onStatusChange }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = () => setIsConfirmOpen(true);
  const closeConfirmDialog = () => setIsConfirmOpen(false);

  const handleUnban = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://milkapplicationapi.azurewebsites.net/api/Users/UnbanUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      console.log(`Response status: ${response.status}`);
      console.log(`Response status text: ${response.statusText}`);

      if (response.ok) {
        const result = await response.json();
        console.log('Response data:', result);
        if (result.isSucceed) {
          onStatusChange(userId, 1);
          toast.success(`Tài khoản của ${userName} đã được kích hoạt lại!`);
          closeConfirmDialog();
        } else {
          console.error('Unban failed:', result.message);
          toast.error(`Không thể kích hoạt lại tài khoản: ${result.message}`);
        }
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        toast.error(`Không thể kích hoạt lại tài khoản. Lỗi: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error unbanning staff:', error);
      toast.error('Đã xảy ra lỗi khi kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="mx-2 text-green-500" onClick={openConfirmDialog} disabled={isLoading}>
        <UserCheck />
      </button>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận kích hoạt lại tài khoản</DialogTitle>
          </DialogHeader>
          <p>Bạn có chắc chắn muốn kích hoạt lại tài khoản của {userName}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={closeConfirmDialog} disabled={isLoading}>Hủy</Button>
            <Button variant="default" onClick={handleUnban} disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Kích hoạt lại'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnbanStaffButton;