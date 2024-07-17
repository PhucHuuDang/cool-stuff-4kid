import React, { useState } from 'react';
import { UserX } from "lucide-react";
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BanStaffButtonProps } from '@/interface';



const BanStaffButton: React.FC<BanStaffButtonProps> = ({ userId, userName, onStatusChange }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirmDialog = () => setIsConfirmOpen(true);
  const closeConfirmDialog = () => setIsConfirmOpen(false);

  const handleBan = async () => {
    try {
      const response = await fetch(`https://milkapplicationapi.azurewebsites.net/api/Users/DeleteUser/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onStatusChange(userId, 0); // 0 represents InActive status
        toast.success(`Tài khoản của ${userName} đã bị vô hiệu hóa!`);
        closeConfirmDialog();
      } else {
        toast.error('Không thể vô hiệu hóa tài khoản. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error banning staff:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <button className="mx-2 text-red-500" onClick={openConfirmDialog}>
        <UserX />
      </button>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận vô hiệu hóa tài khoản</DialogTitle>
          </DialogHeader>
          <p>Bạn có chắc chắn muốn vô hiệu hóa tài khoản của {userName}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={closeConfirmDialog}>Hủy</Button>
            <Button variant="destructive" onClick={handleBan}>Vô hiệu hóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BanStaffButton;